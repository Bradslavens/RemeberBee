// filepath: /home/brads/projs/RememberBee/scripts.js

import signals from './signals.js';

document.querySelectorAll('.hexagon').forEach(hexagon => {
    hexagon.addEventListener('click', () => {
        const wordInput = document.getElementById('wordInput');
        wordInput.value += hexagon.textContent;
    });
});

// Example: Log the signals array
console.log(signals);
let currentSignalIndex = 0;

document.getElementById('submitButton').addEventListener('click', () => {
  const wordInput = document.getElementById('wordInput');
  const outputDiv = document.getElementById('outputDiv');
  
  if (wordInput.value.trim()) {
    if (wordInput.value.trim() === signals[currentSignalIndex]) {
      outputDiv.textContent += (outputDiv.textContent ? ' ' : '') + wordInput.value.trim();
      currentSignalIndex = (currentSignalIndex + 1) % signals.length; // Move to the next signal
    } else {
      console.log("incorrect guess");
    }
    wordInput.value = ''; // Clear the input field
  }
});