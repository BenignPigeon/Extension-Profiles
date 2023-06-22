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
  const isDuplicate = profileData.some(profile => profile.toLowerCase() === profileName.toLowerCase());
  
  if (isDuplicate) {
    // Display dialogue box for duplicate profile name
    alert('A profile with this name already exists. Try choosing a different name for this or add a number afterwards.');
  } else {
    profileData.push(profileName);
    saveProfileData();
    displayProfiles();
  }
}


// Function to display the profiles
function displayProfiles() {
  const profileList = document.getElementById('profileList');
  profileList.innerHTML = ''; // Clear the existing profile buttons

  profileData.forEach((profile, index) => {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'profileButtonContainer';

    const button = document.createElement('button');
    button.textContent = profile;

    const editButton = document.createElement('button');
    editButton.className = 'editButton';
    
    const editIcon = document.createElement('img');
    editIcon.src = '../image/edit-icon-light.png';
    editIcon.alt = 'Edit';

    editButton.appendChild(editIcon);
    editButton.addEventListener('click', () => {
      // Handle edit button click event (replace with your own logic)
      console.log('Edit button clicked for profile:', profile);
    });

    buttonContainer.appendChild(button);
    buttonContainer.appendChild(editButton);
    profileList.appendChild(buttonContainer);
  });
}



// Save button click event handler
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', () => {
  const profileNameInput = document.querySelector('.textInput');
  let profileName = profileNameInput.value.trim();
  
  if (profileName !== '') {
    // Limit profileName to 20 characters
    profileName = profileName.substring(0, 16);

    if (profileName.length === 16) {
      alert('The length of your profile name is too long, please reduce the number of characters. The maximum number of characters is 15.');
    } else {
      const isDuplicate = profileData.some(profile => profile.toLowerCase() === profileName.toLowerCase());
      
      if (isDuplicate) {
        alert('A profile with this name already exists. Please choose a different name or add a number afterwards.');
      } else {
        addNewProfile(profileName);
        profileNameInput.value = ''; // Clear the input field
      }
    }
  }
});




// Call the displayProfiles function to initially display the profiles
displayProfiles();

// Check if the extension is being installed for the first time
if (!localStorage.getItem('installed')) {
  // Add the default profile
  addNewProfile('Default Profile');

  // Set the 'installed' flag in localStorage
  localStorage.setItem('installed', 'true');
}
