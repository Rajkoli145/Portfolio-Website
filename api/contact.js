const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

let Contact;
try {
    Contact = mongoose.model('Contact');
} catch {
    Contact = mongoose.model('Contact', contactSchema);
}

// Connect to MongoDB
async function connectDB() {
    if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST method
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Connect to database
        await connectDB();

        // Log request data
        console.log('Received contact form submission');
        console.log('Headers:', req.headers);
        console.log('Body:', req.body);

        // Create and save contact
        const contact = new Contact(req.body);
        await contact.save();

        // Send success response
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
}
