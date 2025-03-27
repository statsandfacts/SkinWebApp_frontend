"use client";
import { setSingleJobDtls } from "@/redux/slices/digitalPrescription/career.slice";
import { AppDispatch } from "@/redux/store";
import { CareerJobType } from "@/types/digitalPrescription/career.types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface JobItemProps {
  job: CareerJobType;
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <div
      className="p-4 border-t-4 border-t-sky-800 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:scale-100 transition-transform duration-300 animate-fadeInUp"
      onClick={() => {
        dispatch(setSingleJobDtls(job));
        router.push(`/career/${job.job_id}`);
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-center items-center gap-2">
          <p className="text-gray-700">{job.location}</p>
          <div className="h-4 border-l-2 border-sky-800"></div>
          <p className="text-gray-700">{job.employment_type}</p>
        </div>
        <p className="text-gray-700 font-medium">
          {new Date(job.posted_date).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-between items-center mb-2 mt-2">
        <h2 className="text-lg font-semibold text-sky-900">{job.job_title}</h2>
      </div>
      <p className="text-slate-700">
        <strong>Department:</strong> {job.department}
      </p>
      <p className="text-slate-700">
        <strong>Experience:</strong> {job.experience_range}
      </p>
      <p className="text-slate-700">
        <strong>Salary:</strong> {job.salary_range} LPA
      </p>
    </div>
  );
};

export default JobItem;
