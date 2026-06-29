# Full-Stack Job Portal Web Application (MERN Stack)

Welcome to the **Job Portal**! This is a complete, beginner-friendly, and production-ready full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS.

## 🌟 Features Available

### Authentication System
- Role-based login (Job Seeker / Recruiter)
- Secure password hashing using `bcryptjs`
- Custom JWT (JSON Web Tokens) based authentication & protected routes

### Job Seeker Features
- Register/Login securely
- Browse all job listings with dynamic search
- View detailed job descriptions
- Upload resume (PDF) and apply to jobs seamlessly
- Dashboard to track applied jobs and their statuses

### Recruiter Features
- Register/Login securely
- Access to a recruiter-specific dashboard
- Post new job opportunities dynamically
- Manage job postings

---

## 📂 Folder Structure

```
job-portal/
│
├── client/                 # React.js Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, JobCard, etc.)
│   │   ├── context/        # React context for global state (AuthContext)
│   │   ├── pages/          # Full page views (Home, Login, Dashboard, etc.)
│   │   ├── utils/          # Helper utilities (Axios API connection)
│   │   ├── App.jsx         # Main router and layout
│   │   └── main.jsx        # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js + Express Backend
│   ├── config/             # Database connection logic
│   ├── controllers/        # Business logic for requests (Auth, Jobs, Applications)
│   ├── middleware/         # Custom Middlewares (JWT verify, Multer upload)
│   ├── models/             # Mongoose schemas (User, Job, Application)
│   ├── routes/             # API routing endpoints
│   ├── uploads/            # Temporarily cached file uploads (Resumes)
│   ├── .env                # Environment variables
│   ├── index.js            # Main backend entry point
│   └── package.json
│
└── README.md               # You are here!
```

---

## 🛠️ FULL SETUP GUIDE (From Scratch for Beginners)

### 1. What to Download
Before starting, make sure you download and install the following on your computer:
1. **Node.js**: Download the LTS (Long Term Support) version from [nodejs.org](https://nodejs.org/). (Version 18+ is recommended).
2. **MongoDB Database**: 
   - Option A Local: Download MongoDB Community Server + MongoDB Compass (GUI) from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
   - Option B Cloud (Atlas): Sign up on [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) to create a free cloud database cluster.
3. **VS Code (Visual Studio Code)**: Download the best code editor from [code.visualstudio.com](https://code.visualstudio.com/).
4. **Git** (Optional but recommended): From [git-scm.com](https://git-scm.com/).

### 2. Installation Steps
1. Install Node.js by running the downloaded installer and clicking Next.
2. Verify node installation: Open a terminal (Command Prompt/PowerShell) and type:
   `node -v`
   `npm -v`
   You should see version numbers printed!
3. If using MongoDB Atlas, create a cluster, click "Connect", choose "Connect your application", and copy the connection string. Replace `<password>` with your database user password.

### 3. Required Dependencies Overview

#### Backend:
- `express` - Handles routing and API servers
- `mongoose` - Helps talk to the MongoDB database easily
- `cors` - Allows frontend to request data from the backend
- `dotenv` - Secures environment variables (.env files)
- `jsonwebtoken` - Secures login sessions with tokens
- `bcryptjs` - Hashes your passwords so they aren't stored as plain text
- `multer` - Handles file uploads (like resumes)

#### Frontend:
- `react`, `react-dom` - Core libraries for UI
- `axios` - Connects frontend to backend APIs
- `react-router-dom` - Handles clicking between pages without reloading
- `tailwindcss`, `@tailwindcss/vite` - For fast, beautiful CSS styling
- `lucide-react` - For modern icons

### 4. Running The Project Locally

Follow these exact steps to start the application.

#### A. Set up Environment Variables (.env)
Navigate to the `server/` directory. There is a `.env` file already created with the following:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/job-portal
JWT_SECRET=mysecretkey12345
```
*(If you are using MongoDB Atlas, replace `mongodb://127.0.0.1:27017/job-portal` with your Atlas connection string from step 2).*

#### B. Start the Backend Server
Open a terminal in the `server` folder and run:
```bash
cd job-portal/server
npm install
node index.js
# Or if you have nodemon installed globally: npm run dev
```
You should see: "Server running on port 5000" and "MongoDB connection SUCCESS".

#### C. Start the Frontend Application
Open a **NEW** separate terminal in the `client` folder and run:
```bash
cd job-portal/client
npm install
npm run dev
```
It will give you a local URL (e.g. `http://localhost:5173/`). Hold `CTRL` (or `CMD` on Mac) and click the link to open the app in your browser!

### 5. Common Errors + Solutions
- **MongoDB connection failed**: Ensure MongoDB is actually running dynamically in the background, or your Atlas firewall allows access from anywhere (`0.0.0.0/0`).
- **Port already in use**: If port 5000 is taken, change the `PORT` number in `.env` to `5001`. (Don't forget to update `baseURL` in `client/src/utils/api.js` to match).
- **CORS issues**: This happens if Frontend URL and Backend whitelist don't match. `cors()` middleware in `server/index.js` currently allows all origins.

---

## 🧪 Testing Guide

1. **Register as Recruiter**: Click Register, choose `Recruiter` in dropdown, enter details, and submit. You will enter the dashboard.
2. **Post a Job**: Enter job details in dashboard fields and click Post Job.
3. **Logout & Register as Job Seeker**: Logout, click Register again smoothly, choose `Job Seeker`.
4. **Apply for your job**: Once registered, go to Home, search/find the job you just posted, click "View details", upload a dummy PDF, and Apply.
5. **View Status**: Go to your Dashboard as Job Seeker, you will automatically view the successful application row!

---

## 🚀 Deployment Steps (Optional)

1. **MongoDB**: You MUST use MongoDB Atlas for deployment.
2. **Backend (Render/Heroku)**: 
   - Push your Github repository.
   - Connect it to Render.com (Web Services).
   - Set start command to `node index.js`.
   - Add Environment Variables in settings.
3. **Frontend (Vercel/Netlify)**:
   - Make sure you update `client/src/utils/api.js` `baseURL` to point to your new deployed backend URL instead of localhost.
   - Connect the app to Vercel. 
   - Build command: `npm run build`.
   - Output directory: `dist`.

---
*Happy Coding! 🎉 Ready for College Submission!*
