
document.addEventListener('DOMContentLoaded', function () {
    // Toggle password visibility
    const togglePassword = document.querySelectorAll('.toggle-password');
    togglePassword.forEach(icon => {
        icon.addEventListener('click', function () {
            const passwordInput = this.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Gather form data
        const fullName = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const role = document.getElementById('role').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Validate fields
        if (!fullName || !email || !role || !password || !confirmPassword) {
            return alert('⚠️ Please fill out all fields.');
        }

        if (!isValidEmail(email)) {
            return alert('⚠️ Please enter a valid email address.');
        }

        if (password !== confirmPassword) {
            return alert('❌ Passwords do not match.');
        }

        if (!termsAccepted) {
            return alert('⚠️ Please agree to the Terms & Conditions.');
        }

        const formData = {
            name: fullName,
            email: email,
            role: role,
            password: password
        };

        // Send form data to backend
        fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'User registered successfully') {
                alert('✅ Registered successfully!');
                form.reset();
            } else {
                alert('❌ Error: ' + data.message);
            }
        })
        .catch(err => {
            console.error(err);
            alert('⚠️ Something went wrong!');
        });
    });

    // Email validation function
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
