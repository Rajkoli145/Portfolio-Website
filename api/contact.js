const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Initialize Contact model
let Contact;
try {
    Contact = mongoose.model('Contact');
} catch {
    Contact = mongoose.model('Contact', contactSchema);
}

// Connect to MongoDB
async function connectDB() {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('MONGODB_URI environment variable is not set');
            throw new Error('Database connection string is not configured');
        }

        if (mongoose.connections[0].readyState) {
            console.log('Using existing MongoDB connection');
            return;
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

module.exports = async (req, res) => {
    console.log('Received request:', {
        method: req.method,
        path: req.url,
        headers: req.headers,
        body: req.body
    });

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        console.log('Handling OPTIONS request');
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        console.log('Invalid method:', req.method);
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }

    try {
        // Connect to MongoDB
        await connectDB();

        // Validate request body
        const { name, email, subject, message } = req.body;
        
        console.log('Received form data:', { name, email, subject, message });

        if (!name || !email || !subject || !message) {
            const missingFields = [];
            if (!name) missingFields.push('name');
            if (!email) missingFields.push('email');
            if (!subject) missingFields.push('subject');
            if (!message) missingFields.push('message');

            console.log('Missing required fields:', missingFields);
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                details: missingFields
            });
        }

        // Create contact entry
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        // Save to database
        console.log('Saving contact to database...');
        await contact.save();
        console.log('Successfully saved contact:', contact._id);

        // Send success response
        return res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send message',
            error: error.message
        });
    }
};
