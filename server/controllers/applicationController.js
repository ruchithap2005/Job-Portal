const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const alreadyApplied = await Application.findOne({ userId: req.user.id, jobId });
        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const application = await Application.create({
            userId: req.user.id,
            jobId,
            resume: req.file ? req.file.path : undefined
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.user.id }).populate('jobId');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJobApplications = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (job) {
            if (job.postedBy.toString() !== req.user.id) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            const applications = await Application.find({ jobId: req.params.jobId }).populate('userId', 'name email skills resume');
            res.json(applications);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findById(req.params.id).populate('jobId');
        
        if (application) {
            if (application.jobId.postedBy.toString() !== req.user.id) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            application.status = status;
            await application.save();
            res.json(application);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { applyForJob, getMyApplications, getJobApplications, updateApplicationStatus };
