// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // Parse JSON from frontend

// // ROUTES
// const authRoutes = require('./routes/auth'); // ✅ Your auth.js file
// app.use('/api/auth', authRoutes); // All auth routes will start with /api/auth

// const eventRoutes = require('./routes/event'); // ✅ Event route
// app.use('/api/events', require('./routes/event'));


// // DEFAULT ROUTE (just for testing)
// app.get('/', (req, res) => {
//   res.send('👋 Hello from Eventify backend!');
// });

// // CONNECT TO MONGODB AND START SERVER
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log("✅ Backend server running at http://localhost:" + process.env.PORT);
//     });
//   })
//   .catch(err => console.log("❌ MongoDB error:", err));

  
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;
const EVENTS_FILE = path.join(__dirname, "data", "events.json");

app.use(cors());
app.use(express.json({ limit: "10mb" })); // support base64 image
app.use(express.static(path.join(__dirname, "../frontend"))); // serve frontend

// Load events from JSON
const loadEvents = () => {
    if (!fs.existsSync(EVENTS_FILE)) return [];
    const data = fs.readFileSync(EVENTS_FILE);
    return JSON.parse(data);
};

// Save events to JSON
const saveEvents = (events) => {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
};

// 🟢 GET /api/events – fetch events
app.get("/api/events", (req, res) => {
    const events = loadEvents();
    res.json(events);
});

// 🔴 POST /api/events – add a new event
app.post("/api/events", (req, res) => {
    const { title, date, time, location, image } = req.body;
    if (!title || !date || !time || !location || !image) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const events = loadEvents();
    const newEvent = { title, date, time, location, image };
    events.push(newEvent);
    saveEvents(events);

    res.status(201).json({ message: "Event added successfully." });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
