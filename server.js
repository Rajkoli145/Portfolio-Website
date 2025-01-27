const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        await contact.save();
        
        res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again.'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
