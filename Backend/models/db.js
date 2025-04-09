// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sujal:bleedingedge@cluster0.tin8qx8.mongodb.net/eventifyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));
