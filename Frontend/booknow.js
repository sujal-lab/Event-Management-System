document.getElementById("booking-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const event = document.getElementById("event").value;
    const notes = document.getElementById("notes").value.trim();
  
    if (name && email && event) {
      alert(`Thank you, ${name}! You've successfully booked for "${event}".`);
      this.reset();
    } else {
      alert("Please fill out all required fields.");
    }
  });
  