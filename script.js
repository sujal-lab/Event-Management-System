document.addEventListener("DOMContentLoaded", function () {
    const eventTable = document.querySelector("#eventTable tbody");
    const addEventBtn = document.getElementById("addEventBtn");
    const eventNameInput = document.getElementById("eventName");
    const eventDateInput = document.getElementById("eventDate");
    const eventStatusInput = document.getElementById("eventStatus");
    const notificationList = document.getElementById("notifications");
    const notificationBadge = document.getElementById("notificationCount");
    let notificationCount = 0;

    const userRole = "admin"; // Change this dynamically in real use cases

    /** 🔔 Update Notification Badge */
    function updateNotificationBadge() {
        notificationBadge.innerText = notificationCount;
        notificationBadge.style.display = notificationCount > 0 ? "inline-block" : "none";
    }

    /** 📢 Add Notification */
    function addNotification(message) {
        notificationCount++;
        updateNotificationBadge();

        const newNotification = document.createElement("li");
        newNotification.innerText = message;
        notificationList.appendChild(newNotification);
    }

    /** 🛑 Role-Based Access Control */
    function checkPermissions() {
        if (userRole !== "admin") {
            addEventBtn.disabled = true;
            document.querySelectorAll(".delete-btn").forEach(btn => btn.disabled = true);
        }
    }

    /** ❌ Delete Event */
    function attachDeleteEvent(button) {
        button.addEventListener("click", function () {
            if (userRole !== "admin") return;
            const row = this.closest("tr");
            row.classList.add("fade-out");
            setTimeout(() => {
                row.remove();
                addNotification("❌ Event removed!");
            }, 500);
        });
    }

    /** ➕ Add New Event */
    addEventBtn.addEventListener("click", function () {
        if (userRole !== "admin") return;

        const eventName = eventNameInput.value.trim();
        const eventDate = eventDateInput.value.trim();
        const eventStatus = eventStatusInput.value;

        if (!eventName || !eventDate) {
            alert("Please fill in all fields!");
            return;
        }

        // Create new row
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${eventName}</td>
            <td>${eventDate}</td>
            <td>${eventStatus}</td>
            <td><button class="delete-btn"><i class="fas fa-trash"></i> Delete</button></td>
        `;

        // Attach delete functionality
        const deleteBtn = newRow.querySelector(".delete-btn");
        attachDeleteEvent(deleteBtn);

        // Append to table
        eventTable.appendChild(newRow);

        // Show notification
        addNotification(`✅ Event "${eventName}" added successfully!`);

        // Clear inputs
        eventNameInput.value = "";
        eventDateInput.value = "";

        // Reapply role-based access
        checkPermissions();
    });

    /** 🔍 Search Events */
    document.getElementById("searchEvents").addEventListener("input", function () {
        const searchValue = this.value.toLowerCase();
        let found = false;

        document.querySelectorAll("#eventTable tbody tr").forEach(row => {
            const eventName = row.cells[0].innerText.toLowerCase();
            if (eventName.includes(searchValue)) {
                row.style.display = "";
                found = true;
            } else {
                row.style.display = "none";
            }
        });

        if (searchValue.length > 0) {
            addNotification(found ? "🔍 Matching event found!" : "❌ No matching event found.");
        }
    });

    /** 🚀 Initialize */
    document.querySelectorAll(".delete-btn").forEach(attachDeleteEvent);
    checkPermissions();
});
