# 🧭 Highway-Delite an Adventure Experience Booking Platform

> 🚀 **Developed independently by [Karthik](https://github.com/Karthik-25-code)** — demonstrating full-stack design, API integration, and cloud deployment skills.  
> Along with the main **User Booking Platform**, I have also implemented a **complete Admin Panel** — even though it wasn’t part of the original requirement.  
> The Admin Panel allows adding, deleting, and managing experiences and viewing all user bookings — showcasing initiative and full product ownership.

---

## 🌍 Live Deployments

| Platform | Deployed Link |
|-----------|----------------|
| 🌐 **User App (Frontend)** | [https://highway-delite-task-navy.vercel.app/](https://highway-delite-task-navy.vercel.app/)]|
| 🧑‍💼 **Admin Panel** | [https://highway-delite-task-5m1m.vercel.app/admin](https://highway-delite-task-5m1m.vercel.app/admin) |
| ⚙️ **Backend (API)** | [https://highway-delite-task-1.onrender.com/](https://highway-delite-task-1.onrender.com/) |

> ⚠️ **Note:** The backend is deployed on **Render (free tier)** — it may take **30–60 seconds** to start if inactive.  
> 🔄 Click the backend link above once to “wake it up,” then reload the frontend.

---

## 💡 Project Overview

This is a **Full Stack Adventure Booking Platform** where users can explore, book, and manage thrilling adventure experiences.  
The **Admin Panel** provides functionality to add or delete experiences and view all bookings in real time.

---

## 🧩 Features

### 👨‍💻 User Side
- 🏞️ Browse and search adventure experiences  
- 🔍 View details with available dates and time slots  
- 📅 Select preferred date & time dynamically  
- 💳 Checkout with calculated total (taxes + promo)  
- 🧾 Booking confirmation page with unique reference ID  
- 💻 Fully responsive design across all devices  

### 🧑‍💼 Admin Side *(Added Beyond Requirements)*
- ➕ Add new experiences (with image upload via **Cloudinary**)  
- ❌ Delete existing experiences instantly  
- 📋 View all bookings neatly  
- 🎨 Built with TailwindCSS for clean, responsive UI  

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend (User)** | React + Vite + TailwindCSS + Axios + React Router |
| **Admin Panel** | React + Vite + TailwindCSS + Axios |
| **Backend** | Node.js + Express.js + MongoDB + Mongoose + Multer + Cloudinary |
| **Database** | MongoDB Atlas (Cloud) |
| **Styling** | TailwindCSS v3.4+ |

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Karthik-25-code/Highway-delite.git
cd Highway-delite
2️⃣ Setup Backend
bash
Copy code
cd backend
npm install
Create a .env file inside backend:

ini
Copy code
MONGO_URI=mongodb://localhost:27017/adventure
PORT=3000

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Run the backend:

bash
Copy code
npm start
✅ Output:

arduino
Copy code
MongoDB connected
Server running on port 3000
3️⃣ Setup Frontend (User App)
bash
Copy code
cd frontend
npm install
Create .env:

ini
Copy code
VITE_BACKEND_URL=http://localhost:3000
Run the app:

bash
Copy code
npm run dev
Frontend will run at → http://localhost:5173

4️⃣ Setup Admin Panel (Separate Frontend)
bash
Copy code
cd admin
npm install
Create .env:

ini
Copy code
VITE_BACKEND_URL=http://localhost:3000
Run the admin panel:

bash
Copy code
npm run dev -- --port=5174
Admin will run at → http://localhost:5174

🧠 Admin Panel Overview
Functionality	Description
➕ Add Experience	Add new adventure experiences with name, image, cost, dates, and time slots
❌ Delete Experience	Instantly remove outdated or incorrect experiences
📋 View Bookings	Display all user bookings neatly in a dashboard

💡 Example Date Format for Admin
When adding a new experience, use this format for the dates field:

css
Copy code
20-1-25:09:00am,10:00am; 21-1-25:11:00am,12:00pm
⚠️ Deployment Notes
Frontend (User) → Deployed on Vercel

Admin Panel → Deployed on Vercel

Backend (API) → Deployed on Render

Database → Hosted on MongoDB Atlas

🧩 Update .env files for frontend and admin with:

ini
Copy code
VITE_BACKEND_URL=https://highway-delite-task-1.onrender.com
📁 Folder Structure
arduino
Copy code
📦 Highway-delite
├── backend
│   ├── models/
│   ├── controllers/
│   ├── routers/
│   ├── middlewares/
│   ├── uploads/
│   ├── db.js
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src/
│   ├── public/
│   ├── .env
│   └── vite.config.js
│
└── admin
    ├── src/
    ├── .env
    └── vite.config.js
🧾 License
This project is open-source and free to use for learning or demonstration purposes.
Feel free to fork and customize it for your own portfolio.

⭐ Highlights
✅ Implemented both User & Admin Panels
✅ Integrated Cloudinary for image uploads
✅ Fully Responsive UI with TailwindCSS
✅ Deployed complete stack → Vercel + Render + MongoDB Atlas
✅ Added Admin Management System beyond original scope
✅ Demonstrates end-to-end full-stack proficiency

🧑‍💻 Built with passion by Karthik
📬 GitHub: Karthik-25-code
