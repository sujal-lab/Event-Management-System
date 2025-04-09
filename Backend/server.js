const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON from frontend

// ROUTES
const authRoutes = require('./routes/auth'); // ✅ Your auth.js file
app.use('/api/auth', authRoutes); // All auth routes will start with /api/auth

// DEFAULT ROUTE (just for testing)
app.get('/', (req, res) => {
  res.send('👋 Hello from Eventify backend!');
});

// CONNECT TO MONGODB AND START SERVER
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("✅ Backend server running at http://localhost:" + process.env.PORT);
    });
  })
  .catch(err => console.log("❌ MongoDB error:", err));
