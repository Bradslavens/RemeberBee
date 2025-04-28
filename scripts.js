// CONFIGURATION
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

document.getElementById('submitBtn').addEventListener('click', function() {
  const inputs = document.querySelectorAll('.input-box');
  let userInput = "";

  inputs.forEach(input => {
    userInput += input.value.toUpperCase();
  });

  const fullAttempt = fullWord.substring(0, revealedLetters) + userInput;

  if (fullAttempt === fullWord) {
    document.getElementById('result').textContent = "Correct! 🎉";
    document.getElementById('result').style.color = "green";
  } else {
    document.getElementById('result').textContent = "Try Again!";
    document.getElementById('result').style.color = "red";
  }
});