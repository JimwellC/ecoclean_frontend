const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const eventsRoutes = require('./routes/events');
const contactsRoutes = require('./routes/contacts');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/events', eventsRoutes);
app.use('/api/messages', contactsRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(3000, () => console.log('🚀 Server running on port 3000'));
  })
  .catch(err => console.error('❌ MongoDB Connection Error:', err));
