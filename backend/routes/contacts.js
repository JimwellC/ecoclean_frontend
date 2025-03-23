const express = require('express');
const multer = require('multer');
const Contact = require('../models/contact');
const router = express.Router();

// Setup Multer for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

/** ------------------------------
 * POST: Volunteer Form
 * ----------------------------- */
router.post('/volunteer', upload.single('photo'), async (req, res) => {
  try {
    const { interest, name, email, message } = req.body;
    const photo = req.file?.buffer.toString('base64') || '';

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const contact = new Contact({
      type: 'volunteer',
      interest,
      name,
      email,
      message,
      photo,
      status: 'pending'
    });

    await contact.save();
    res.status(201).json({ message: 'Volunteer form submitted.' });

  } catch (err) {
    console.error('❌ Error saving volunteer:', err); // This is key
    res.status(500).json({ message: 'Error saving volunteer.', error: err.message });
  }
});




/** ------------------------------
 * POST: Report Form
 * ----------------------------- */
router.post('/report', upload.single('photo'), async (req, res) => {
  try {
    const { type, name, email, description } = req.body;
    const photo = req.file?.buffer.toString('base64') || '';

    const contact = new Contact({
      type: 'report',
      interest: type,
      name,
      email,
      description,
      photo,
      status: 'pending'
    });

    await contact.save();
    res.status(201).json({ message: 'Report submitted.' });
  } catch (err) {
    console.error('❌ Error saving report:', err);
    res.status(500).json({ message: 'Error saving report.', error: err });
  }
});

/** ------------------------------
 * GET: All Messages (excluding photo)
 * ----------------------------- */
router.get('/', async (req, res) => {
  try {
    const { type, status } = req.query;
    const query = {};

    if (type) query.type = type;
    if (status) query.status = status; // make sure this line exists

    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ message: 'Failed to load messages', error: err });
  }
});


/** ------------------------------
 * GET: Accepted Volunteers
 * ----------------------------- */
router.get('/volunteers', async (req, res) => {
  try {
    const volunteers = await Contact.find(
      { type: 'volunteer', status: 'accepted' },
      { name: 1, email: 1, photo: 1, message: 1 }
    ).sort({ createdAt: -1 });

    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load volunteers', error: err });
  }
});


/** ------------------------------
 * GET: Single Message by ID (with photo)
 * ----------------------------- */
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Message not found' });
    res.json(contact);
  } catch (err) {
    console.error('❌ Error fetching message by ID:', err);
    res.status(500).json({ message: 'Failed to load message', error: err });
  }
});

/** ------------------------------
 * PATCH: Update Message Status (Accept/Reject)
 * ----------------------------- */
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err });
  }
});


module.exports = router;
