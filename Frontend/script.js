document.addEventListener("DOMContentLoaded", function () {
    const eventTable = document.querySelector("#eventTable tbody");
    const addEventBtn = document.getElementById("addEventBtn");
    const eventNameInput = document.getElementById("eventName");
    const eventDateInput = document.getElementById("eventDate");
    const eventStatusInput = document.getElementById("eventStatus");
    const notificationBanner = document.getElementById("notificationBanner");
    const notificationCountBadge = document.getElementById("notificationCount");
    let notificationCount = 0;
    const userRole = "admin";

    function updateNotificationCount() {
        notificationCount++;
        notificationCountBadge.innerText = notificationCount;
        notificationCountBadge.style.display = "inline-block";
    }

    function addNotification(message, type = "success") {
        console.log("Notification Triggered:", message, type); // Debugging log
        notificationBanner.innerText = message;
        notificationBanner.className = `notification-banner ${type}`;
        notificationBanner.style.display = "block";

        setTimeout(() => {
            notificationBanner.style.opacity = "0";
            setTimeout(() => {
                notificationBanner.style.display = "none";
                notificationBanner.style.opacity = "1";
            }, 500);
        }, 3000);
    }

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

    addEventBtn.addEventListener("click", function () {
        if (userRole !== "admin") return;

        const eventName = eventNameInput.value.trim();
        const eventDate = eventDateInput.value.trim();
        const eventStatus = eventStatusInput.value;

        if (!eventName || !eventDate) {
            addNotification("⚠️ Please fill in all fields!", "error");
            return;
        }

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${eventName}</td>
            <td>${eventDate}</td>
            <td>${eventStatus}</td>
            <td><button class="delete-btn"><i class="fas fa-trash"></i> Delete</button></td>
        `;

        const deleteBtn = newRow.querySelector(".delete-btn");
        attachDeleteEvent(deleteBtn);
        eventTable.appendChild(newRow);
        addNotification(`✅ Event "${eventName}" added successfully!`);

        eventNameInput.value = "";
        eventDateInput.value = "";
    });

    document.querySelectorAll(".delete-btn").forEach(attachDeleteEvent);

    function fetchNotifications() {
        fetch("/get-notifications")
            .then(response => response.json())
            .then(data => {
                if (data && typeof data.unreadCount !== "undefined") {
                    notificationCount = data.unreadCount;
                    updateNotificationCount();
                }
            })
            .catch(error => console.error("Error fetching notifications:", error));
    }

    fetchNotifications();

    const searchEventInput = document.querySelector("#searchEvents");
    const eventTableBody = document.querySelector("#eventTable tbody");

    searchEventInput.addEventListener("input", function () {
        const searchText = searchEventInput.value.toLowerCase().trim();
        let found = false;
        const matchingRows = [];

        document.querySelectorAll("#eventTable tbody tr").forEach(row => {
            const eventName = row.querySelector("td:first-child").textContent.toLowerCase();
            if (eventName.includes(searchText)) {
                found = true;
                matchingRows.push(row);
            }
            row.style.display = eventName.includes(searchText) ? "" : "none";
        });

        if (found) {
            addNotification("✅ Event found and relocated!", "success");
            matchingRows.forEach(row => eventTableBody.prepend(row));
        } else if (searchText.length > 0) {
            addNotification("⚠️ No matching event found!", "error");
        }
    });

    const searchUserInput = document.querySelector("#searchUsers");

    searchUserInput.addEventListener("input", function () {
        const searchText = searchUserInput.value.toLowerCase().trim();
        let found = false;

        document.querySelectorAll("#userTable tbody tr").forEach(row => {
            const userName = row.querySelector("td:first-child").textContent.toLowerCase();
            row.style.display = userName.includes(searchText) ? "" : "none";
            row.classList.toggle("highlight", userName.includes(searchText));
            if (userName.includes(searchText)) found = true;
        });

        if (!found && searchText.length > 0) {
            addNotification("⚠️ No matching user found!", "error");
        }
    });

    const userTable = document.querySelector("#userTable tbody");
    const addUserBtn = document.getElementById("addUserBtn");
    const userNameInput = document.getElementById("userName");
    const userEmailInput = document.getElementById("userEmail");

    addUserBtn.addEventListener("click", function () {
        const userName = userNameInput.value.trim();
        const userEmail = userEmailInput.value.trim();

        if (!userName || !userEmail) {
            addNotification("⚠️ Please fill in all fields!", "error");
            return;
        }

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${userName}</td>
            <td>${userEmail}</td>
            <td><button class="delete-user"><i class="fas fa-trash"></i> Delete</button></td>
        `;

        const deleteBtn = newRow.querySelector(".delete-user");
        deleteBtn.addEventListener("click", function () {
            const row = this.closest("tr");
            row.classList.add("fade-out");
            setTimeout(() => {
                row.remove();
                addNotification("❌ User removed!", "error");
            }, 500);
        });

        userTable.appendChild(newRow);
        addNotification(`✅ User "${userName}" added successfully!`);

        userNameInput.value = "";
        userEmailInput.value = "";
    });
});
function showNotification(message, type = "success") {
    let banner = document.querySelector(".notification-banner");

    if (!banner) {
        console.error("Notification banner not found in DOM.");
        return;
    }

    banner.textContent = message;  // Set the message dynamically
    banner.className = "notification-banner"; // Reset classes
    banner.classList.add(type); // Add error or success class
    banner.style.display = "block";

    // Fade out after 3 seconds
    setTimeout(() => {
        banner.classList.add("fade-out");
        setTimeout(() => {
            banner.style.display = "none";
            banner.classList.remove("fade-out"); // Reset for future use
        }, 500);
    }, 3000);
}
