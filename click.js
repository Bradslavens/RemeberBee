// Create an audio object for the click sound and preload it
const clickSound = new Audio('click.mp3');
clickSound.preload = 'auto'; // Preload the audio file

// Function to play the click sound
export function playClickSound() {
    // Reset the audio to the start and play it
    clickSound.currentTime = 0; // Ensure the sound starts from the beginning
    clickSound.play();
}