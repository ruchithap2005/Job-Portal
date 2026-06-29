const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Job Seeker', 'Recruiter'], default: 'Job Seeker' },
    
    // Profile for Job Seekers
    skills: { type: [String], default: [] },
    resume: { type: String }, // path to resume file
    
    // Profile for Recruiters
    companyName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
