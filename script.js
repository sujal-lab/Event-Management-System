document.addEventListener("DOMContentLoaded", function () {
    const eventTable = document.querySelector("#eventTable tbody");
    const addEventBtn = document.getElementById("addEventBtn");
    const eventNameInput = document.getElementById("eventName");
    const eventDateInput = document.getElementById("eventDate");
    const eventStatusInput = document.getElementById("eventStatus");
    const notificationBanner = document.getElementById("notificationBanner");
    const notificationCountBadge = document.getElementById("notification-count"); // Badge for notifications
    let notificationCount = 0;

    const userRole = "admin"; // Change this dynamically in real use cases

    document.addEventListener("DOMContentLoaded", function () {
        let notificationCount = 0;
        const notificationBadge = document.getElementById("notification-count");
        const addEventBtn = document.getElementById("addEventBtn");
    
        function updateNotificationCount() {
            notificationCount++; // Increase count
            notificationBadge.innerText = notificationCount;
            notificationBadge.style.display = "inline-block";
        }
    
        addEventBtn.addEventListener("click", function () {
            updateNotificationCount();
        });
    });
    
    /** 🔔 Show Pop-up Notification */
    function addNotification(message, type = "success") {
        notificationCount++; // Increase count
        updateNotificationCount(notificationCount); // Update badge
        
        notificationBanner.innerText = message;
        notificationBanner.className = `notification-banner ${type}`;
        
        // Show the banner
        notificationBanner.style.display = "block";
        notificationBanner.style.animation = "slide-down 0.5s ease-out";

        // Hide after 3 seconds
        setTimeout(() => {
            notificationBanner.style.opacity = "0";
            setTimeout(() => {
                notificationBanner.style.display = "none";
                notificationBanner.style.opacity = "1"; // Reset opacity for next use
            }, 500);
        }, 3000);
    }

    /** ❌ Delete Event */
    function attachDeleteEvent(button) {
        button.addEventListener("click", function () {
            if (userRole !== "admin") return;
            const row = this.closest("tr");
            row.classList.add("fade-out");
            setTimeout(() => {
                row.remove();
                addNotification("❌ Event removed!", "error");
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
            addNotification("⚠️ Please fill in all fields!", "error");
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
    });

    /** 🚀 Initialize */
    document.querySelectorAll(".delete-btn").forEach(attachDeleteEvent);

    /** 🏷️ Update Notification Count Badge */
    function updateNotificationCount(count) {
        if (notificationCountBadge) {
            console.log("Updating notification count to:", count); // ✅ Debugging
            if (count > 0) {
                notificationCountBadge.innerText = count;
                notificationCountBadge.style.display = "inline-block";
            } else {
                notificationCountBadge.style.display = "none";
            }
        }
    }

    /** 🔄 Fetch Unread Notifications from Backend */
    function fetchNotifications() {
        fetch("/get-notifications")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched notifications:", data); // ✅ Debugging

                // Check if `unreadCount` exists in response
                if (data && typeof data.unreadCount !== "undefined") {
                    notificationCount = data.unreadCount;
                    updateNotificationCount(notificationCount);
                } else {
                    console.error("Invalid data format:", data);
                }
            })
            .catch(error => console.error("Error fetching notifications:", error));
    }

    // Call fetchNotifications on load
    fetchNotifications();
});
