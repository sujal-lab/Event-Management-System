// book.js

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
  
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Stop default form submit
  
      // Get form data
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const event = document.getElementById('event').value;
  
      // Basic validation
      if (fullName === '' || email === '' || event === '') {
        alert('⚠️ Please fill in all required fields!');
        return;
      }
  
      // If valid, show success message
      alert(`✅ Thank you, ${fullName}! Your booking for the "${event}" event has been received.`);
  
      // Optional: Reset form
      bookingForm.reset();
    });
  });
  