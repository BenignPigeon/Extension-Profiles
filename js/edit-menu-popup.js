// Dark-mode code

const toggleSwitch = document.getElementById('dark-mode-toggle');
const darkMode = localStorage.getItem('darkMode');

if (darkMode === 'enabled') {
  document.documentElement.classList.add('dark-mode');
  toggleSwitch.checked = true;
}

toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    enableDarkMode();
    localStorage.setItem('darkMode', 'enabled');
  } else {
    disableDarkMode();
    localStorage.setItem('darkMode', 'disabled');
  }
});

function enableDarkMode() {
  document.documentElement.classList.add('dark-mode');
  toggleSwitch.parentNode.classList.add('animated');
  console.log('Switch is on');
}

function disableDarkMode() {
  document.documentElement.classList.remove('dark-mode');
  console.log('Switch is off');
}

// Retrieve the profile data from localStorage or set an empty array
let profileData = JSON.parse(localStorage.getItem('profileData')) || [];

// Function to save the profile data to localStorage
function saveProfileData() {
  localStorage.setItem('profileData', JSON.stringify(profileData));
}

// Function to add a new profile
function addNewProfile(profileName) {

  // Check if the profile name already exists
  const isDuplicate = profileData.some(
    (profile) => profile.toLowerCase() === profileName.toLowerCase()
  );

  if (isDuplicate) {
    // Display dialogue box for duplicate profile name
    alert(
      'A profile with this name already exists. Try choosing a different name for this or add a number afterwards.'
    );
  } else {
    profileData.push(profileName);
    saveProfileData();
    displayProfiles();
  }
}

// Function to handle the delete button click event
function handleDeleteButtonClick(profile) {
  // Display a confirmation popup
  const isConfirmed = confirm('Are you sure you want to delete this profile?');

  if (isConfirmed) {
    // Find the index of the profile in the profileData array
    const index = profileData.indexOf(profile);

    if (index > -1) {
      // Remove the profile from the profileData array
      profileData.splice(index, 1);
      saveProfileData();
      displayProfiles();
    }
  }
}

 
// Save button and input box
const saveButton = document.createElement('img');
saveButton.src = '../image/save-icon.png';
saveButton.className = 'saveButton';
saveButton.width = '25';
saveButton.height = '25';

const profileNameInput = document.createElement('input');
profileNameInput.type = 'text';
profileNameInput.className = 'textInput';
profileNameInput.placeholder = 'Enter a profile name here.'; 

const saveContainer = document.createElement('div');
saveContainer.id = 'saveContainer';
saveContainer.style.textAlign = 'right';
saveContainer.style.display = 'flex';
saveContainer.style.alignItems = 'center'; 
saveContainer.style.justifyContent = 'flex-end'; 
saveContainer.appendChild(profileNameInput);

// Add a space between the text input and save button
const space = document.createElement('span');
space.innerHTML = '&nbsp;'; 
saveContainer.appendChild(space);

saveContainer.appendChild(saveButton);

const footer = document.querySelector('footer');
document.body.insertBefore(saveContainer, footer);

const popupOverlay = document.createElement('div');
popupOverlay.id = 'popupOverlay';

const popupContent = document.createElement('div');
popupContent.id = 'popupContent';
popupOverlay.appendChild(popupContent);

document.body.insertBefore(popupOverlay, footer);

// Add line breaks
for (let i = 0; i < 3; i++) {
  const lineBreak = document.createElement('br');
  document.body.insertBefore(lineBreak, footer);
}

saveButton.addEventListener('click', () => {
  const profileName = profileNameInput.value.trim();

  if (profileName !== '') {
    const limitedProfileName = profileName.substring(0, 16);

    if (limitedProfileName.length === 16) {
      showAlert(
        'The length of your profile name is too long, please reduce the number of characters. The maximum number of characters is 15.'
      );
    } else {
      const isDuplicate = profileData.some(
        (profile) => profile.toLowerCase() === limitedProfileName.toLowerCase()
      );

      if (isDuplicate) {
        showAlert(
          'A profile with this name already exists. Please choose a different name or add a number afterwards.'
        );
      } else {
        addNewProfile(limitedProfileName);
        profileNameInput.value = ''; 
      }
    }
  }
});

function showAlert(message) {
  popupContent.innerHTML = `
    <p>${message}</p>
    <button id="popupCloseButton">Close</button>
  `;

  const popupCloseButton = document.getElementById('popupCloseButton');
  popupCloseButton.addEventListener('click', closePopup);

  // Display the popup
  popupOverlay.style.display = 'flex';
}

function closePopup() {
  // Hide the popup
  popupOverlay.style.display = 'none';
}
