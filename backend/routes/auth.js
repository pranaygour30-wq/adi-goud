const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Member = require('../models/Member');

// Admin login (unchanged)
router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ _id: admin._id, username: admin.username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, admin: { username: admin.username } });
});

// Member login (fixed)
router.post('/login', async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Find member in MongoDB
    const member = await Member.findOne({ Email: email, Phone: phone });

    if (!member) {
      return res.status(400).json({ message: 'Invalid credentials. Member not found.' });
    }

    // Generate JWT for member
    const token = jwt.sign(
      { _id: member._id, name: member.Name, email: member.Email, role: 'member' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return token and member info
    res.json({
      token,
      member: {
        _id: member._id,
        name: member.Name,
        email: member.Email,
        phone: member.Phone
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
