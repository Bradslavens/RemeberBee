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
let score = 0; // Track the user's score

// Add an event listener to handle line selection
lineSelect.addEventListener('change', () => {
  currentLine = lineSelect.value;
  currentSignalIndex = 0; // Reset to the first signal
  userInput = ""; // Clear user input
  score = 0; // Reset the score
  console.log(`Selected Line: ${currentLine}`);
  updateScoreDisplay(); // Update the score display
});

// Add event listeners to keypad buttons
const keypadButtons = document.querySelectorAll('.keypad-button');
keypadButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === "Clear") {
      userInput = ""; // Clear the input
      updateUserEntryDisplay(); // Update the user entry display
      console.log("Input cleared");
    } else if (value === "Submit") {
      // Do nothing here; handled by submit button event below
    } else {
      userInput += value; // Append the button value to the user input
      updateUserEntryDisplay(); // Update the user entry display
      console.log(`User Input: ${userInput}`);
    }
  });
});

// Add event listener for submit button
const submitButton = document.getElementById('submitButton');
if (submitButton) {
  submitButton.addEventListener('click', () => {
    if (currentLine) {
      const signalList = signals[currentLine].signalList;
      const currentSignal = signalList[currentSignalIndex];
      if (userInput.length === currentSignal.length) {
        console.log(`User Input: ${userInput}, Current Signal: ${currentSignal}`);
        if (userInput === currentSignal) {
          console.log("Correct! Moving to the next signal.");
          score++; // Increment the score
          updateScoreDisplay(); // Update the score display
          currentSignalIndex++; // Move to the next signal
          clearUserEntryDisplayWithDelay(); // Clear the user entry display with delay

          // Check if we've reached the end of the signal list
          if (currentSignalIndex >= signalList.length) {
            console.log("You've completed all signals! You won!");
            alert(`Congratulations! You completed all signals for ${currentLine} with a score of ${score}. Select another line to play again.`);
            currentSignalIndex = 0; // Restart from the beginning
            userInput = ""; // Clear user input
            score = 0; // Reset the score
            updateScoreDisplay(); // Update the score display
            updateUserEntryDisplay(); // Clear the user entry display
          }
        } else {
          console.log("Incorrect! Showing the correct answer.");
          showOverlay(currentSignal); // Show the overlay with the correct answer
        }
      } else {
        // Optionally, give feedback if input is not the right length
        alert(`Please enter a ${currentSignal.length}-digit code before submitting.`);
      }
    }
  });
}

// Function to update the score display
function updateScoreDisplay() {
  const scoreDisplay = document.getElementById('scoreDisplay');
  if (scoreDisplay) {
    scoreDisplay.textContent = `Score: ${score}`;
  }
}

// Function to update the user entry display
function updateUserEntryDisplay() {
  const userEntryDisplay = document.getElementById('userEntryDisplay');
  if (userEntryDisplay) {
    userEntryDisplay.textContent = `Entry: ${userInput}`;
  }
}

// Function to show the overlay with the correct answer
function showOverlay(correctAnswer) {
  const overlay = document.getElementById('overlay');
  const overlayContent = document.getElementById('overlayContent');
  overlayContent.textContent = `Incorrect! The correct answer was: ${correctAnswer}`;
  overlay.style.display = 'flex'; // Show the overlay

  // Clear the user entry display immediately
  userInput = "";
  updateUserEntryDisplay();

  // Hide the overlay after 2 seconds
  setTimeout(() => {
    overlay.style.display = 'none';
    resetGame(); // Reset the game after showing the overlay
  }, 2000);
}

// Function to reset the game
function resetGame() {
  currentSignalIndex = 0; // Reset to the first signal
  userInput = ""; // Clear user input
  score = 0; // Reset the score
  updateScoreDisplay(); // Update the score display
}

// Update the user entry display with a delay before clearing
function clearUserEntryDisplayWithDelay() {
  setTimeout(() => {
    userInput = ""; // Clear user input
    updateUserEntryDisplay(); // Clear the user entry display
  }, 500); // 500ms delay
}