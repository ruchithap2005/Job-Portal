const express = require('express');
const router = express.Router();
const { applyForJob, getMyApplications, getJobApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, recruiterOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').post(protect, upload.single('resume'), applyForJob); // apply
router.route('/my').get(protect, getMyApplications); // job seeker - my apps

router.route('/job/:jobId').get(protect, recruiterOnly, getJobApplications); // recruiter
router.route('/:id').put(protect, recruiterOnly, updateApplicationStatus); // recruiter

module.exports = router;
