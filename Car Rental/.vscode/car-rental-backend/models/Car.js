// models/carModel.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  brand: String,
  rentprice: Number,
  pickupLocation: String,
  returnLocation: String,
  availableDate: Date,
  returnDate: Date,
  image: String,
});

module.exports = mongoose.model("Car", carSchema);
