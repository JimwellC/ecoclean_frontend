// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
}, { collection: 'admin' }); // 👈 explicitly set collection name here

module.exports = mongoose.model('Admin', adminSchema);
