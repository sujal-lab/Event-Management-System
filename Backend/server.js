// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

dotenv.config();

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
