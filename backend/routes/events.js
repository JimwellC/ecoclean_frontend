// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/event'); // adjust path as needed

// GET all events
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// POST new event
router.post('/', async (req, res) => {
  const { month, item } = req.body;
  const newEvent = new Event({ month, item });
  await newEvent.save();
  res.status(201).json(newEvent);
});


// Delete event
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Event group deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event group' });
  }
});


module.exports = router; // ✅ IMPORTANT
