document.getElementById('editBtn').addEventListener('click', function () {
    const inputs = document.querySelectorAll('.info-grid input');
    const isDisabled = inputs[0].disabled;
  
    inputs.forEach(input => {
      input.disabled = !isDisabled;
    });
  
    this.textContent = isDisabled ? 'Save Profile' : 'Edit Profile';
  
    if (!isDisabled) {
      alert("✅ Profile saved successfully!");
      // You can optionally store to localStorage or send to server here
    }
  });
  
  function downloadData() {
    alert("📄 Your data has been downloaded!");
  }
  
  function deleteAccount() {
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      alert("🗑️ Account deleted!");
      // Redirect or delete logic goes here
    }
  }
  