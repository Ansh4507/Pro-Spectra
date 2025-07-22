const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Company = require('./models/Company'); // Make sure this path is correct
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// POST Route
app.post('/api/companies', async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    console.error('❌ Error saving company:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET Route (Optional: fetch companies)
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
