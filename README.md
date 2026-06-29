 Full-Stack Job Portal Web Application (MERN Stack)

A full-stack Job Portal Web Application developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The platform enables recruiters to post job opportunities and job seekers to search, apply, and manage their applications through a secure and user-friendly interface.

 Project Overview

The Job Portal is designed to simplify the recruitment process by providing separate modules for Job Seekers and Recruiters. The application features secure authentication, role-based access, job management, and online job applications with resume upload support.

This project was developed as a collaborative academic project and demonstrates practical implementation of full-stack web development concepts.

 Features

 Job Seeker

* User Registration & Login
* Secure JWT Authentication
* Browse Available Jobs
* Search Jobs
* View Job Details
* Upload Resume (PDF)
* Apply for Jobs
* Dashboard to View Applied Jobs

 Recruiter

* Recruiter Registration & Login
* Recruiter Dashboard
* Post New Job Listings
* Manage Posted Jobs
* View Applications

 Security

* JWT Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Role-Based Authorization
* Secure File Upload using Multer

 Tech Stack

 Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios

 Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* bcryptjs
* dotenv

 Project Structure

```text
Job-Portal/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── index.js
│   └── package.json
│
└── README.md

 Installation

 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Job-Portal.git
```



 2. Install Client Dependencies

```bash
cd client
npm install
```

---

 3. Install Server Dependencies

```bash
cd ../server
npm install
```

 4. Configure Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```


5. Start Backend

```bash
cd server
npm run dev
```

or

```bash
node index.js
```

6. Start Frontend

```bash
cd client
npm run dev
```



 Future Enhancements

* Email Notifications
* Admin Dashboard
* Company Profiles
* Saved Jobs
* Interview Scheduling
* Resume Builder
* Job Recommendations
* Dark Mode
* AI-based Resume Screening



 Contributors

 Ruchitha P

* Frontend Development
* Backend Development
* Database Integration
* Authentication
* Project Documentation
* Testing

 Madhu Sudhan G.A

* Frontend Development
* Backend Development
* Database Design
* Feature Development
* Testing & Debugging

 License

This project was developed for educational and academic purposes.


 Acknowledgement

Developed as a collaborative academic project using the MERN Stack to demonstrate practical implementation of modern full-stack web application development.

 Developed By

Ruchitha P and
Madhu Sudhan G.A
