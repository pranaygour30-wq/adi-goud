const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// GET all members (with optional blood group filter)
router.get('/', async (req, res) => {
  try {
    const { bloodGroup } = req.query;
    const filter = bloodGroup ? { 'Blood Group': bloodGroup } : {};
    const members = await Member.find(filter);
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET members with upcoming birthdays
router.get('/birthdays', async (req, res) => {
  try {
    const members = await Member.find({ 'Date of birth': { $exists: true, $ne: '' } });
    
    // Filter and sort members by upcoming birthdays
    const today = new Date();
    const upcomingBirthdays = members
      .filter(member => member['Date of birth'])
      .map(member => {
        const dob = new Date(member['Date of birth']);
        const thisYearBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
        
        // If birthday has passed this year, look at next year's birthday
        if (thisYearBirthday < today) {
          thisYearBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        const daysUntilBirthday = Math.ceil((thisYearBirthday - today) / (1000 * 60 * 60 * 24));
        
        return {
          ...member.toObject(),
          daysUntilBirthday
        };
      })
      .filter(member => member.daysUntilBirthday <= 30) // Show birthdays in next 30 days
      .sort((a, b) => a.daysUntilBirthday - b.daysUntilBirthday);
    
    res.json(upcomingBirthdays);
  } catch (error) {
    console.error('Error fetching birthdays:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET members with upcoming anniversaries
router.get('/anniversaries', async (req, res) => {
  try {
    const members = await Member.find({ 'Anniversary date': { $exists: true, $ne: '' } });
    
    // Filter and sort members by upcoming anniversaries
    const today = new Date();
    const upcomingAnniversaries = members
      .filter(member => member['Anniversary date'])
      .map(member => {
        const anniversary = new Date(member['Anniversary date']);
        const thisYearAnniversary = new Date(today.getFullYear(), anniversary.getMonth(), anniversary.getDate());
        
        // If anniversary has passed this year, look at next year's anniversary
        if (thisYearAnniversary < today) {
          thisYearAnniversary.setFullYear(today.getFullYear() + 1);
        }
        
        const daysUntilAnniversary = Math.ceil((thisYearAnniversary - today) / (1000 * 60 * 60 * 24));
        
        return {
          ...member.toObject(),
          daysUntilAnniversary
        };
      })
      .filter(member => member.daysUntilAnniversary <= 30) // Show anniversaries in next 30 days
      .sort((a, b) => a.daysUntilAnniversary - b.daysUntilAnniversary);
    
    res.json(upcomingAnniversaries);
  } catch (error) {
    console.error('Error fetching anniversaries:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
