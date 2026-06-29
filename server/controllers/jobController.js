const Job = require('../models/Job');

const createJob = async (req, res) => {
    try {
        const { title, description, company, location, skillsRequired } = req.body;
        const job = await Job.create({
            title,
            description,
            company,
            location,
            skillsRequired: skillsRequired ? skillsRequired.split(',').map(s => s.trim()) : [],
            postedBy: req.user.id
        });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            $or: [
                { title: { $regex: req.query.keyword, $options: 'i' } },
                { company: { $regex: req.query.keyword, $options: 'i' } },
                { location: { $regex: req.query.keyword, $options: 'i' } }
            ]
        } : {};

        const jobs = await Job.find({ ...keyword }).populate('postedBy', 'name companyName');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'name companyName email');
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            if (job.postedBy.toString() !== req.user.id) {
                return res.status(401).json({ message: 'Not authorized to update this job' });
            }
            job.title = req.body.title || job.title;
            job.description = req.body.description || job.description;
            job.company = req.body.company || job.company;
            job.location = req.body.location || job.location;
            if (req.body.skillsRequired) {
                job.skillsRequired = req.body.skillsRequired.split(',').map(s => s.trim());
            }

            const updatedJob = await job.save();
            res.json(updatedJob);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            if (job.postedBy.toString() !== req.user.id) {
                return res.status(401).json({ message: 'Not authorized to delete this job' });
            }
            await job.deleteOne();
            res.json({ message: 'Job removed' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRecruiterJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user.id });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob, getRecruiterJobs };
