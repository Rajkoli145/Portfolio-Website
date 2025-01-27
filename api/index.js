const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('../models/Contact');
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept']
}));

// Parse JSON bodies
app.use(express.json());

// Contact form endpoint
app.post('/contact', async (req, res) => {
    console.log('Received contact form submission:', req.body);
    
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
