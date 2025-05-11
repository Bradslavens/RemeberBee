import signals from './signals.js'; // Import the signals object

// Populate the line selection dropdown
const lineSelect = document.getElementById('lineSelect');
Object.keys(signals).forEach(line => {
  const option = document.createElement('option');
  option.value = line;
  option.textContent = line;
  lineSelect.appendChild(option);
});

// Variables to track the current state
let currentLine = null;
let currentSignalIndex = 0;
let userInput = "";

// Add an event listener to handle line selection
lineSelect.addEventListener('change', () => {
  currentLine = lineSelect.value;
  currentSignalIndex = 0; // Reset to the first signal
  userInput = ""; // Clear user input
  console.log(`Selected Line: ${currentLine}`);
});

// Add event listeners to keypad buttons
const keypadButtons = document.querySelectorAll('.keypad-button');
keypadButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === "Clear") {
      userInput = ""; // Clear the input
      console.log("Input cleared");
    } else if (value === "Home") {
      window.location.href = 'index.html'; // Redirect to home
    } else {
      userInput += value; // Append the button value to the user input
      console.log(`User Input: ${userInput}`);

      // Check if the input matches the current signal length
      if (currentLine) {
        const signalList = signals[currentLine].signalList;
        const currentSignal = signalList[currentSignalIndex];

        // Only test the input when its length matches the current signal's length
        if (userInput.length === currentSignal.length) {
          if (userInput === currentSignal) {
            console.log("Correct! Moving to the next signal.");
            currentSignalIndex++; // Move to the next signal
            userInput = ""; // Reset user input

            // Check if we've reached the end of the signal list
            if (currentSignalIndex >= signalList.length) {
              console.log("You've completed all signals! Restarting...");
              currentSignalIndex = 0; // Restart from the beginning
            }
          } else {
            console.log("Incorrect! Resetting to the beginning.");
            currentSignalIndex = 0; // Reset to the first signal
            userInput = ""; // Clear user input
          }
        } else {
          console.log(
            `Waiting for more input. Current input length: ${userInput.length}, Signal length: ${currentSignal.length}`
          );
        }
      }
    }
  });
});