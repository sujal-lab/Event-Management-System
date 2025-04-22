// Sample event data
const events = [
  {
    name: "Freshers Party",
    date: "2025-03-25"
  },
  {
    name: "Pitaara Nights",
    date: "2025-01-04"
  },
  {
    name: "Sports Tournament",
    date: "2024-04-20"
  }
];

const eventList = document.getElementById("event-list");
const today = new Date();

// Remove bullet styling via JS
eventList.style.listStyle = "none";
eventList.style.paddingLeft = "0";
eventList.style.textAlign = "left";

// Split events
const upcoming = events.filter(e => new Date(e.date) >= today);
const past = events.filter(e => new Date(e.date) < today);

// Update counters
document.getElementById("upcoming-count").textContent = upcoming.length;
document.getElementById("past-count").textContent = past.length;

// Function to display events
function displayEvents(eventArray) {
  eventList.innerHTML = "";

  if (eventArray.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No events to display.";
    styleListItem(li);
    eventList.appendChild(li);
    return;
  }

  eventArray.forEach(event => {
    const li = document.createElement("li");
    li.textContent = `${event.name} - ${event.date}`;
    li.classList.add(new Date(event.date) >= today ? "upcoming" : "past");
    styleListItem(li);
    eventList.appendChild(li);
  });
}

// Style helper
function styleListItem(li) {
  li.style.marginBottom = "0.5rem";
  li.style.textAlign = "left";
  li.style.listStyle = "none";
}

// Initially show all events
displayEvents(events);

const event = [
  { name: "Freshers Party", date: "2025-03-25" },
  { name: "Pitaara Nights", date: "2025-01-04" },
  { name: "Sports Tournament", date: "2024-04-20" },
];

function renderEvents(filterText = '', filterType = 'all') {
  const list = document.getElementById("event-list");
  list.innerHTML = '';

  const today = new Date();
  let matchedEvents = events.filter(event => {
    const matchesText = event.name.toLowerCase().includes(filterText.toLowerCase());
    const eventDate = new Date(event.date);

    if (filterType === 'upcoming' && eventDate < today) return false;
    if (filterType === 'past' && eventDate >= today) return false;
    return matchesText;
  });

  if (matchedEvents.length === 0) {
    list.innerHTML = '<li>No matching events found.</li>';
  } else {
    matchedEvents.forEach(event => {
      const li = document.createElement('li');
      li.textContent = `${event.name} - ${event.date}`;
      list.appendChild(li);
    });
  }
}

document.getElementById("search").addEventListener("input", () => {
  const search = document.getElementById("search").value;
  const filter = document.getElementById("filter").value;
  renderEvents(search, filter);
});

document.getElementById("filter").addEventListener("change", () => {
  const search = document.getElementById("search").value;
  const filter = document.getElementById("filter").value;
  renderEvents(search, filter);
});

renderEvents(); // Initial render


// Search logic
document.getElementById("search").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const filtered = events.filter(e => e.name.toLowerCase().includes(keyword));
  displayEvents(filtered);
});

// Sidebar toggle for small screens
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// Auto-close sidebar when a link is clicked (on small screens)
document.querySelectorAll(".sidebar ul li a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      sidebar.classList.remove("show");
    }
  });
});
async function fetchDashboardData() {
  try {
    const response = await fetch('/api/dashboard-data'); // Your backend endpoint
    const data = await response.json();

    const today = new Date();
    let upcoming = 0, past = 0;

    data.events.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate >= today) {
        upcoming++;
      } else {
        past++;
      }
    });

    // Update counts
    document.getElementById("upcoming-count").textContent = upcoming;
    document.getElementById("past-count").textContent = past;
    document.getElementById("notifications-count").textContent = data.notifications.length;

    // Optional: Render events to their respective sections
    renderEvents(data.events);
  } catch (err) {
    console.error("Failed to fetch dashboard data:", err);
  }
}

function renderEvents(events) {
  const upcomingContainer = document.getElementById("upcoming-events");
  const pastContainer = document.getElementById("past-events");
  const today = new Date();

  upcomingContainer.innerHTML = "";
  pastContainer.innerHTML = "";

  events.forEach(event => {
    const eventDate = new Date(event.date);
    const cardHTML = `
      <div class="event-card">
        <h4>${event.title}</h4>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
      </div>
    `;
    if (eventDate >= today) {
      upcomingContainer.innerHTML += cardHTML;
    } else {
      pastContainer.innerHTML += cardHTML;
    }
  });
}

document.addEventListener("DOMContentLoaded", fetchDashboardData);
