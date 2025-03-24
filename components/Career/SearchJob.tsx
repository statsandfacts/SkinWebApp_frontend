"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchJob = () => {
  const router = useRouter();

  // Mock Data for Jobs
  const [jobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      location: "Bhubaneswar",
      experienceRange: "2-4 years",
      status: "Open",
      employeeType: "Full-time",
    },
    {
      id: 2,
      title: "Product Manager",
      location: "Bangalore",
      experienceRange: "5-7 years",
      status: "Open",
      employeeType: "Full-time",
    },
    {
      id: 3,
      title: "UX Designer",
      location: "Mumbai",
      experienceRange: "3-5 years",
      status: "Closed",
      employeeType: "Contract",
    },
    {
      id: 4,
      title: "Data Analyst",
      location: "Hyderabad",
      experienceRange: "1-3 years",
      status: "Open",
      employeeType: "Part-time",
    },
    {
        id: 5,
        title: "Python Developer",
        location: "Pune",
        experienceRange: "1-2 years",
        status: "Open",
        employeeType: "Part-time",
      },
      {
        id: 6,
        title: "Java Developer",
        location: "Bhubaneswar",
        experienceRange: "0-1 years",
        status: "Open",
        employeeType: "Full-time",
      },
  ]);

  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Current Job Openings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 border rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            onClick={() => router.push(`/job/${job.id}`)}
          >
            {/* Job Title  */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              
            </div>
            
            {/* Job Details */}
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Experience:</strong> {job.experienceRange}</p>
            <p><strong>Job Type:</strong> {job.employeeType}</p>
            <p><strong>Status:</strong> {job.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchJob;
