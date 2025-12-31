const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

//  GET all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  POST add a new car (for testing/admin use)
router.post("/", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET filtered cars (based on search inputs)
router.get("/search", async (req, res) => {
  try {
     console.log('🔍 Search query:', req.query);
    const {
      pickupLocation,
      returnLocation,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
    } = req.query;

    const query = {};

    if (pickupLocation) query.pickupLocation = pickupLocation;
    if (returnLocation) query.returnLocation = returnLocation;
    if (pickupDate) query.availableDate = { $lte: new Date(pickupDate) };
    if (returnDate) query.returnDate = { $gte: new Date(returnDate) };

    const filteredCars = await Car.find(query);
    console.log('🔎 Matching cars count:', filteredCars.length);
    res.json(filteredCars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
