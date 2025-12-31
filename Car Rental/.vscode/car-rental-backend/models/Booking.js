const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  pickup: String,
  returnLocation: String,
  country: String,
  ageCheck: String,
  pickupDate: String,
  pickupTime: String,
  returnDate: String,
  returnTime: String,
  rentDuration: String,
  email: String, 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
