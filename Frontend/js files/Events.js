let allEvents = [];

function renderEvents(eventsToShow) {
  const container = document.querySelector('.events-grid');
  container.innerHTML = '';
  
  if (eventsToShow.length === 0) {
    container.innerHTML = `
     <div class="no-events" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
        <i class="far fa-calendar-times" style="font-size: 3rem; color: var(--primary);"></i>
        <h3 style="margin: 1rem 0; color: var(--text);">No Events Found</h3>
        <p style="color: var(--text-secondary);">There are no events scheduled for this date.</p>
      </div>
    `;
    return;
  }


  eventsToShow.forEach((event, index) => {
    const eventHTML = `
      <div class="event-box" data-date="${event.date}" data-event-id="${index}">
        <img src="${event.poster}" class="event-img">
        <div class="event-details">
        <p><strong>${event.name || 'Event'}</strong></p>
          <p><strong>Date:</strong> ${formatDate(event.date)}</p>
          <p><strong>Time:</strong> ${event.time}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <button class="book-btn">Book Now</button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', eventHTML);
  });
}

// Helper function to format date as "Month Day, Year"
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function loadEvents() {
  
  allEvents = JSON.parse(localStorage.getItem('events')) || [];
  renderEvents(allEvents);
}


function filterEvents(filterType) {
  const currentDate = new Date().toISOString().split('T')[0];
  let filteredEvents;

  switch(filterType.toLowerCase()) {
    case 'upcoming':
      filteredEvents = allEvents.filter(e => e.date > currentDate);
      break;
    case 'ongoing':
      filteredEvents = allEvents.filter(e => e.date === currentDate);
      break;
    case 'finished':
      filteredEvents = allEvents.filter(e => e.date < currentDate);
      break;
      case 'yesterday':
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      filteredEvents = allEvents.filter(e => e.date === yesterday.toISOString().split('T')[0]);
      break;
    case 'today':
      filteredEvents = allEvents.filter(e => e.date === currentDate);
      break;
    case 'tomorrow':
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      filteredEvents = allEvents.filter(e => e.date === tomorrow.toISOString().split('T')[0]);
      break;
    default:
      filteredEvents = allEvents;
  }
  
  renderEvents(filteredEvents);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  loadEvents();
  // Set today's date as default in the date picker
  const datePicker = document.querySelector('.date-picker');
  datePicker.valueAsDate = new Date();

  // Date picker change handler
  datePicker.addEventListener('change', function() {
    const selectedDate = this.value;
    if (!selectedDate) return;

    const filteredEvents = allEvents.filter(event => event.date === selectedDate);
    renderEvents(filteredEvents);
  });
  
  // Filter button handlers
  document.querySelectorAll('.filter-links a').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const filterType = button.textContent.trim().toLowerCase();
      if (filterType.includes('yesterday')) {
        filterEvents('yesterday');
      } else if (filterType.includes('today')) {
        filterEvents('today');
      } else if (filterType.includes('tomorrow')) {
        filterEvents('tomorrow');
      } else {
        filterEvents(filterType);
      }
    });
  });
  document.querySelector('.events-grid').addEventListener('click', function(e) {
    if (e.target.classList.contains('book-btn')) {
      const eventBox = e.target.closest('.event-box');
      const eventDetails = {
        name: eventBox.querySelector('strong').textContent,
        date: eventBox.querySelector('p:nth-child(2)').textContent.replace('Date:', '').trim(),
        time: eventBox.querySelector('p:nth-child(3)').textContent.replace('Time:', '').trim(),
        location: eventBox.querySelector('p:nth-child(4)').textContent.replace('Location:', '').trim(),
        price: '$25.00', // You would get this from your data
        poster: eventBox.querySelector('img').src
      };
      
      localStorage.setItem('selectedEvent', JSON.stringify(eventDetails));
      window.location.href = 'scanner.html';
    }
  });

  

  
});

