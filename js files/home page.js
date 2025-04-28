document.addEventListener('DOMContentLoaded', function() {
    // ===== PASSWORD TOGGLE =====
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // ===== SOCIAL BUTTON EFFECTS =====
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });

    // ===== MODAL HANDLING =====
    const modal = document.getElementById("login-modal");
    const loginButton = document.querySelector(".login-btn");
    const closeButton = document.querySelector(".close-button");

    // Create login error element if it doesn't exist
    let loginError = document.getElementById('login-error');
    if (!loginError && modal) {
        loginError = document.createElement('div');
        loginError.id = 'login-error';
        loginError.className = 'alert alert-danger';
        loginError.style.display = 'none';
        loginError.style.marginBottom = '15px';
        const modalBody = modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.insertBefore(loginError, modalBody.firstChild);
        }
    }

    if (loginButton && modal) {
        loginButton.addEventListener("click", function(event) {
            event.preventDefault();
            modal.style.display = "flex";
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    }

    if (closeButton && modal) {
        closeButton.addEventListener("click", function() {
            closeModal();
        });
    }

    if (modal) {
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        }
    }

    // ===== LOGIN FORM SUBMISSION =====
    const loginForm = document.getElementById('loginForm');
    const formError = loginError || document.getElementById('loginError');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Hide previous error messages
            if (formError) {
                formError.textContent = '';
                formError.style.display = 'none';
            }

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Basic validation
            if (!email || !password) {
                showError("Please fill in all fields");
                return;
            }

            try {
                // Show loading spinner
                const submitBtn = document.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                }

                // Send API request to backend
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log("Login response:", data); // debug output

                if (!response.ok) {
                    throw new Error(data.message || 'Login failed');
                }

                // FIXED TOKEN HANDLING - Check both possible locations
                const token = data.token || data.user?.token;
                if (!token) {
                    throw new Error("No authentication token received");
                }

                // Store auth data with fallbacks
                localStorage.setItem('authToken', token);
                localStorage.setItem('userName', data.user?.name || data.user?.username || '');
                localStorage.setItem('userEmail', data.user?.email || '');
                localStorage.setItem('userId', data.user?.id || data.user?._id || '');
                localStorage.setItem('userRole', data.user?.role || 'user');

                // Close modal if exists
                if (modal) {
                    closeModal();
                }

                // Role-based redirect
                redirectBasedOnRole(data.user?.role || 'user');

            } catch (error) {
                console.error('Login error:', error);
                showError(error.message || 'An error occurred during login');
            } finally {
                // Remove loading state
                const submitBtn = document.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // ===== HELPER FUNCTIONS =====
    function showError(message) {
        const errorElement = formError || document.getElementById('loginError');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        } else {
            console.error('Error:', message);
            alert(message); // Fallback if error element doesn't exist
        }
    }

    function redirectBasedOnRole(role) {
        switch(role.toLowerCase()) {
            case 'admin':
                window.location.href = 'admin panel.html';
                break;
            case 'user':
            case 'attendee':
                window.location.href= 'html files/attendee.html';
                break;
            default:
                window.location.href = '../html files/attendee.html';
                console.warn('Unknown role "${role}", redirecting to default dashboard');
                break;
        }
    }

    // ===== SLICK SLIDER INITIALIZATION =====
    if (typeof $.fn.slick !== 'undefined') {
        $('.slider-container').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 800,
            infinite: true,
            dots: true,
            arrows: true,
            cssEase: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            pauseOnHover: true,
            centerMode: true,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: { slidesToShow: 2, centerMode: false }
                },
                {
                    breakpoint: 768,
                    settings: { slidesToShow: 1, centerMode: true }
                }
            ]
        });
    }

    // ===== AOS ANIMATION INITIALIZATION =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});

// Helper function to parse date strings
function parseEventDate(dateString) {
    // Try multiple date formats
    const parsedDate = new Date(dateString);
    if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
    }
    console.warn("Could not parse date:", dateString);
    return new Date(0); // Return very old date if parsing fails
}




// In home page.js
function loadEvents() {

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const events = JSON.parse(localStorage.getItem('events')) || [];
    const upcomingEvents = events.filter(event => {
        try {
            // Parse event date (assuming format like "March 25, 2025")
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0); // Normalize to start of day
            return eventDate >= currentDate;
        } catch (e) {
            console.error("Error parsing date for event:", event.name, e);
            return false; // Exclude events with invalid dates
        }
    });
    const container = document.getElementById('event-slider');

    container.innerHTML = '';
    if (events.length === 0) {
        container.innerHTML = `
            <div class="no-events">
                <p>No upcoming events found. Check back later!</p>
                <a href="../Frontend/html files/Events.html" class="cta-button">Browse All Events</a>
            </div>
        `;
        return;
    }

    upcomingEvents.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.setAttribute('data-aos', 'fade-up');
        eventCard.setAttribute('data-aos-delay', `${100 * (index + 1)}`);
        
        eventCard.innerHTML = `
            <img src="${event.poster}" alt="${event.name}" height="560px" width="360px">
            <div class="card-overlay">
                <div class="card-content">
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <p class="event-date">Date: ${event.date}</p>
                    <a href="#" class="card-button" data-event='${JSON.stringify(event).replace(/'/g, "\\'")}'>Book Now</a>
                </div>
            </div>
        `;
        
        container.appendChild(eventCard);
    });

    // Add event delegation for Book Now buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('card-button')) {
        e.preventDefault();
        const eventData = JSON.parse(e.target.getAttribute('data-event'));
        
        // Store the selected event in localStorage
        localStorage.setItem('selectedEvent', JSON.stringify({
            name: eventData.name,
            date: eventData.date,
            time: eventData.time || "7:00 PM", // Default time if not specified
            location: eventData.location || "University Main Hall", // Default location
            price: eventData.price || "$25.00", // Default price
            poster: eventData.poster
        }));
        
        // Redirect to scanner page
        window.location.href = "/Frontend/html files/scanner.html";
    }
});

// Initialize or refresh the slider
initializeSlider();
}

function initializeSlider() {
    $('.slider-container').slick('destroy').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 800,
        infinite: true,
        dots: true,
        arrows: true,
        cssEase: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        pauseOnHover: true,
        centerMode: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, centerMode: false }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, centerMode: true }
            }
        ]
    });
}


// Initial load when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('card-button')) {
            e.preventDefault();
            const eventData = JSON.parse(e.target.getAttribute('data-event'));
            
            localStorage.setItem('selectedEvent', JSON.stringify({
                name: eventData.name,
                date: eventData.date,
                time: eventData.time || "7:00 PM",
                location: eventData.location || "University Main Hall",
                price: eventData.price || "$25.00",
                poster: eventData.poster
            }));
            
            // Use absolute path to be safe
            window.location.href = "/Frontend/html files/scanner.html";
        }
    });
    
    // Also load events when storage changes (if admin adds new events in another tab)
    window.addEventListener('storage', loadEvents);

});




    
//     container.innerHTML = events.map(event => `
//         <div class="event-card" style="background-image: url('${event.poster}');">
//           <div class="card-overlay">
//             <div class="card-content">
//               <h3>${event.name}</h3>
//               <p>${event.description}</p>
//               <p class="event-date">Date: ${event.date}</p>
//               <a href="#" class="card-button">Book Now</a>
//             </div>
//           </div>
//         </div>
//       `).join('');
      
  
//       $('.slider-container').slick('destroy');
//     if (events.length > 0) {
//         $('.slider-container').slick({
//             slidesToShow: 3,
//             slidesToScroll: 1,
//             autoplay: true,
//             autoplaySpeed: 3000,
//             speed: 800,
//             infinite: true,
//             dots: true,
//             arrows: true,
//             cssEase: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
//             pauseOnHover: true,
//             centerMode: true,
//             variableWidth: true,
//             responsive: [
//                 {
//                     breakpoint: 1024,
//                     settings: { slidesToShow: 2, centerMode: false }
//                 },
//                 {
//                     breakpoint: 768,
//                     settings: { slidesToShow: 1, centerMode: true }
//                 }
//             ]
//         });
//     }
      
  
//     // Reinitialize Slick slider
//     $('.slider-container').slick('destroy').slick({
//       dots: true,
//       infinite: true,
//       speed: 300,
//       slidesToShow: 3,
//       responsive: [
//         { breakpoint: 768, settings: { slidesToShow: 1 } }
//       ]
//     });
//   }
  
//   // Initial load
//   document.addEventListener('DOMContentLoaded', loadEvents);
  
  // Refresh when storage changes
//   window.addEventListener('storage', loadEvents);

  function searchEvents() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.event-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(query) || desc.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
