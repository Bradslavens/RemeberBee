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

// Function to populate the keypad with signal characters and random characters
function populateKeypad() {
  const keypadContainer = document.getElementById('keypadContainer');
  keypadContainer.innerHTML = ''; // Clear existing buttons

  if (!currentLine) return;

  const signalList = signals[currentLine].signalList;
  const currentSignal = signalList[currentSignalIndex];
  const signalChars = Array.from(new Set(currentSignal.split(''))); // Unique characters in the signal
  const allChars = 'ABCRLSOME0123456789'; // Pool of random characters
  const randomChars = Array.from(allChars).filter(char => !signalChars.includes(char)); // Exclude signal chars

  // Shuffle function
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Combine signal characters and random characters
  const keypadChars = shuffle([...signalChars, ...randomChars.slice(0, 9 - signalChars.length)]);

  // Create buttons for the keypad
  keypadChars.forEach(char => {
    const button = document.createElement('button');
    button.className = 'keypad-button';
    button.textContent = char;
    button.addEventListener('click', () => {
      // Handle button click (e.g., populate input boxes)
      console.log(`Button clicked: ${char}`);
    });
    keypadContainer.appendChild(button);
  });
}

// Function to check the user's guess and handle game logic
function checkAndSubmit() {
  console.log("Check and submit logic here...");
}

// Add event listener for the "Back" button
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // Redirect to the index.html page
});