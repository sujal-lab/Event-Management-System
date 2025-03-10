document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            row.classList.add("fade-out");
            setTimeout(() => row.remove(), 500);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Handle event deletion
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            row.classList.add("fade-out");
            setTimeout(() => row.remove(), 500);
        });
    });

    // Handle user deletion
    document.querySelectorAll(".delete-user").forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            row.classList.add("fade-out");
            setTimeout(() => row.remove(), 500);
        });
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

        // Add delete functionality to new buttons
        newRow.querySelector(".delete-btn").addEventListener("click", function () {
            newRow.classList.add("fade-out");
            setTimeout(() => newRow.remove(), 500);
        });

        // Clear input fields after adding
        document.getElementById("eventName").value = "";
        document.getElementById("eventDate").value = "";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Notification System
    let notificationCount = 0;
    const notificationList = document.getElementById("notifications");
    const notificationBadge = document.getElementById("notificationCount");

    function addNotification(message) {
        notificationCount++;
        notificationBadge.innerText = notificationCount;

        const newNotification = document.createElement("li");
        newNotification.innerText = message;
        notificationList.appendChild(newNotification);
    }

    document.querySelector(".notifications").addEventListener("click", function () {
        document.getElementById("notificationList").classList.toggle("show");
    });

    // Add Event Notification
    document.getElementById("addEventBtn").addEventListener("click", function () {
        const eventName = document.getElementById("eventName").value;
        if (eventName !== "") {
            addNotification(`New Event Added: ${eventName}`);
        }
    });

    // Search Functionality for Events
    document.getElementById("searchEvents").addEventListener("input", function () {
        const searchValue = this.value.toLowerCase();
        document.querySelectorAll("#eventTable tbody tr").forEach(row => {
            const eventName = row.cells[0].innerText.toLowerCase();
            row.style.display = eventName.includes(searchValue) ? "" : "none";
        });
    });

    // Search Functionality for Users
    document.getElementById("searchUsers").addEventListener("input", function () {
        const searchValue = this.value.toLowerCase();
        document.querySelectorAll("#userTable tbody tr").forEach(row => {
            const userName = row.cells[0].innerText.toLowerCase();
            row.style.display = userName.includes(searchValue) ? "" : "none";
        });
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        themeToggle.innerHTML = document.body.classList.contains("dark-mode") 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
});

