const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Changed default port to 5000
const EVENTS_FILE = path.join(__dirname, "data", "events.json");

// Ensure data directory exists
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Configure CORS with more options for debugging
app.use(cors({
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing request body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Register auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Database connection with improved options
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Event routes
app.get("/api/events", (req, res) => {
  try {
    const events = loadEvents();
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to load events" });
  }
});

app.post("/api/events", (req, res) => {
  try {
    const { title, date, time, location, image } = req.body;
    
    if (!title || !date || !time || !location || !image) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const events = loadEvents();
    const newEvent = { 
      id: Date.now().toString(),
      title, 
      date, 
      time, 
      location, 
      image,
      createdAt: new Date().toISOString()
    };
    
    events.push(newEvent);
    saveEvents(events);
    res.status(201).json({ message: "Event added successfully." });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// Helper functions
const loadEvents = () => {
  try {
    if (!fs.existsSync(EVENTS_FILE)) {
      // Create empty events file if it doesn't exist
      fs.writeFileSync(EVENTS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(EVENTS_FILE);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading events:", err);
    return [];
  }
};

const saveEvents = (events) => {
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
  } catch (err) {
    console.error("Error saving events:", err);
    throw err;
  }
};

// Handle root route for testing API
app.get('/', (req, res) => {
  res.json({ message: "Event Management System API is running" });
});

// Catch OPTIONS preflight requests
app.options('*', cors());

// Ensure all auth routes support GET for debugging during development
// Remove this in production!
app.get('/api/auth/:route', (req, res) => {
  res.status(405).json({ 
    error: 'Method not allowed',
    message: `The route /api/auth/${req.params.route} only supports POST method, not GET` 
  });
});

// Catch all undefined routes - IMPORTANT: Always return JSON, never HTML
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `The requested URL ${req.url} was not found on this server`
  });
});

// Global error handler - Always return JSON responses
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({ 
    error: 'Server error',
    message: 'Something went wrong on the server'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
