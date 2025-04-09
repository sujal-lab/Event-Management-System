// Sample event data
const events = [
    {
      name: "Freshers Party",
      date: "2025-25-03"
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
      eventList.innerHTML = "<li>No events to display.</li>";
      return;
    }
  
    eventArray.forEach(event => {
      const li = document.createElement("li");
      li.textContent = `${event.name} - ${event.date}`;
      li.classList.add(new Date(event.date) >= today ? "upcoming" : "past");
      eventList.appendChild(li);
    });
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
  