import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Building, Briefcase, Calendar } from 'lucide-react';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [message, setMessage] = useState('');
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/jobs/${id}`);
                setJob(res.data);
            } catch (error) {
                console.error(error);
                setMessage('Failed to load job details');
            }
            setLoading(false);
        };
        fetchJob();
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('jobId', id);
        if (resume) {
            formData.append('resume', resume);
        }

        setApplying(true);
        try {
            await api.post('/applications', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('Application submitted successfully!');
            setResume(null);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to apply');
        }
        setApplying(false);
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!job) return <div className="text-center py-10 text-red-500">{message}</div>;

    return (
        <div className="max-w-4xl mx-auto my-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>
            
            <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
                <div className="flex items-center gap-2">
                    <Building className="text-blue-500" />
                    <span className="font-semibold">{job.company}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="text-red-500" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="text-green-500" />
                    <span>Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl">
                    {job.description}
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Skills Required</h2>
                <div className="flex flex-wrap gap-2">
                    {job.skillsRequired?.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {user?.role === 'Job Seeker' && (
                <div className="mt-10 bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Apply for this Position</h2>
                    {message && <p className={`mb-4 font-semibold ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
                    
                    <form onSubmit={handleApply} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Upload Resume (PDF only)</label>
                            <input 
                                type="file" 
                                accept=".pdf"
                                onChange={(e) => setResume(e.target.files[0])}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={applying}
                            className={`bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition ${applying ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {applying ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default JobDetails;
