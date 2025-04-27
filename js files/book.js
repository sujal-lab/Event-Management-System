document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const event = document.getElementById("event").value;
    const notes = document.getElementById("notes").value;
  
    if (!name || !email || !event) {
        alert("Please fill out all required fields.");
        return;
    }
  
    alert(`Thank you, ${name}! Your booking has been received.`);
    this.reset();
});