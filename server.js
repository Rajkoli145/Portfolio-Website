const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Contact = require('./models/Contact');
require('dotenv').config();

const app = express();

// Basic middleware
app.use(express.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

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
    console.log('Received contact form submission');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    
    try {
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

// Catch-all route to serve admin page
app.get('/admin*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
