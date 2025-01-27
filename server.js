const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/Contact');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['https://rajkoli145.github.io', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Contact Form Route
app.post('/api/contact', async (req, res) => {
    try {
        console.log('Received contact form submission:', req.body);
        const contact = new Contact(req.body);
        await contact.save();
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
});

// Get all messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
});

// Test Route
app.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
