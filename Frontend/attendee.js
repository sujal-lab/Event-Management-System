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

// Filter by type
document.getElementById("filter").addEventListener("change", function () {
  const value = this.value;
  if (value === "upcoming") {
    displayEvents(upcoming);
  } else if (value === "past") {
    displayEvents(past);
  } else {
    displayEvents(events);
  }
});

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
  sidebar.classList.toggle("show");
});

// Auto-close sidebar when a link is clicked (on small screens)
document.querySelectorAll(".sidebar ul li a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      sidebar.classList.remove("show");
    }
  });
});
