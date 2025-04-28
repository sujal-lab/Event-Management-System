document.addEventListener('DOMContentLoaded', function() {

    function createParticles(containerId, count) {
        const container = document.getElementById(containerId);
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size between 2px and 6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.bottom = `-${size}px`;
            
            // Random animation duration between 10s and 20s
            const duration = Math.random() * 10 + 10;
            particle.style.animationDuration = `${duration}s`;
            
            // Random delay
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(particle);
        }
    }
    
    createParticles('particles', 30);
    createParticles('particles-form', 20);
    
    // Check if an event was selected
    const storedEvent = localStorage.getItem('selectedEvent');
    if (storedEvent) {
        const eventDetails = JSON.parse(storedEvent);
        
            
            // Populate event details
            document.getElementById('event-name').textContent = eventDetails.name;
            document.getElementById('event-date').textContent = eventDetails.date;
            document.getElementById('event-time').textContent = eventDetails.time;
            document.getElementById('event-location').textContent = eventDetails.location;
            document.getElementById('event-price').textContent = eventDetails.price;
            document.getElementById('event-poster').src = eventDetails.poster;
            
             // Also populate booking info section
             document.getElementById('booking-event').textContent = eventDetails.name;
             document.getElementById('booking-date').textContent = eventDetails.date;
         } else {
             // If no event was selected, show a default or error
             alert("No event selected. Redirecting to homepage.");
             window.location.href = "home.html";
         }
         
         // Calculate total amount when tickets number changes
         document.getElementById('tickets').addEventListener('change', function() {
             const price = parseFloat(document.getElementById('event-price').textContent.replace('$', ''));
             const tickets = parseInt(this.value);
             document.getElementById('total-amount').textContent = '$' + (price * tickets).toFixed(2);
         });
         
         // Initialize with default total
         const initialPrice = parseFloat(document.getElementById('event-price').textContent.replace('$', '') || 25);
         document.getElementById('total-amount').textContent = '$' + initialPrice.toFixed(2);
         
         // Scanner functionality
         let html5QrcodeScanner = null;
         let isScannerActive = false;
         
         document.getElementById('start-scanner').addEventListener('click', function() {
             const scannerContainer = document.getElementById('scanner');
             
             if (isScannerActive) {
                 // Stop scanner
                 if (html5QrcodeScanner) {
                     html5QrcodeScanner.stop().then(() => {
                         console.log("QR Code scanning stopped.");
                         scannerContainer.classList.remove('scanner-active');
                         this.innerHTML = '<i class="fas fa-camera"></i> Start Scanner';
                         isScannerActive = false;
                     }).catch(err => {
                         console.error("Unable to stop scanner:", err);
                     });
                 }
                 return;
             }
             
             // Start scanner
             scannerContainer.innerHTML = '';
             scannerContainer.classList.add('scanner-active');
             
             // Add back the overlay and frame
             const overlay = document.createElement('div');
             overlay.className = 'scanner-overlay';
             scannerContainer.appendChild(overlay);
             
             const frame = document.createElement('div');
             frame.className = 'qr-frame';
             scannerContainer.appendChild(frame);
             
             // This method will trigger user permissions
             Html5Qrcode.getCameras().then(devices => {
                 if (devices && devices.length) {
                     html5QrcodeScanner = new Html5Qrcode("scanner");
                     
                     html5QrcodeScanner.start(
                         devices[0].id, 
                         {
                             fps: 10,
                             qrbox: {width: 200, height: 200}
                         },
                         qrCodeMessage => {
                             // Handle successful scan
                             console.log("QR Code detected:", qrCodeMessage);
                             
                             // Create success message
                             const successMsg = document.createElement('div');
                             successMsg.className = 'scanner-placeholder';
                             successMsg.innerHTML = `
                                 <i class="fas fa-check-circle" style="color: var(--success); font-size: 60px;"></i>
                                 <p style="color: var(--success); font-weight: 600;">Ticket Verified!</p>
                                 <p>${qrCodeMessage}</p>
                             `;
                             
                             // Stop scanner and show success
                             html5QrcodeScanner.stop().then(() => {
                                 scannerContainer.innerHTML = '';
                                 scannerContainer.appendChild(successMsg);
                                 document.getElementById('start-scanner').innerHTML = '<i class="fas fa-camera"></i> Start Scanner';
                                 isScannerActive = false;
                                 
                                 // In a real app, you would verify the ticket with your backend
                             }).catch(err => {
                                 console.error("Unable to stop scanner:", err);
                             });
                         },
                         errorMessage => {
                             // Handle scan error
                             console.error("QR Code scan error:", errorMessage);
                         }
                     ).then(() => {
                         this.innerHTML = '<i class="fas fa-stop-circle"></i> Stop Scanner';
                         isScannerActive = true;
                     }).catch(err => {
                         console.error("Unable to start scanner:", err);
                         scannerContainer.classList.remove('scanner-active');
                         alert("Could not start scanner. Please check camera permissions.");
                     });
                 } else {
                     alert("No cameras found. Please check your device settings.");
                     scannerContainer.classList.remove('scanner-active');
                 }
             }).catch(err => {
                 console.error("Error accessing cameras:", err);
                 scannerContainer.classList.remove('scanner-active');
                 alert("Could not access camera. Please check permissions.");
             });
         });
         
         // Booking confirmation
         document.getElementById('book-now').addEventListener('click', function() {
             const name = document.getElementById('name').value;
             const email = document.getElementById('email').value;
             const phone = document.getElementById('phone').value;
             const tickets = document.getElementById('tickets').value;
             
             if (!name || !email || !phone || !tickets) {
                 alert("Please fill in all required fields.");
                 return;
             }
             
             // Validate email
             if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                 alert("Please enter a valid email address.");
                 return;
             }
             
             // Validate phone (basic validation)
             if (phone.length < 8) {
                 alert("Please enter a valid phone number.");
                 return;
             }
//to link atendee and scanner
             const eventDetails = JSON.parse(localStorage.getItem('selectedEvent'));
 
             
             // In a real app, you would send this data to your backend
             const bookingId = 'EVT-' + Math.floor(100000 + Math.random() * 900000);


//to link atendee and scanner
const booking = {
     id: 'EVT-' + Math.floor(100000 + Math.random() * 900000),
     eventId: eventDetails.id || Date.now().toString(),
     name: eventDetails.name,
     date: eventDetails.date,
     time: eventDetails.time,
     location: eventDetails.location,
     price: eventDetails.price || '$25.00',
     poster: eventDetails.poster,
     bookingDate: new Date().toLocaleDateString(),
     status: 'Confirmed',
     tickets: document.getElementById('tickets').value,
     totalAmount: document.getElementById('total-amount').textContent
 };
 
 // Save to localStorage
 let myEvents = JSON.parse(localStorage.getItem('myEvents') || '[]');
 myEvents.push(booking);
 localStorage.setItem('myEvents', JSON.stringify(myEvents));
 






             
             // Update ticket info
             document.getElementById('booking-id').textContent = bookingId;
             document.getElementById('booking-status').textContent = 'Confirmed';
             document.getElementById('ticket-info').classList.add('visible');
             
             // Create confetti effect
             createConfetti();
             
             // Scroll to ticket info
             setTimeout(() => {
                 document.getElementById('ticket-info').scrollIntoView({ behavior: 'smooth' });
             }, 300);
         });
         
         // Simple confetti effect
         function createConfetti() {
             const confettiContainer = document.createElement('div');
             confettiContainer.style.position = 'fixed';
             confettiContainer.style.top = '0';
             confettiContainer.style.left = '0';
             confettiContainer.style.width = '100%';
             confettiContainer.style.height = '100%';
             confettiContainer.style.pointerEvents = 'none';
             confettiContainer.style.zIndex = '1000';
             document.body.appendChild(confettiContainer);
             
             const colors = ['#FF4D4D', '#00FFC2', '#FFFFFF', '#FFD700', '#9370DB'];
             
             for (let i = 0; i < 100; i++) {
                 const confetti = document.createElement('div');
                 confetti.style.position = 'absolute';
                 confetti.style.width = `${Math.random() * 10 + 5}px`;
                 confetti.style.height = `${Math.random() * 10 + 5}px`;
                 confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                 confetti.style.left = `${Math.random() * 100}vw`;
                 confetti.style.top = '-10px';
                 confetti.style.borderRadius = '50%';
                 confetti.style.opacity = Math.random() * 0.7 + 0.3;
                 
                 const animation = confetti.animate([
                     { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                     { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                 ], {
                     duration: Math.random() * 3000 + 2000,
                     easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
                 });
                 
                 confettiContainer.appendChild(confetti);
                 
                 animation.onfinish = () => {
                     confetti.remove();
                 };
             }
             
             setTimeout(() => {
                 confettiContainer.remove();
             }, 5000);
         }
     });
 