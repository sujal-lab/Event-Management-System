document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    const notificationList = document.getElementById("notifications");
    const notificationBadge = document.getElementById("notificationCount");
    const notificationBanner = document.getElementById("notificationBanner");
    let notificationCount = 0;

    function updateNotificationBadge() {
        notificationBadge.innerText = notificationCount;
        notificationBadge.style.display = notificationCount > 0 ? "inline-block" : "none";
    }

    function showNotification(message) {
        notificationCount++;
        updateNotificationBadge();
        
        const newNotification = document.createElement("li");
        newNotification.innerText = message;
        notificationList.appendChild(newNotification);
        
        notificationBanner.innerText = message;
        notificationBanner.style.display = "block";
        
        setTimeout(() => {
            notificationBanner.style.display = "none";
        }, 3000);
    }

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            row.classList.add("fade-out");
            setTimeout(() => {
                row.remove();
                showNotification("❌ Event removed!");
            }, 500);
        });
    });

    document.querySelectorAll(".delete-user").forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            row.classList.add("fade-out");
            setTimeout(() => {
                row.remove();
                showNotification("⚠️ User deleted!");
            }, 500);
        });
    });

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

        newRow.querySelector(".delete-btn").addEventListener("click", function () {
            newRow.classList.add("fade-out");
            setTimeout(() => {
                newRow.remove();
                showNotification("❌ Event removed!");
            }, 500);
        });

        showNotification(`✅ Event "${eventName}" added successfully!`);
        document.getElementById("eventName").value = "";
        document.getElementById("eventDate").value = "";
    });

    document.querySelector(".notifications").addEventListener("click", function () {
        document.getElementById("notificationList").classList.toggle("show");
    });

    document.getElementById("searchEvents").addEventListener("input", function () {
        const searchValue = this.value.toLowerCase();
        let found = false;

        document.querySelectorAll("#eventTable tbody tr").forEach(row => {
            const eventName = row.cells[0].innerText.toLowerCase();
            if (eventName.includes(searchValue)) {
                row.style.display = "";
                row.scrollIntoView({ behavior: "smooth", block: "center" });
                found = true;
            } else {
                row.style.display = "none";
            }
        });

        showNotification(found ? "🔍 Found matching event!" : "❌ No matching event found.");
    });

    document.getElementById("searchUsers").addEventListener("input", function () {
        const searchValue = this.value.toLowerCase();
        let found = false;

        document.querySelectorAll("#userTable tbody tr").forEach(row => {
            const userName = row.cells[0].innerText.toLowerCase();
            if (userName.includes(searchValue)) {
                row.style.display = "";
                row.scrollIntoView({ behavior: "smooth", block: "center" });
                found = true;
            } else {
                row.style.display = "none";
            }
        });

        showNotification(found ? "🔍 Found matching user!" : "❌ No matching user found.");
    });

    document.getElementById("themeToggle").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        this.innerHTML = document.body.classList.contains("dark-mode") 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
});
