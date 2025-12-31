// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Debug info
console.log('📁 Current directory:', __dirname);
console.log('📄 Files here:', fs.readdirSync(__dirname));
console.log('🔑 Your MongoDB URL:', process.env.MONGODB_URL);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const carRoutes = require('./routes/carRoutes');
app.use('/api/cars', carRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);

//  Add this: Login/Signup Route
const authRoute = require('./routes/authRoute');
app.use('/api/auth', authRoute);

// Database connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('✅ MongoDB connected successfully!'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
