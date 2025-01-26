# Portfolio Website

A personal portfolio website with contact form functionality.

## Features
- Responsive design
- Contact form with MongoDB backend
- Admin panel to view messages
- Modern UI/UX

## Technologies Used
- HTML/CSS/JavaScript
- Node.js
- Express.js
- MongoDB
- GitHub Pages (Frontend)
- Render.com (Backend)

## Setup
1. Clone the repository
```bash
git clone https://github.com/Rajkoli145/Portfolio-Website.git
```
2. Install dependencies: `npm install`
3. Set up MongoDB connection
```bash
mongod --dbpath ~/data/db
```
4. Start the server: `npm start`

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=3000
```
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 3000)

## Deployment

### Backend (on Render.com)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Add Environment Variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `PORT`: 3000

### Frontend (on GitHub Pages)
The frontend is automatically deployed to GitHub Pages.
Visit: https://rajkoli145.github.io/Portfolio-Website/

## Live Demo
Frontend: https://rajkoli145.github.io/Portfolio1
Backend: https://portfolio-backend-s2ws.onrender.com
