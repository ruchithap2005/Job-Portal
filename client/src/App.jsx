import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobDetails from './pages/JobDetails';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col font-sans">
          <Navbar />
          <main className="flex-grow bg-gray-50 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          
          <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
            <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-2">Built with MERN Stack & Tailwind CSS</p>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
