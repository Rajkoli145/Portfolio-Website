const mongoose = require('mongoose');

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
            throw new Error('MONGODB_URI is missing');
        }
        
        if (mongoose.connections[0].readyState) {
            return;
        }

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

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Connect to MongoDB first
        await connectDB();

        // Validate request body
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create and save contact
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        await contact.save();
        console.log('Message saved:', { name, email, subject });
        
        return res.status(200).json({ 
            success: true,
            message: 'Message sent successfully!' 
        });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Failed to send message. Please try again.' 
        });
    }
};
