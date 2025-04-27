const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinBtn');
    const resultModal = document.getElementById('resultModal');
    const resultText = document.getElementById('resultText');
    const resultCode = document.getElementById('resultCode');
    const closeModal = document.getElementById('closeModal');

    const prizes = [
      { text: "10% Off", code: "SPIN10" },
      { text: "Free Drink", code: "SPINDRINK" },
      { text: "20% Off", code: "SPIN20" },
      { text: "Try Again", code: "" },
      { text: "Free Ticket", code: "SPINTICKET" },
      { text: "15% Off", code: "SPIN15" }
    ];

    let spinning = false;
    let currentRotation = 0;

    spinBtn.addEventListener('click', () => {
      if (spinning) return;
      spinning = true;
      spinBtn.disabled = true;

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

        const prize = prizes[prizeIndex];
        if (prize.code) {
          resultText.textContent = `You won: ${prize.text}`;
          resultCode.textContent = prize.code;
          resultModal.style.display = 'flex';
        } else {
          alert("Try again next time!");
        }
      }, 4000);
    });

    closeModal.addEventListener('click', () => {
      resultModal.style.display = 'none';
    });