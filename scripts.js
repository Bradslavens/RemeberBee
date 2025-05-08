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
  populateWordBoxes(); // Populate the word boxes with the first signal
});

// Function to populate the word boxes with the current signal
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

    // Move to the next signal
    setTimeout(() => {
      currentSignalIndex++;
      if (currentSignalIndex >= signalList.length) {
        currentSignalIndex = 0; // Reset to the first signal if at the end
      }
      populateWordBoxes(); // Populate the next signal
      document.getElementById('result').textContent = ""; // Clear the result message
    }, 1000);
  } else {
    // Show the correct answer in the overlay
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlayContent');
    overlayContent.textContent = `Correct Answer: ${currentSignal}`;
    overlay.style.display = 'flex'; // Show the overlay

    // Hide the overlay after 1.75 seconds
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 1750);
  }
}

// Add event listener for the "Back" button
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // Redirect to the index.html page
});