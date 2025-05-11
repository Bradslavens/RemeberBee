import signals from './signals.js'; // Import the signals object

// Populate the line selection dropdown
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
  // Add logic here to handle the selected line, e.g., update the keypad or signals
});