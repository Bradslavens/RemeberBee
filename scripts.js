import signals from './signals.js';
import { playClickSound } from './click.js';

document.querySelectorAll('.hexagon').forEach(hexagon => {
    hexagon.addEventListener('click', () => {
        const wordInput = document.getElementById('wordInput');
        playClickSound(); // Play sound when hexagon is clicked
        wordInput.value += hexagon.textContent;
    });
});

const lineSelect = document.getElementById('lineSelect');

// Dynamically populate lineSelect options
lineSelect.innerHTML = ''; // Clear existing options
Object.keys(signals).forEach((lineKey) => {
  const option = document.createElement('option');
  option.value = lineKey;
  option.text = lineKey;
  lineSelect.appendChild(option);
});

lineSelect.addEventListener('change', () => {
  const selectedLine = lineSelect.value;
  if (signals[selectedLine]) {
    currentSignalIndex = 0; // Reset the signal index

    // Update the contents of hexagon main-signal elements
    const mainSignalHexagons = document.querySelectorAll('.hexagon.main-signal');
    const signalPrefix = signals[selectedLine].signalPrefix;

    mainSignalHexagons.forEach(hexagon => {
      hexagon.textContent = signalPrefix; // Set the content to the signal prefix
    });
  } else {
    console.error('Selected line does not exist in signals.');
  }
});

let currentSignalIndex = 0;

document.getElementById('submitButton').addEventListener('click', () => {
  const wordInput = document.getElementById('wordInput');
  const outputDiv = document.getElementById('outputDiv');
       
  if (wordInput.value.trim()) {
    // Access the selected line from the dropdown
    const selectedLine = lineSelect.value;

    // Access the array of signals for the selected line
    const currentSignalArray = signals[selectedLine]?.signalList;

    if (currentSignalArray && wordInput.value.trim() === currentSignalArray[currentSignalIndex]) {
      outputDiv.textContent += (outputDiv.textContent ? ' ' : '') + wordInput.value.trim();
      currentSignalIndex++; // Move to the next signal in the array

      // Check if we've reached the end of the array
      if (currentSignalIndex >= currentSignalArray.length) {
        currentSignalIndex = 0; // Reset the signal index
        console.log("All signals for the selected line have been guessed correctly.");
      }
    } else {
      // Clear the outputDiv and reset the currentSignalIndex
      outputDiv.textContent = ''; // Clear the output div

      // Create an overlay to display the correct answer
      const overlay = document.createElement('div');
      const correctAnswer = currentSignalArray?.[currentSignalIndex]; // Store the correct answer
      overlay.textContent = `Incorrect! The correct answer was: ${correctAnswer}`;
      if (currentSignalIndex >= currentSignalArray?.length) {
        currentSignalIndex = 0; // Reset the signal index if it exceeds the array length
      }
      // Reset the game after displaying the correct answer
      outputDiv.textContent = ''; // Clear the output div
      currentSignalIndex = 0; // Reset the signal index
      overlay.style.position = 'fixed';
      overlay.style.top = '50%';
      overlay.style.left = '50%';
      overlay.style.transform = 'translate(-50%, -50%)';
      overlay.style.fontSize = '24px';
      overlay.style.color = 'white';
      overlay.style.fontWeight = 'bold';
      overlay.style.zIndex = '1000';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      overlay.style.padding = '20px';
      overlay.style.borderRadius = '10px';
      overlay.style.textAlign = 'center';
        
      // Add the overlay to the body
      document.body.appendChild(overlay);
      
      currentSignalIndex = 0; // Reset the signal index
        
      // Remove the overlay after 2 seconds
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 2000);
        
      console.log("Incorrect guess or no signals available for the selected line.");
    }

    wordInput.value = ''; // Clear the input field
  }
});