const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and serving static files
app.use(express.json());
app.use(express.static(__dirname));

// Debug middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

// Use local MongoDB instead of Atlas
const MONGODB_URI = 'mongodb://127.0.0.1:27017/portfolio';

// MongoDB Connection with retry logic
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to MongoDB');

        // Handle connection errors
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
            setTimeout(connectDB, 5000);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
            setTimeout(connectDB, 5000);
        });

    } catch (err) {
        console.error('MongoDB connection error:', err);
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { 
    timestamps: true,
    collection: 'contacts'
});

// Initialize Contact model
let Contact;
try {
    Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
} catch (error) {
    Contact = mongoose.model('Contact', contactSchema);
}

// Connect to MongoDB before starting server
connectDB().then(() => {
    // Routes
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    // Get all messages endpoint
    app.get('/api/messages', async (req, res) => {
        try {
            // Check MongoDB connection
            if (mongoose.connection.readyState !== 1) {
                throw new Error('Database connection is not ready');
            }

            const messages = await Contact.find({})
                .sort({ createdAt: -1 })
                .select('-__v');

            res.json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch messages',
                error: error.message
            });
        }
    });

    // Contact form endpoint
    app.post('/api/contact', async (req, res) => {
        console.log('Received contact form submission:', req.body);
        
        try {
            // Check MongoDB connection
            if (mongoose.connection.readyState !== 1) {
                throw new Error('Database connection is not ready');
            }

            const { name, email, subject, message } = req.body;
            
            // Validate required fields
            if (!name || !email || !subject || !message) {
                console.log('Missing required fields:', { name, email, subject, message });
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required'
                });
            }

            // Create new contact document
            const contact = new Contact({
                name,
                email,
                subject,
                message
            });

            // Save to database
            console.log('Attempting to save contact:', contact);
            await contact.save();
            console.log('Successfully saved contact');
            
            res.status(200).json({
                success: true,
                message: 'Message sent successfully!'
            });
        } catch (error) {
            console.error('Error in /api/contact:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to send message. Please try again.',
                error: error.message
            });
        }
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error('Unhandled error:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    });

    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
