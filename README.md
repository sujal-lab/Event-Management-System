```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Eventify - Team & Project</title>
  <style>
    /* Base Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #0e0e0e;
      color: #f4f4f4;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      padding: 30px;
    }

    .container {
      max-width: 900px;
      margin: auto;
      padding: 30px;
      background-color: #1a1a1a;
      border-radius: 20px;
      box-shadow: 0 0 20px rgba(0, 229, 255, 0.15);
    }

    header {
      text-align: center;
      margin-bottom: 40px;
    }

    h1 {
      font-size: 3em;
      background: linear-gradient(90deg, #FF6F61, #00E5FF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .tagline {
      font-size: 1.2em;
      color: #cccccc;
      margin-top: 10px;
      font-style: italic;
    }

    section {
      margin-bottom: 40px;
    }

    h2 {
      font-size: 1.8em;
      color: #00E5FF;
      margin-bottom: 20px;
      border-left: 6px solid #FF6F61;
      padding-left: 10px;
    }

    ul {
      list-style: none;
      padding-left: 0;
    }

    ul li {
      background: #2a2a2a;
      margin-bottom: 12px;
      padding: 15px 20px;
      border-radius: 12px;
      border-left: 5px solid #FF6F61;
      transition: transform 0.2s ease, background 0.3s ease;
    }

    ul li:hover {
      background: #333;
      transform: translateX(5px);
    }

    p {
      margin-bottom: 20px;
      color: #ddd;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🎉 Eventify</h1>
      <p class="tagline">Where Events Meet Innovation</p>
    </header>

    <section class="team">
      <h2>👥 Meet the Team</h2>
      <ul>
        <li><strong>Saksham Deep</strong> – UI/UX Designer & Frontend Developer</li>
        <li><strong>Sujal</strong> – Backend Developer & Data Handler</li>
        <li><strong>Simon</strong> – Project Manager & API Integrator</li>
        <li><strong>Sherani</strong> – Content Strategist & Quality Analyst</li>
        <li><strong>Sidhant</strong> – Full Stack Developer & Tester</li>
      </ul>
    </section>

    <section class="description">
      <h2>📌 Project Description</h2>
      <p><strong>Eventify</strong> is a Single Page Application (SPA) designed to make event booking and management easier and more enjoyable. Key features include:</p>
      <ul>
        <li>🏠 <strong>Home Page</strong> – Engaging introduction with dynamic content</li>
        <li>🔐 <strong>Login Page</strong> – Secure and user-friendly login experience</li>
        <li>📋 <strong>Attendee Dashboard</strong> – Personal dashboard with events, bookings, and profile</li>
        <li>🎟️ <strong>Booking Process Page</strong> – Smooth step-by-step event registration</li>
        <li>👤 <strong>Profile Page</strong> – Manage personal information easily</li>
      </ul>
      <p>All components are loaded dynamically into a single page for a fast, interactive, and modern user experience.</p>
    </section>
  </div>
</body>
</html>
```