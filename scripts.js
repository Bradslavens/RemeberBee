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
document.getElementById('submitButton').addEventListener('click', () => {
  const wordInput = document.getElementById('wordInput');
  const outputDiv = document.getElementById('outputDiv');
  if (wordInput.value.trim()) {
    outputDiv.textContent += (outputDiv.textContent ? ' ' : '') + wordInput.value.trim();
    wordInput.value = ''; // Clear the input field
  }
});