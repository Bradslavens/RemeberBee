import signals from './signals.js'; // Import the signals object

// Populate the dropdown with line names
const lineSelect = document.getElementById('lineSelect');
Object.keys(signals).forEach(line => {
  const option = document.createElement('option');
  option.value = line;
  option.textContent = line;
  lineSelect.appendChild(option);
});

// Variables to track the current line and signal
let currentLine = null;
let currentSignalIndex = 0;

// Handle line selection
lineSelect.addEventListener('change', () => {
  currentLine = lineSelect.value;
  currentSignalIndex = 0; // Reset to the first signal
  document.querySelector('.line-selection-container').style.display = 'none'; // Hide the line selection
  populateKeypad(); // Populate the keypad with characters
});



// Function to check the user's guess and handle game logic
function checkAndSubmit() {
  console.log("Check and submit logic here...");
}

// Add event listener for the "Back" button
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // Redirect to the index.html page
});