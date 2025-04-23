document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const event = document.getElementById("event").value;
    const tickets = document.getElementById("tickets").value;
  
    if (!name || !email || !event || !tickets) {
      alert("Please fill out all required fields.");
      return;
    }
  
    alert(`Thank you, ${name}! Your booking for the ${event} has been received.`);
    this.reset();
  });
  