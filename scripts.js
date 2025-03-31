
  document.querySelectorAll('.hexagon').forEach(hexagon => {
    hexagon.addEventListener('click', () => {
      const wordInput = document.getElementById('wordInput');
      wordInput.value += hexagon.textContent;
    });
  });
