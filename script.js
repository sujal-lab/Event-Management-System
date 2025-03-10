document.addEventListener("DOMContentLoaded", function () {
    // Handle event and user deletion with delegation
    document.body.addEventListener("click", function (event) {
        if (event.target.closest(".delete-btn")) {
            const row = event.target.closest("tr");
            row.classList.add("fade-out");
            setTimeout(() => row.remove(), 500);
            showNotification("❌ Event removed!");
        }

        if (event.target.closest(".delete-user")) {
            const row = event.target.closest("tr");
            row.classList.add("fade-out");
            setTimeout(() => row.remove(), 500);
            showNotification("⚠️ User deleted!");
        }
    });

    // Add new event
    document.getElementById("addEventBtn").addEventListener("click", function () {
        const eventName = document.getElementById("eventName").value;
        const eventDate = document.getElementById("eventDate").value;

        if (eventName === "" || eventDate === "") {
            alert("Please fill in all fields!");
            return;
        }

        const eventTable = document.getElementById("eventTable").getElementsByTagName("tbody")[0];
        const newRow = eventTable.insertRow();
        newRow.innerHTML = `
            <td>${eventName}</td>
            <td>${eventDate}</td>
            <td><button class="delete-btn"><i class="fas fa-trash"></i> Delete</button></td>
        `;

        showNotification(`✅ Event "${eventName}" added successfully!`);

        // Clear input fields
        document.getElementById("eventName").value = "";
        document.getElementById("eventDate").value = "";
    });

    // Notification System
    let notificationCount = 0;
    const notificationBadge = document.getElementById("notificationCount");
const notificationList = document.getElementById("notificationList");
function addNotification(message) {
    notificationCount++;

    // Check if notificationBadge exists
    if (notificationBadge) {
        notificationBadge.innerText = notificationCount;
        notificationBadge.style.display = "inline-block"; // Ensure it's visible
    }

    // Create a new notification item
    const newNotification = document.createElement("li");
    newNotification.innerText = message;
    notificationList.appendChild(newNotification);

    console.log("Notification Added:", message); // Debugging log
}


    document.querySelector(".notifications").addEventListener("click", function () {
        document.getElementById("notificationList").classList.toggle("show");
        console.log("Notification List Clicked");
    });
    
    // Event Notifications
    document.getElementById("addEventBtn").addEventListener("click", function () {
        const eventName = document.getElementById("eventName").value;
        if (eventName !== "") {
            addNotification(`New Event Added: ${eventName}`);
        }
    });

    // Search Functionality (Events & Users)
    function setupSearch(inputId, tableId, message) {
        document.getElementById(inputId).addEventListener("input", function () {
            const searchValue = this.value.toLowerCase();
            let found = false;

            document.querySelectorAll(`#${tableId} tbody tr`).forEach(row => {
                const itemName = row.cells[0].innerText.toLowerCase();
                if (itemName.includes(searchValue)) {
                    row.style.display = "";
                    row.scrollIntoView({ behavior: "smooth", block: "center" });
                    found = true;
                } else {
                    row.style.display = "none";
                }
            });

            showNotification(found ? `🔍 Found matching ${message}!` : `❌ No matching ${message} found.`);
        });
    }

    setupSearch("searchEvents", "eventTable", "event");
    setupSearch("searchUsers", "userTable", "user");

    // Dark Mode Toggle
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        themeToggle.innerHTML = document.body.classList.contains("dark-mode")
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    });

    // Notification Banner
    function showNotification(message) {
        const banner = document.getElementById("notificationBanner");
        banner.innerText = message;
        banner.style.display = "block";

        setTimeout(() => {
            banner.style.display = "none";
        }, 3000);
    }
});
