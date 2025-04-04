// filepath: /home/brads/projs/RememberBee/scripts.js

import signals from './signals.js';

document.querySelectorAll('.hexagon').forEach(hexagon => {
    hexagon.addEventListener('click', () => {
        const wordInput = document.getElementById('wordInput');
        wordInput.value += hexagon.textContent;
    });
});

const lineSelect = document.getElementById('lineSelect');

// Dynamically populate lineSelect options
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
    const currentSignalArray = signals[selectedLine];

    if (currentSignalArray && currentSignalArray.includes(wordInput.value.trim())) {
      outputDiv.textContent += (outputDiv.textContent ? ' ' : '') + wordInput.value.trim();
    } else {
      console.log("Incorrect guess or no signals available for the selected line.");
    }

    wordInput.value = ''; // Clear the input field
  }
});