
```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eventify - Introduction</title>
    <style>
        /* General Styles */
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background: #f5f1e9;
            color: black;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
        }

        .container {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            width: 60%;
            max-width: 800px;
        }

        h1 {
            color: #d6555b;
            font-size: 32px;
        }

        p {
            font-size: 18px;
            line-height: 1.6;
        }

        .team-section {
            margin-top: 20px;
        }

        .team-member {
            background: #fff8ee;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
        }

        .team-member h3 {
            margin: 5px 0;
            color: #d6555b;
        }

        /* Dark Mode */
        .dark-mode {
            background: black;
            color: white;
        }

        .dark-mode .container {
            background: #1a1a1a;
            color: white;
        }

        .dark-mode .team-member {
            background: #333;
            color: white;
        }

        /* Toggle Button */
        .toggle-btn {
            background: #d6555b;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            margin-top: 20px;
            border-radius: 6px;
            font-size: 16px;
        }

        .toggle-btn:hover {
            background: #b94850;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Welcome to Eventify</h1>
        <p>Eventify is an innovative event management system designed to simplify planning, organizing, and executing events seamlessly.</p>

        <div class="team-section">
            <h2>Meet Our Team</h2>
            
            <div class="team-member">
                <h3>Saksham Deep</h3>
                <p>Manages Attendee Dashboard</p>
            </div>
            <div class="team-member">
                <h3>Sujal</h3>
                <p>Manages Home Page</p>
            </div>
            <div class="team-member">
                <h3>Simon</h3>
                <p>Manages Events Page</p>
            </div>
            <div class="team-member">
                <h3>Sherani</h3>
                <p>Manages Admin Portal</p>
            </div>
            <div class="team-member">
                <h3>Sidhant</h3>
                <p>Managed UI/UX Wireframe Blueprints for Seamless Work</p>
            </div>
        </div>

        <button class="toggle-btn" onclick="toggleDarkMode()">Toggle Dark Mode</button>
    </div>

    <script>
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
        }
    </script>

</body>
</html>
