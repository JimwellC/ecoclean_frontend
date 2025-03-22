const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  date: Number,
  title: String,
  desc: String,
  time: String,
});

const eventSchema = new mongoose.Schema({
  month: String,
  item: itemSchema,
});


module.exports = mongoose.model('Event', eventSchema);


