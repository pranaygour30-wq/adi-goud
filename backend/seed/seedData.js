const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

async function seedAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin@adi-goud.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists. Skipping seeding.');
      process.exit(0);
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({ username: 'admin@adi-goud.com', password: hashedPassword });

    console.log('🎉 Admin seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();
