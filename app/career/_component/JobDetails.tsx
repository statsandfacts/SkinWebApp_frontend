"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

// Define the expected job structure
type JobType = {
  id: number;
  title: string;
  location: string;
  experienceRange: string;
  status: string;
  employeeType: string;
  department: string;
  description: string;
  postedDate: string;
};

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL
  const [job, setJob] = useState<null | JobType>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(``); // Add API endpoint here
        const data: JobType = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="container mx-auto p-6">
      <button
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded"
        onClick={() => router.back()}
      >
        ← Back to Jobs
      </button>

      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Experience:</strong> {job.experienceRange}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <p><strong>Job Type:</strong> {job.employeeType}</p>
      <p><strong>Department:</strong> {job.department}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Posted Date:</strong> {job.postedDate}</p>

      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
