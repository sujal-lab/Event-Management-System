
        const wheel = document.getElementById('wheel');
        const spinBtn = document.getElementById('spinBtn');
        const resultModal = document.getElementById('resultModal');
        const resultText = document.getElementById('resultText');
        const resultCode = document.getElementById('resultCode');
        const closeModal = document.getElementById('closeModal');
      
        let spinning = false;
      
        const prizes = [
          { text: "10% Off", code: "SPIN10", degrees: 0 },
          { text: "Free Drink", code: "SPINDRINK", degrees: 60 },
          { text: "20% Off", code: "SPIN20", degrees: 120 },
          { text: "Try Again", code: "", degrees: 180 },
          { text: "Free Ticket", code: "SPINTICKET", degrees: 240 },
          { text: "15% Off", code: "SPIN15", degrees: 300 }
        ];
      
        spinBtn.addEventListener('click', () => {
          if (spinning) return;
          spinning = true;
          spinBtn.disabled = true;
      
          const prizeIndex = Math.floor(Math.random() * prizes.length);
          const extraRotations = Math.floor(Math.random() * 5 + 5) * 360;
          const totalDegrees = extraRotations + (360 - prizes[prizeIndex].degrees);
          
          wheel.style.transform = `rotate(${totalDegrees}deg)`;
      
          setTimeout(() => {
            spinning = false;
            spinBtn.disabled = false;
      
            if (prizes[prizeIndex].code) {
              resultText.textContent = `You won: ${prizes[prizeIndex].text}`;
              resultCode.textContent = prizes[prizeIndex].code;
              resultModal.style.display = 'flex';
            } else {
              alert("Try again next time!");
            }
          }, 4000);
        });
      
        closeModal.addEventListener('click', () => {
          resultModal.style.display = 'none';
        });
      
      