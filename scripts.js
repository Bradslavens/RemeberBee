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
let currentLevel = 1; // Default to level 1

// Add an event listener to handle level selection
const levelSelect = document.getElementById('levelSelect');
let levelSelected = false;
let lineSelected = false;

// Handle level selection
levelSelect.addEventListener('change', () => {
  currentLevel = parseInt(levelSelect.value, 10); // Update the level based on user selection
  levelSelected = true;
  checkSelections(); // Check if both selections are made
});

// Handle line selection
lineSelect.addEventListener('change', () => {
  currentLine = lineSelect.value;
  currentSignalIndex = 0; // Reset to the first signal
  lineSelected = true;
  checkSelections(); // Check if both selections are made
});

// Function to check if both level and line are selected
function checkSelections() {
  if (levelSelected && lineSelected) {
    // Hide the level and line selection containers
    document.querySelector('.level-selection-container').style.display = 'none';
    document.querySelector('.line-selection-container').style.display = 'none';

    // Populate the word boxes with the first signal
    populateWordBoxes();
  }
}

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

// Function to check the user's guess and handle game logic
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

        // Show the "Level Complete" overlay
        const levelOverlay = document.getElementById('levelOverlay');
        const levelOverlayContent = document.getElementById('levelOverlayContent');
        levelOverlayContent.textContent = `Congratulations! Level ${currentLevel} Complete! Starting Next Level...`;
        levelOverlay.style.display = 'flex';

        // Hide the overlay and move to the next level after 1 second
        setTimeout(() => {
          levelOverlay.style.display = 'none';
          currentLevel++; // Increase the level
          populateWordBoxes(); // Populate the next signal
        }, 2500);
      } else {
        populateWordBoxes(); // Populate the next signal
      }
      document.getElementById('result').textContent = ""; // Clear the result message
    }, 250); // 1 second delay
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
      populateWordBoxes(); // Reset the word boxes, but keep the current level
      document.getElementById('result').textContent = ""; // Clear the result message
    }, 1750); // 1 second delay
  }
}

// Keypad button logic
const keypadButtons = document.querySelectorAll('.keypad-button');
keypadButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'Clear') {
      // Clear only the user input in the input boxes
      const inputs = document.querySelectorAll('.input-box');
      inputs.forEach(input => {
        if (!input.disabled) {
          input.value = ''; // Clear only editable boxes
        }
      });
      document.getElementById('result').textContent = ""; // Clear result message
    } else {
      // Find the first empty input box and add the value
      const inputs = document.querySelectorAll('.input-box');
      for (let input of inputs) {
        if (input.value === "" && !input.disabled) {
          input.value = value; // Add the value to the first empty editable box
          break; // Stop after filling the first empty box
        }
      }

      // Check if all boxes are filled and submit the guess
      checkAndSubmit();
    }
  });
});

// Add event listener for the "Back" button
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // Redirect to the index.html page
});