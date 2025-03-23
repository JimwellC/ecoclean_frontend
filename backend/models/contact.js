const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  type: { type: String, enum: ['volunteer', 'report'], required: true },
  interest: String,
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: String,
  description: String,
  photo: String,
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);
