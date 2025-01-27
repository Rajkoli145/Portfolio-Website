# Portfolio Website

A modern, responsive personal portfolio website showcasing my work and skills, with a functional contact form.

## 🌟 Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean and professional design with smooth animations
- **Interactive Components**: Dynamic navigation and hover effects
- **Contact Form**: Fully functional contact form with backend integration
- **Admin Panel**: Secure admin interface to manage messages
- **Social Media Integration**: Direct links to professional profiles

## 🛠️ Technologies Used
### Frontend
- HTML5 & CSS3
- JavaScript (ES6+)
- Font Awesome 6.5.1 (for icons)
- Google Fonts (Poppins)

### Backend
- Node.js
- Express.js
- MongoDB (for message storage)
- Mongoose (ODM)

### Deployment
- Frontend: GitHub Pages
- Backend: Render.com
- Database: MongoDB Atlas

## 🚀 Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Local Development
1. Clone the repository
```bash
git clone https://github.com/Rajkoli145/Portfolio-Website.git
cd Portfolio-Website
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=3000
```

4. Start MongoDB (if running locally)
```bash
mongod --dbpath ~/data/db
```

5. Start the development server
```bash
npm start
```

## 📝 Project Structure
```
Portfolio-Website/
├── assets/
│   └── images/         # Image assets
├── js/
│   ├── contact.js      # Contact form handling
│   └── script.js       # Main JavaScript file
├── styles/
│   └── style.css      # Main stylesheet
├── admin/
│   └── index.html     # Admin panel
├── api/
│   └── index.js       # Backend API
├── models/
│   └── Contact.js     # MongoDB schema
└── *.html             # Main HTML pages
```

## 🌐 Deployment

### Backend Deployment (Render.com)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure environment variables:
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `PORT`: 3000
4. Set build command: `npm install`
5. Set start command: `node api/index.js`

### Frontend Deployment (GitHub Pages)
The frontend is automatically deployed when changes are pushed to the main branch.

## 🔗 Live Demo
- Frontend: [https://rajkoli145.github.io/Portfolio1](https://rajkoli145.github.io/Portfolio1)
- Backend API: [https://portfolio-backend-s2ws.onrender.com](https://portfolio-backend-s2ws.onrender.com)

## 📞 Contact
- GitHub: [@Rajkoli145](https://github.com/Rajkoli145)
- LinkedIn: [Raj Koli](https://www.linkedin.com/in/raj-koli-626008318/)
- Twitter: [@koli_raj57974](https://x.com/koli_raj57974)

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
