const express = require('express');
const router = express.Router();
const { createJob, getJobs, getJobById, updateJob, deleteJob, getRecruiterJobs } = require('../controllers/jobController');
const { protect, recruiterOnly } = require('../middleware/authMiddleware');

router.route('/').get(getJobs).post(protect, recruiterOnly, createJob);
router.route('/recruiter').get(protect, recruiterOnly, getRecruiterJobs);
router.route('/:id')
    .get(getJobById)
    .put(protect, recruiterOnly, updateJob)
    .delete(protect, recruiterOnly, deleteJob);

module.exports = router;
