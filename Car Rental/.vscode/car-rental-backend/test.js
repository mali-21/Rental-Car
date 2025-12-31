// test-mongo-connection.js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    process.exit(0); // Exit after success
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1); // Exit with error code
  });
