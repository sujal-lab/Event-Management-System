document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector(".dark-mode-toggle");
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Sidebar Toggle
    const sidebar = document.querySelector(".sidebar");
    const toggleSidebar = document.querySelector(".toggle-sidebar");
    toggleSidebar.addEventListener("click", function () {
        sidebar.style.transform = sidebar.style.transform === "translateX(-100%)" ? "translateX(0)" : "translateX(-100%)";
    });

    // Sample Event Data
    const events = [
        { name: "Freshers", type: "upcoming" },
        { name: "Stand-Up Comedy Night", type: "upcoming" },
        { name: "Rangrezz 2024", type: "past" },
        { name: "Vibinz", type: "past" },
        { name: "Dgit Squad E-Sport Trophy", type: "past" },
        { name: "Pitara Nights", type: "upcoming" }
    ];

    // Display Events
    function renderEvents(filter = "all") {
        const eventList = document.getElementById("event-list");
        eventList.innerHTML = "";
        const filteredEvents = events.filter(event => filter === "all" || event.type === filter);
        
        if (filteredEvents.length === 0) {
            eventList.innerHTML = "<li>No events found.</li>";
        } else {
            filteredEvents.forEach(event => {
                let li = document.createElement("li");
                li.textContent = event.name;
                eventList.appendChild(li);
            });
        }
    }

    // Search & Filter
    document.getElementById("search").addEventListener("input", function (e) {
        const searchText = e.target.value.toLowerCase();
        renderEvents();
        const listItems = document.querySelectorAll("#event-list li");
        listItems.forEach(item => {
            if (!item.textContent.toLowerCase().includes(searchText)) {
                item.style.display = "none";
            }
        });
    });

    document.getElementById("filter").addEventListener("change", function (e) {
        renderEvents(e.target.value);
    });

    renderEvents();
});
