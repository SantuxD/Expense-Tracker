# 💰 Expense Tracker

<p align="center">
  <b>A Modern Full-Stack Finance Management Platform</b><br/>
  Securely track income, expenses, and financial insights with a clean SaaS-style dashboard.
</p>

<p align="center">

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/API-Express-black?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen)

</p>

---

## 🚀 Overview

**Expense Tracker** is a full-stack web application designed to help users manage their personal finances efficiently.

It provides secure authentication, income & expense management, real-time financial insights, and a modern SaaS-style dashboard interface.

This project demonstrates scalable architecture, authentication handling, protected routing, and clean UI implementation.

---

## ✨ Features

### 🔐 Authentication
- JWT-based secure authentication
- User registration & login
- Token validation on refresh
- Protected routes
- Logout with confirmation modal

### 📊 Dashboard Analytics
- Total Balance overview
- Total Income & Total Expense tracking
- Last 60 days financial summary
- Interactive bar chart visualization

### 💵 Income Management
- Add income entries
- Delete income records
- Category-based organization
- Date sorting

### 💸 Expense Management
- Add expense entries
- Delete expense records
- Organized transaction history
- Real-time updates

### 🎨 User Experience
- Modern SaaS-style layout
- Sidebar navigation
- Active route highlighting
- Responsive design
- Toast notifications
- Confirmation modals

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Context API (Global State Management)
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast
- Moment.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- RESTful API Design

---

## 🏗 Project Structure

```
Expense-Tracker/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Local Development Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SantuxD/Expense-Tracker.git
cd Expense-Tracker
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

---

## 🔐 Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token is stored in localStorage
4. `useUserAuth` hook validates token on refresh
5. Protected routes allow access to dashboard
6. Logout clears token and resets user state

---

## 🚀 Deployment

### Frontend
- Vercel
- Netlify

Build command:

```bash
npm run build
```

Deploy the generated `dist/` folder.

### Backend
- Render
- Railway
- Cyclic
- VPS Hosting

---

## 🧠 Engineering Highlights

- Modular folder structure
- Reusable components
- Context-based state management
- Custom authentication hook
- API abstraction using Axios instance
- Protected routing system
- Production-safe logout handling
- Clean separation of concerns
- Scalable REST API architecture

---

## 📈 Future Improvements

- Dark Mode
- Budget Planning Feature
- Recurring Transactions
- CSV / PDF Data Export
- Unit & Integration Testing
- Role-Based Access Control

---

## 👨‍💻 Author

**Santu Mondal**

GitHub: https://github.com/SantuxD

---


