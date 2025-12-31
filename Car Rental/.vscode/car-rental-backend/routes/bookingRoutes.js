const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// POST /api/bookings
router.post("/", async (req, res) => {
  try {
    console.log("Booking data received:", req.body); // Log the request body
    
    const booking = new Booking(req.body);
    await booking.save();
    
    console.log("Booking saved successfully!");
    res.status(201).json({ message: "Booking stored!" });
  } catch (err) {
    console.error("Booking error:", err); // Log the actual error message
    res.status(500).json({ error: "Failed to store booking." });
  }
});

module.exports = router;
