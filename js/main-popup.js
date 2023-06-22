// Retrieve the profile data from localStorage
let profileData = JSON.parse(localStorage.getItem('profileData')) || [];

// Check if there is a default profile
const hasDefaultProfile = profileData.some(profile => profile.toLowerCase() === 'default profile');

// Add default profile if it doesn't exist
if (!hasDefaultProfile) {
  profileData.push('Default Profile');
}

// Generate the profile buttons
const profileList = document.getElementById('profileList');
profileData.forEach(profile => {
  const button = document.createElement('button');
  button.textContent = profile;
  button.addEventListener('click', () => {
    // Handle button click event (replace with your own logic)
    console.log('Button clicked for profile:', profile);
  });
  profileList.appendChild(button);
});

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
