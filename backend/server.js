const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const membersRoutes = require('./routes/members');
const eventsRoutes = require('./routes/events');
const galleryRoutes = require('./routes/gallery');
const officebearersRoutes = require('./routes/officebearers');
const trustobRoutes = require('./routes/trustob');

app.use('/api/auth', authRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/officebearers', officebearersRoutes);
app.use('/api/trustob', trustobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
