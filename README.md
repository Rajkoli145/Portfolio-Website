# Portfolio Website

A personal portfolio website with a contact form feature that stores messages in MongoDB.

## Features

- Responsive design
- Contact form with MongoDB integration
- Server-side form validation
- Error handling and user feedback

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Rajkoli145/Portfolio-Website.git
cd Portfolio-Website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:3000`.

## Project Structure

```
Portfolio-Website/
├── assets/           # Static assets (images, etc.)
├── api/             # API routes
├── models/          # Database models
├── public/          # Public static files
├── *.html          # HTML pages
├── style.css       # Main stylesheet
├── script.js       # Client-side JavaScript
├── server.js       # Express server
├── package.json    # Project dependencies
└── README.md       # Project documentation
```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 3000)

## Development

Run the development server with auto-reload:
```bash
npm run dev
```

## Contact Form

The contact form saves messages to MongoDB with the following fields:
- Name
- Email
- Subject
- Message
- Timestamp

## License

MIT License - feel free to use this code for your own portfolio!

## Author

Raj Koli
