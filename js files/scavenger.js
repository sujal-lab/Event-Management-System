let score = 0;
const totalItems = 5;
const hiddenItems = document.querySelectorAll('.hidden-item');
const winModal = document.getElementById('winModal');
const closeModal = document.getElementById('closeModal');
const scoreDisplay = document.getElementById('score');

function collectItem(icon) {
  icon.style.display = 'none'; 
  score++; 
  scoreDisplay.textContent = `Score: ${score}/5`;

  if (score === totalItems) {
    setTimeout(() => {
     
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
      alert("🎉 Congratulations! You found all the icons!");
    }, 200);
  }
}


hiddenItems.forEach(item => {
  item.addEventListener('click', () => collectItem(item)); 
});


closeModal.addEventListener('click', () => {
  winModal.style.display = 'none';
});
