const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Member = require('../models/Member');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const testMembers = [
  {
    Name: 'Rajesh Kumar',
    Email: 'rajesh@example.com',
    Phone: '9876543210',
    'Blood Group': 'O+',
    DOB: '1980-05-15',
    'Anniversary Date': '2005-11-20',
    Address: '123, MG Road, Jubilee Hills, Hyderabad'
  },
  {
    Name: 'Priya Sharma',
    Email: 'priya@example.com',
    Phone: '9876543211',
    'Blood Group': 'A+',
    DOB: '1985-07-22',
    Address: '456, Banjara Hills, Hyderabad'
  },
  {
    Name: 'Amit Patel',
    Email: 'amit@example.com',
    Phone: '9876543212',
    'Blood Group': 'B+',
    DOB: '1978-03-10',
    'Anniversary Date': '2008-12-15',
    Address: '789, Gachibowli, Hyderabad'
  }
];

async function seedMembers() {
  try {
    // Force recreate members
    await Member.deleteMany({});
    console.log('🗑️ Deleted existing members.');

    // Create test members
    await Member.insertMany(testMembers);

    console.log('🎉 Test members seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding members:', err);
    process.exit(1);
  }
}

seedMembers();