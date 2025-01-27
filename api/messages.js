const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const mongoose = require('mongoose');

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ timestamp: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new message
router.post('/', async (req, res) => {
    const message = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });

    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
