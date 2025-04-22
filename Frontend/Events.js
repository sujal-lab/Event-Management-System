let allEvents = []; // Global array to hold all events

function renderEvents(eventsToShow) {
  const container = document.querySelector('.events-grid');
  container.innerHTML = '';
  
  if (eventsToShow.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: #DC143C; font-size: 20px;">Oops! No events</p>`;
    return;
  }

  eventsToShow.forEach(event => {
    const eventHTML = `
      <div class="event-box" data-date="${event.date}">
        <img src="${event.poster}" class="event-img">
        <div class="event-details">
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Time:</strong> ${event.time}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <button class="book-btn">Book Now</button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', eventHTML);
  });
}

function loadEvents() {
  // Load dynamic events from localStorage
  const dynamicEvents = JSON.parse(localStorage.getItem('events')) || [];
  
  // Static events
  const staticEvents = [
    {
      id: "static1",
      name: "Comedy Night",
      date: "2025-04-10",
      time: "7 PM",
      location: "Auditorium",
      poster: "frontend images/comedy (1).jpg"
    },
    {
      id: "static2",
      name: "Music Fest",
      date: "2025-04-15",
      time: "6 PM",
      location: "Open Grounds",
      poster: "frontend images/comedy (2).jpg"
    }
  ];

  // Combine events
  allEvents = [...staticEvents, ...dynamicEvents];
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
    default:
      filteredEvents = allEvents;
  }
  
  renderEvents(filteredEvents);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  loadEvents();
  
  // Filter button handlers
  document.querySelectorAll('.datee-links a').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const filterType = button.textContent.trim().toLowerCase();
      filterEvents(filterType === 'all events' ? 'all' : filterType);
    });
  });
});

// Sidebar toggle function
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const eventGrid = document.querySelector(".events-grid");
  
  sidebar.classList.toggle("open");
  eventGrid.style.gridTemplateColumns = sidebar.classList.contains("open") 
    ? "repeat(3, 1fr)" 
    : "repeat(4, 1fr)";
}