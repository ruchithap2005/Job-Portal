import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Trash, Users, FileText, CheckCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applicants, setApplicants] = useState([]);
    const [viewingJobId, setViewingJobId] = useState(null);

    // Form states for Recruiter
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [skillsRequired, setSkillsRequired] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user.role === 'Job Seeker') {
                    const res = await api.get('/applications/my');
                    setData(res.data);
                } else if (user.role === 'Recruiter') {
                    const res = await api.get('/jobs/recruiter');
                    setData(res.data);
                }
            } catch (error) {
                console.error('Error fetching dashboard data', error);
            }
            setLoading(false);
        };
        fetchData();
    }, [user.role]);

    const handleCreateJob = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/jobs', { title, description, company, location, skillsRequired });
            setData([res.data, ...data]);
            setTitle(''); setDescription(''); setCompany(''); setLocation(''); setSkillsRequired('');
            alert('Job posted successfully!');
        } catch (error) {
            console.error('Error creating job', error);
            alert('Failed to post job');
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;
        try {
            await api.delete(`/jobs/${id}`);
            setData(data.filter(job => job._id !== id));
            if (viewingJobId === id) setViewingJobId(null);
            alert('Job deleted');
        } catch (error) {
            console.error(error);
            alert('Failed to delete job');
        }
    };

    const viewApplicants = async (jobId) => {
        if (viewingJobId === jobId) {
            setViewingJobId(null);
            return;
        }
        try {
            const res = await api.get(`/applications/job/${jobId}`);
            setApplicants(res.data);
            setViewingJobId(jobId);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch applicants');
        }
    };

    const updateApplicationStatus = async (appId, status) => {
        try {
            await api.put(`/applications/${appId}`, { status });
            setApplicants(applicants.map(app => app._id === appId ? { ...app, status } : app));
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="text-center py-10">Loading Dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto my-8 p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard ({user.role})</h1>

            {user.role === 'Job Seeker' && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">My Applications</h2>
                    {data.length === 0 ? <p className="text-gray-500">You haven't applied to any jobs yet.</p> : (
                        <div className="bg-white shadow-sm rounded-xl overflow-hidden border">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="p-4">Job Title</th>
                                        <th className="p-4">Company</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Applied On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(app => (
                                        <tr key={app._id} className="border-b hover:bg-gray-50">
                                            <td className="p-4 font-semibold text-blue-600">
                                                {app.jobId ? <Link to={`/jobs/${app.jobId._id}`}>{app.jobId.title}</Link> : 'Deleted Job'}
                                            </td>
                                            <td className="p-4 text-gray-600">{app.jobId ? app.jobId.company : '-'}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                                                    app.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {user.role === 'Recruiter' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border h-fit">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Post a New Job</h2>
                        <form onSubmit={handleCreateJob} className="flex flex-col gap-4 mt-4">
                            <input required type="text" placeholder="Job Title" className="border p-3 rounded-lg w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <input required type="text" placeholder="Company Name" className="border p-3 rounded-lg w-full" value={company} onChange={(e) => setCompany(e.target.value)} />
                            <input required type="text" placeholder="Location" className="border p-3 rounded-lg w-full" value={location} onChange={(e) => setLocation(e.target.value)} />
                            <input required type="text" placeholder="Skills (comma separated)" className="border p-3 rounded-lg w-full" value={skillsRequired} onChange={(e) => setSkillsRequired(e.target.value)} />
                            <textarea required placeholder="Job Description" rows="4" className="border p-3 rounded-lg w-full" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">Post Job</button>
                        </form>
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">Jobs Posted by You</h2>
                        {data.length === 0 ? <p className="text-gray-500">You haven't posted any jobs.</p> : (
                            <div className="flex flex-col gap-4">
                                {data.map(job => (
                                    <div key={job._id} className="bg-white p-5 rounded-xl shadow-sm border flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
                                                <p className="text-sm text-gray-500 mb-3">{job.location} | {new Date(job.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link to={`/jobs/${job._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Publicly">
                                                    <FileText size={20} />
                                                </Link>
                                                <button onClick={() => handleDeleteJob(job._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete Job">
                                                    <Trash size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => viewApplicants(job._id)} 
                                            className="flex items-center justify-center gap-2 mt-2 w-full bg-gray-50 text-gray-700 py-2 rounded-lg font-semibold border border-gray-200 hover:bg-gray-100 transition"
                                        >
                                            <Users size={18} />
                                            {viewingJobId === job._id ? 'Hide Applicants' : 'View Applicants'}
                                        </button>

                                        {viewingJobId === job._id && (
                                            <div className="mt-4 border-t pt-4">
                                                <h4 className="font-bold text-gray-800 mb-4">Applicants ({applicants.length})</h4>
                                                {applicants.length === 0 ? <p className="text-sm text-gray-500">No applications yet.</p> : (
                                                    <div className="flex flex-col gap-3">
                                                        {applicants.map(app => (
                                                            <div key={app._id} className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                                                                <div>
                                                                    <p className="font-bold text-gray-800">{app.userId?.name}</p>
                                                                    <p className="text-gray-600 mb-1">{app.userId?.email}</p>
                                                                    {app.resume && (
                                                                        <a href={`http://localhost:5000/${app.resume.replace('\\', '/')}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                                            Download Resume
                                                                        </a>
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <span className="font-semibold text-gray-700">Status: {app.status}</span>
                                                                    <button onClick={() => updateApplicationStatus(app._id, 'Accepted')} className="text-green-600 hover:text-green-800" title="Accept"><CheckCircle size={24} /></button>
                                                                    <button onClick={() => updateApplicationStatus(app._id, 'Rejected')} className="text-red-600 hover:text-red-800" title="Reject"><XCircle size={24} /></button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
