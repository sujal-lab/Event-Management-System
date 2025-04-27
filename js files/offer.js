document.addEventListener('DOMContentLoaded', function() {
  const wheel = document.getElementById('wheel');
  const spinBtn = document.getElementById('spinBtn');
  const resultModal = document.getElementById('resultModal');
  const resultText = document.getElementById('resultText');
  const resultCode = document.getElementById('resultCode');
  const closeModal = document.getElementById('closeModal');
  const prizeDesc = document.getElementById('prizeDesc');
  const spinCount = document.getElementById('spinCount');

  // Set initial spin count (you would normally get this from a server)
  spinCount.textContent = Math.floor(Math.random() * 500) + 50;

  const prizes = [
    { 
      text: "10% Off", 
      code: "SPIN10", 
      desc: "This discount can be applied to any event ticket purchase.",
      emoji: "🎟️",
      color: "#FF6384"
    },
    { 
      text: "Free Drink", 
      code: "SPINDRINK", 
      desc: "Redeem at any event concession stand for a free beverage.",
      emoji: "🍹",
      color: "#36A2EB"
    },
    { 
      text: "20% Off", 
      code: "SPIN20", 
      desc: "Save big on your next event ticket purchase.",
      emoji: "💰",
      color: "#FFCE56"
    },
    { 
      text: "Try Again", 
      code: "", 
      desc: "Better luck next time!",
      emoji: "😢",
      color: "#4BC0C0"
    },
    { 
      text: "Free Ticket", 
      code: "SPINTICKET", 
      desc: "Get one general admission ticket to any event of your choice!",
      emoji: "🎫",
      color: "#9966FF"
    },
    { 
      text: "15% Off", 
      code: "SPIN15", 
      desc: "A nice discount for your next event experience.",
      emoji: "💲",
      color: "#FF9F40"
    }
  ];

  // Create wheel segments
  function createWheelSegments() {
    const segmentAngle = 360 / prizes.length;
    const centerX = 160;
    const centerY = 160;
    const radius = 140;
    
    prizes.forEach((prize, index) => {
      const angle = index * segmentAngle;
      const label = document.createElement('div');
      label.className = 'wheel-label';
      label.textContent = prize.emoji;
      label.style.color = 'white';
      label.style.fontSize = '24px';
      
      // Position the label
      const labelAngle = angle + segmentAngle / 2;
      const radians = (labelAngle - 90) * Math.PI / 180;
      const labelX = centerX + Math.cos(radians) * (radius - 40);
      const labelY = centerY + Math.sin(radians) * (radius - 40);
      
      label.style.left = `${labelX}px`;
      label.style.top = `${labelY}px`;
      label.style.transform = `rotate(${labelAngle}deg)`;
      
      wheel.appendChild(label);
    });
  }

  createWheelSegments();

  let spinning = false;
  let currentRotation = 0;
  let spinCounter = parseInt(spinCount.textContent);

  spinBtn.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;
    spinBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SPINNING...';

    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    const targetAngle = (prizes.length - prizeIndex) * segmentAngle - segmentAngle / 2;
    const extraSpins = 5 * 360;
    const totalRotation = extraSpins + targetAngle;

    currentRotation += totalRotation;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
      spinning = false;
      spinBtn.disabled = false;
      spinBtn.innerHTML = '<i class="fas fa-sync-alt"></i> SPIN AGAIN';
      
      // Increment spin counter
      spinCounter++;
      spinCount.textContent = spinCounter;

      const prize = prizes[prizeIndex];
      if (prize.code) {
        resultText.innerHTML = `You won: <span class="prize-name">${prize.text} ${prize.emoji}</span>`;
        resultCode.textContent = prize.code;
        prizeDesc.textContent = prize.desc;
        document.querySelector('.prize-badge').textContent = prize.emoji;
        resultModal.style.display = 'flex';
        createConfetti();
      } else {
        showTryAgain();
      }
    }, 4000);
  });

  function showTryAgain() {
    const tryAgainModal = document.createElement('div');
    tryAgainModal.className = 'result-modal';
    tryAgainModal.innerHTML = `
      <div class="modal-content">
        <div class="prize-badge">😢</div>
        <h2>Try Again!</h2>
        <p>You didn't win this time, but don't give up!</p>
        <p>Come back tomorrow for another chance to win.</p>
        <button class="close-modal" id="closeTryAgain"><i class="fas fa-times"></i> Close</button>
      </div>
    `;
    document.body.appendChild(tryAgainModal);
    tryAgainModal.style.display = 'flex';
    
    document.getElementById('closeTryAgain').addEventListener('click', () => {
      tryAgainModal.style.display = 'none';
      setTimeout(() => {
        document.body.removeChild(tryAgainModal);
      }, 300);
    });
  }

  closeModal.addEventListener('click', () => {
    resultModal.style.display = 'none';
  });

  function createConfetti() {
    const colors = ['#ff4757', '#ff6348', '#ff7f50', '#ffa502', '#ffd700', '#00d2d3'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = Math.random() * 10 + 5 + 'px';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      document.body.appendChild(confetti);
      
      const animationDuration = Math.random() * 3 + 2;
      
      confetti.style.animation = `confettiFall ${animationDuration}s ease-in forwards`;
      
      setTimeout(() => {
        confetti.remove();
      }, animationDuration * 1000);
    }
  }

  // Add confetti animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0% {
        opacity: 1;
        transform: translateY(-100vh) rotate(0deg);
      }
      100% {
        opacity: 0;
        transform: translateY(100vh) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);

  // Copy offer codes when clicked
  document.querySelectorAll('.offer-code').forEach(code => {
    code.addEventListener('click', function() {
      const textToCopy = this.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => {
          this.textContent = originalText;
        }, 2000);
      });
    });
  });
});