// Attendee Data (Simulated - Can be replaced with API call)
const attendee = {
    name: "Saksham Deep",
    events: [
        { id: 1, name: "Tech Conference", date: "2025-03-15", time: "10:00 AM", venue: "Hall A", status: "Confirmed" },
        { id: 2, name: "AI Summit", date: "2025-02-10", time: "2:00 PM", venue: "Room 302", status: "Past" },
        { id: 3, name: "Web Dev Meetup", date: "2025-03-20", time: "4:00 PM", venue: "Hall B", status: "Pending" }
    ],
    notifications: [
        "Your event 'Tech Conference' is confirmed ✅",
        "Schedule change: 'AI Summit' moved to 2:00 PM ⏰"
    ]
};

// Utility function to check if an event is past
function isPastEvent(eventDate) {
    return new Date(eventDate) < new Date();
}

// Load attendee details and events
function loadDashboard() {
    document.getElementById("saksham").textContent = attendee.name;

    const eventList = document.getElementById("event-list");
    eventList.innerHTML = ""; // Clear old data

    let upcomingCount = 0;
    let pastCount = 0;

    attendee.events.forEach(event => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${event.name}</strong> - ${event.date} | ${event.time} | ${event.venue}
            <span class="status ${event.status.toLowerCase()}">${event.status}</span>
        `;

        if (event.status === "Confirmed" || event.status === "Pending") {
            upcomingCount++;
        } else {
            pastCount++;
        }

        eventList.appendChild(listItem);
    });

    // Update counters
    document.getElementById("upcoming-count").textContent = upcomingCount;
    document.getElementById("past-count").textContent = pastCount;
    document.getElementById("notifications-count").textContent = attendee.notifications.length;
}

// Logout functionality
document.getElementById("logout").addEventListener("click", () => {
    alert("Logging out...");
    window.location.href = "login.html"; // Replace with actual login page
});

// Initialize dashboard on page load
document.addEventListener("DOMContentLoaded", loadDashboard);
