import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import JobCard from '../components/JobCard';
import { Search } from 'lucide-react';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchJobs = async (searchParams = '') => {
        setLoading(true);
        try {
            const res = await api.get(`/jobs${searchParams}`);
            setJobs(res.data);
        } catch (error) {
            console.error('Error fetching jobs', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs(`?keyword=${keyword}`);
    };

    return (
        <div className="my-8">
            <div className="bg-blue-600 text-white p-12 rounded-2xl text-center mb-12 shadow-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Find Your Dream Job Today</h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">Thousands of jobs waiting for you</p>
                
                <form onSubmit={handleSearch} className="flex justify-center max-w-2xl mx-auto">
                    <div className="flex w-full bg-white rounded-full overflow-hidden shadow-md">
                        <input 
                            type="text" 
                            placeholder="Job title, company, or location..." 
                            className="flex-grow p-4 text-gray-800 focus:outline-none"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 flex items-center justify-center transition">
                            <Search size={24} />
                        </button>
                    </div>
                </form>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Job Openings</h2>
            
            {loading ? (
                <div className="text-center py-10">Loading jobs...</div>
            ) : jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map(job => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-sm border">
                    No jobs found matching your criteria.
                </div>
            )}
        </div>
    );
};

export default Home;
