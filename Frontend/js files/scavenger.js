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
