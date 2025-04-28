// CONFIGURATION
import signals from './signals.js'; // Import the signals object

// Populate the dropdown with line names
const lineSelect = document.getElementById('lineSelect');
Object.keys(signals).forEach(line => {
  const option = document.createElement('option');
  option.value = line;
  option.textContent = line;
  lineSelect.appendChild(option);
});

// Variables to track the current line, signal, and level
let currentLine = null;
let currentSignalIndex = 0;
let currentLevel = 1; // Start at level 1

// Add an event listener to handle line selection
lineSelect.addEventListener('change', () => {
  currentLine = lineSelect.value;
  currentSignalIndex = 0; // Reset to the first signal
  currentLevel = 1; // Reset to level 1
  populateWordBoxes(); // Populate the word boxes with the first signal
});

// Function to populate the word boxes with the current signal based on the level
function populateWordBoxes() {
  const wordContainer = document.getElementById('wordContainer');
  wordContainer.innerHTML = ''; // Clear existing boxes

  if (!currentLine) return;

  const signalList = signals[currentLine].signalList;
  const currentSignal = signalList[currentSignalIndex];

  // Create boxes for the signal
  for (let i = 0; i < currentSignal.length; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.className = 'input-box';

    // Populate the first character and the rest based on the level
    if (i === 0 || i < currentSignal.length - currentLevel) {
      input.value = currentSignal[i]; // Pre-fill the box
      input.disabled = true; // Make it read-only
    }

    wordContainer.appendChild(input);
  }
}

function checkAndSubmit() {
  const inputs = document.querySelectorAll('.input-box');
  let userInput = "";

  // Check if all input boxes are filled
  for (let input of inputs) {
    if (input.value === "") {
      return; // Exit if any box is empty
    }
    userInput += input.value.toUpperCase();
  }

  const signalList = signals[currentLine].signalList;
  const currentSignal = signalList[currentSignalIndex];

  // Check if the guess is correct
  if (userInput === currentSignal) {
    document.getElementById('result').textContent = "Correct! 🎉";
    document.getElementById('result').style.color = "green";

    // Show the guess for 1 second before moving to the next signal
    setTimeout(() => {
      currentSignalIndex++;
      if (currentSignalIndex >= signalList.length) {
        currentSignalIndex = 0; // Reset to the first signal if at the end
        currentLevel++; // Increase the level
      }
      populateWordBoxes(); // Populate the next signal
      document.getElementById('result').textContent = ""; // Clear the result message
    }, 1000); // 1 second delay
  } else {
    // Show the correct answer in the overlay
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlayContent');
    overlayContent.textContent = `Correct Answer: ${currentSignal}`;
    overlay.style.display = 'flex'; // Show the overlay

    // Hide the overlay and reset the game after 1 second
    setTimeout(() => {
      overlay.style.display = 'none'; // Hide the overlay
      currentSignalIndex = 0; // Reset to the first signal
      currentLevel = 1; // Reset to level 1
      populateWordBoxes(); // Reset the word boxes
      document.getElementById('result').textContent = ""; // Clear the result message
    }, 1000); // 1 second delay
  }
}
// Keypad button logic
const keypadButtons = document.querySelectorAll('.keypad-button');
keypadButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'Clear') {
      // Clear all input boxes
      const inputs = document.querySelectorAll('.input-box');
      inputs.forEach(input => (input.value = ''));
      document.getElementById('result').textContent = ""; // Clear result message
    } else {
      // Find the first empty input box and add the value
      const inputs = document.querySelectorAll('.input-box');
      for (let input of inputs) {
        if (input.value === "") {
          input.value = value; // Add the value to the first empty box
          break; // Stop after filling the first empty box
        }
      }

      // Check if all boxes are filled and submit the guess
      checkAndSubmit();
    }
  });
});