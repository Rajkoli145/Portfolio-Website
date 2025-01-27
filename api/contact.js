const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Use mongoose.models to check if the model exists
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// Connect to MongoDB
async function connectDB() {
    if (mongoose.connections[0].readyState) return;
    
    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI is not defined');
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

module.exports = async (req, res) => {
    console.log('Received request:', {
        method: req.method,
        headers: req.headers,
        body: req.body
    });

    // Handle CORS
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
        console.log('Method not allowed:', req.method);
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Log the incoming request body
        console.log('Request body:', req.body);

        // Validate request body
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            console.log('Missing required fields:', { name, email, subject, message });
            return res.status(400).json({ 
                message: 'Missing required fields',
                details: {
                    name: !name ? 'Name is required' : null,
                    email: !email ? 'Email is required' : null,
                    subject: !subject ? 'Subject is required' : null,
                    message: !message ? 'Message is required' : null
                }
            });
        }

        // Connect to database
        await connectDB();

        // Create and save contact
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        await contact.save();
        console.log('Contact saved successfully:', contact);

        // Send success response
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error processing request:', error);
        
        // Send appropriate error response
        if (error.name === 'ValidationError') {
            res.status(400).json({ 
                message: 'Validation error', 
                details: error.errors 
            });
        } else {
            res.status(500).json({ 
                message: 'Error sending message', 
                error: error.message 
            });
        }
    }
};
