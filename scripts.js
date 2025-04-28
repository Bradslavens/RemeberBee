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

// Add an event listener to handle line selection
lineSelect.addEventListener('change', () => {
  const selectedLine = lineSelect.value;
  console.log(`Selected Line: ${selectedLine}`);
  // You can add additional logic here to update the game based on the selected line
});
const fullWord = "WATER";   // Full word to guess
const revealedLetters = 2;  // Number of starting letters shown

const wordContainer = document.getElementById('wordContainer');

function createBoxes() {
  // Create squares for the starting letters
  for (let i = 0; i < revealedLetters; i++) {
    const box = document.createElement('div');
    box.className = 'letter-box';
    box.textContent = fullWord[i];
    wordContainer.appendChild(box);
  }

  // Create input boxes for the missing letters
  for (let i = revealedLetters; i < fullWord.length; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.className = 'input-box';
    wordContainer.appendChild(input);
  }
}

createBoxes();



const keypadButtons = document.querySelectorAll('.keypad-button');
// Function to check if all input boxes are filled and submit the guess
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

  // Combine revealed letters with user input
  const fullAttempt = fullWord.substring(0, revealedLetters) + userInput;

  // Check if the guess is correct
  if (fullAttempt === fullWord) {
    document.getElementById('result').textContent = "Correct! 🎉";
    document.getElementById('result').style.color = "green";
  } else {
    document.getElementById('result').textContent = "Try Again!";
    document.getElementById('result').style.color = "red";
  }
}

// Keypad button logic
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