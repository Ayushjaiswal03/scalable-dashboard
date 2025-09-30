# Scalable Dashboard 🚀

A full-stack user dashboard built with Express, MongoDB Atlas, Redis, and React (Vite). Designed for scalability, performance, and clean architecture.

## 🔧 Backend Features
- RESTful API with pagination, search, and status filters
- Redis caching for optimized performance
- MongoDB Atlas with indexed queries
- Seeder script for 10,000+ users
- Environment-based config (`.env.development`, `.env.production`)

## 🎨 Frontend (In Progress)
- Vite + React setup ready
- Virtualized grid with `react-window`
- Debounced search and status filters
- Axios-powered `UserService` class

## 📁 Folder Structure

backend/ ├── controllers/ ├── models/ ├── routes/ ├── utils/ ├── app.js ├── server.js

frontend/ ├── src/ │ ├── components/ │ ├── pages/ │ ├── services/ │ ├── utils/ │ ├── App.jsx │ └── main.jsx


## 🚀 Getting Started

```bash
# Backend
cd backend
npm install
NODE_ENV=development nodemon server.js

# Frontend
cd frontend
npm install
npm run dev


