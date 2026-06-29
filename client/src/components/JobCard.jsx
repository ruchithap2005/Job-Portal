import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, Briefcase } from 'lucide-react';

const JobCard = ({ job }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
            
            <div className="flex flex-col gap-2 mb-4 text-gray-600">
                <div className="flex items-center gap-2">
                    <Building size={18} className="text-blue-500" />
                    <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-red-500" />
                    <span>{job.location}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {job.skillsRequired?.map((skill, index) => (
                    <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                        {skill}
                    </span>
                ))}
            </div>

            <Link 
                to={`/jobs/${job._id}`}
                className="block w-full text-center bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
                View Details
            </Link>
        </div>
    );
};

export default JobCard;
