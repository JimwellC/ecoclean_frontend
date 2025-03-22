const express = require('express');
const multer = require('multer');
const Contact = require('../models/contact');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/** ------------------------------
 * POST: Volunteer Form
 * ----------------------------- */
router.post('/volunteer', upload.single('photo'), async (req, res) => {
  try {
    const { interest, name, message } = req.body;
    const photo = req.file?.buffer.toString('base64') || '';

    const contact = new Contact({
      type: 'volunteer',
      interest,
      name,
      message,
      photo
    });

    await contact.save();
    res.status(201).json({ message: 'Volunteer form submitted.' });
  } catch (err) {
    console.error('❌ Error saving volunteer:', err);
    res.status(500).json({ message: 'Error saving volunteer.', error: err });
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
      photo
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
    const contacts = await Contact.find({}, { photo: 0 }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ message: 'Failed to load messages', error: err });
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

module.exports = router;
