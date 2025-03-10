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

