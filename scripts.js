import signals from './signals.js';

document.querySelectorAll('.hexagon').forEach(hexagon => {
  hexagon.addEventListener('click', () => {
    const wordInput = document.getElementById('wordInput');

    // Check if the clicked hexagon is the "CLR" button
    if (hexagon.textContent.trim() === 'CLR') {
      wordInput.value = ''; // Clear the input field
    } else {
      wordInput.value += hexagon.textContent; // Append the hexagon's text content
    }
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
let correctGuesses = signals[lineSelect.value]?.signalList?.length || 0; // Initialize correct guesses to the array length or 0 if unavailable

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
        // Display the final score in an overlay
        const overlay = document.createElement('div');
        overlay.innerHTML = `GAME OVER!<br>Your Score: ${correctGuesses} / ${currentSignalArray.length}`;
        
        // Style the overlay
        overlay.style.position = 'fixed';
        overlay.style.top = '50%';
        overlay.style.left = '50%';
        overlay.style.transform = 'translate(-50%, -50%)';
        overlay.style.fontSize = '31.2px';
        overlay.style.color = 'white';
        overlay.style.fontWeight = 'bold';
        overlay.style.zIndex = '1000';
        overlay.style.backgroundColor = '#4caf50'; // Green background for success
        overlay.style.padding = '20px';
        overlay.style.borderRadius = '10px';
        overlay.style.textAlign = 'center';

        // Add the overlay to the body
        document.body.appendChild(overlay);

        // Remove the overlay after 5 seconds
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 5000);

        // Reset the game
        currentSignalIndex = 0;
        correctGuesses = 0;
        outputDiv.textContent = '';
      }
    } else {
      // Create an overlay to display the correct answer
      const overlay = document.createElement('div');
      const correctAnswer = currentSignalArray?.[currentSignalIndex]; // Store the correct answer
      overlay.innerHTML = `INCORRECT!<br>The correct answer was: <span style="font-size: 37.44px;">${correctAnswer}</span>`;
      // Style the overlay
      overlay.style.position = 'fixed';
      overlay.style.top = '50%';
      overlay.style.left = '50%';
      overlay.style.transform = 'translate(-50%, -50%)';
      overlay.style.fontSize = '31.2px';
      overlay.style.color = 'white';
      overlay.style.fontWeight = 'bold';
      overlay.style.zIndex = '1000';
      overlay.style.backgroundColor = '#ff5722'; // Reddish-orange background
      overlay.style.padding = '20px';
      overlay.style.borderRadius = '10px';
      overlay.style.textAlign = 'center';

      // Add the overlay to the body
      document.body.appendChild(overlay);

      // Remove the overlay after 2 seconds
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 2000);
      correctGuesses--; // Increment correct guesses
      console.log("current score " + correctGuesses);

      console.log("Incorrect guess or no signals available for the selected line.");
    }

    // Clear the input field after submission
    wordInput.value = '';
  }
});