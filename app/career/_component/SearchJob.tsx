"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SearchJob = () => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const response = await fetch("ghdbfrhbbhrfrfb"); // Add your API endpoint here
        // const data = await response.json();
        // setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Current Job Openings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job: any) => (
          <div
            key={job.id}
            className="p-4 border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
            onClick={() => router.push(`/job/${job.id}`)} // Navigates to job details page
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Experience:</strong> {job.experienceRange}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Job Type:</strong> {job.employeeType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchJob;
