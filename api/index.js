const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Contact model
const Contact = require('../models/Contact');

const app = express();

// Middleware
app.use(cors());  // Allow all origins for now
app.use(express.json());
app.use(express.static('admin'));  // Serve static files from admin directory

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Atlas successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

// Add a test route
app.get('/test', async (req, res) => {
    try {
        await connectDB();
        res.json({ message: 'Backend is working!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve admin dashboard
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/index.html'));
});

// Contact form submission route
app.post('/api/contact', async (req, res) => {
    try {
        await connectDB();
        const contact = new Contact(req.body);
        await contact.save();
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
});

// Get all messages route
app.get('/api/messages', async (req, res) => {
    try {
        await connectDB();
        const messages = await Contact.find().sort({ date: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
});

module.exports = app;
