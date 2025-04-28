document.addEventListener('DOMContentLoaded', function() {
  // Create floating particles
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
  
  // Tab switching functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');
          
          // Update active tab button
          tabBtns.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Update active tab content
          tabContents.forEach(content => content.classList.remove('active'));
          document.getElementById(`${tabId}-tab`).classList.add('active');
      });
  });
  
  // Load events from localStorage
  function loadEvents() {
      const myEvents = JSON.parse(localStorage.getItem('myEvents')) || [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Clear example cards if we have real events
      if (myEvents.length > 0) {
          document.getElementById('upcoming-events').innerHTML = '';
          document.getElementById('past-events').innerHTML = '';
      }
      
      let upcomingCount = 0;
      let pastCount = 0;
      let cancelledCount = 0;
      
      myEvents.forEach(event => {
          // Parse event date (assuming format like "Jun 15, 2023")
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0);
          
          // Create event card
          const eventCard = document.createElement('div');
          eventCard.className = 'event-card';
          
          // Determine if event is upcoming or past
          let statusClass = '';
          let statusText = '';
          let dateClass = '';
          
          if (event.status === 'Cancelled') {
              statusClass = 'cancelled';
              statusText = 'Cancelled';
              dateClass = '';
              cancelledCount++;
          } else if (eventDate >= today) {
              statusClass = 'upcoming';
              statusText = 'Confirmed';
              dateClass = 'upcoming';
              upcomingCount++;
          } else {
              statusClass = 'past';
              statusText = 'Attended';
              dateClass = 'past';
              pastCount++;
          }
          
          eventCard.classList.add(statusClass);
          
          // Format price if not already formatted
          let price = event.price || event.totalAmount;
          if (price && !price.startsWith('$')) {
              price = '$' + parseFloat(price).toFixed(2);
          }
          
          eventCard.innerHTML = `
              <img src="${event.poster || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}" alt="${event.name}" class="event-poster">
              <div class="event-details">
                  <div class="event-date ${dateClass}">${event.date}</div>
                  <h3 class="event-title">${event.name}</h3>
                  <div class="event-meta">
                      <div class="event-meta-item"><i class="fas fa-clock"></i> ${event.time || '7:00 PM'}</div>
                      <div class="event-meta-item"><i class="fas fa-map-marker-alt"></i> ${event.location || 'Venue TBD'}</div>
                  </div>
                  <p class="event-description">${event.description || 'Join us for an amazing event with great music, food, and entertainment!'}</p>
                  <div class="event-actions">
                      <span class="event-price">${price || '$0.00'}</span>
                      <span class="event-status status-${statusClass.toLowerCase()}">${statusText}</span>
                  </div>
              </div>
          `;
          
          // Add to appropriate container
          if (statusClass === 'upcoming') {
              document.getElementById('upcoming-events').appendChild(eventCard);
          } else if (statusClass === 'past') {
              document.getElementById('past-events').appendChild(eventCard);
          } else if (statusClass === 'cancelled') {
              document.getElementById('cancelled-events').appendChild(eventCard);
          }
      });
      
      // Update counts
      document.getElementById('upcoming-count').textContent = `${upcomingCount} ${upcomingCount === 1 ? 'Event' : 'Events'}`;
      document.getElementById('past-count').textContent = `${pastCount} ${pastCount === 1 ? 'Event' : 'Events'}`;
      document.getElementById('cancelled-count').textContent = `${cancelledCount} ${cancelledCount === 1 ? 'Event' : 'Events'}`;
      
      // Show empty states if needed
      if (upcomingCount === 0) {
          document.getElementById('upcoming-empty').style.display = 'block';
      }
      
      if (pastCount === 0) {
          document.getElementById('past-empty').style.display = 'block';
      }
      
      if (cancelledCount === 0) {
          document.getElementById('cancelled-empty').style.display = 'block';
      } else {
          document.getElementById('cancelled-empty').style.display = 'none';
      }
  }
  loadEvents();
  
});