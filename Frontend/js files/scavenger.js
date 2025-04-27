let foundCount = 0;
const totalItems = 5;

const hiddenItems = document.querySelectorAll('.hidden-item');
const winModal = document.getElementById('winModal');
const closeModal = document.getElementById('closeModal');

hiddenItems.forEach(item => {
  item.addEventListener('click', () => {
    item.style.visibility = 'hidden';
    foundCount++;
    if (foundCount === totalItems) {
      winModal.style.display = 'flex';
    }
  });
});

closeModal.addEventListener('click', () => {
  winModal.style.display = 'none';
});
let score = 0;

function collectItem(icon) {
  icon.style.display = 'none';
  score++;
  document.getElementById('score').textContent = `Score: ${score}/5`;
  
  if (score === 5) {
    setTimeout(() => {
      alert("🎉 Congratulations! You found all the icons!");
    }, 200);
  }
}
