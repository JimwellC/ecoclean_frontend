const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  type: { type: String, enum: ['volunteer', 'report'], required: true },
  interest: String,         // for volunteer
  name: { type: String, required: true },
  email: String,            // for report
  message: String,          // for volunteer
  description: String,      // for report
  photo: String,            // base64 or file path
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);
