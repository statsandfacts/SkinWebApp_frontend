"use client";
import { fetchAllJobs } from "@/redux/slices/digitalPrescription/career.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { CareerJobType } from "@/types/digitalPrescription/career.types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobItem from "./JobItem";

const SearchJob = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, data, errorMessage } = useSelector(
    (state: RootState) => state.career
  );

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Current Job Openings
      </h1>
      {loading ? (
        <p className="text-center">Loading jobs...</p>
      ) : errorMessage ? (
        <p className="text-center text-red-500">{errorMessage}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {data.map((job: CareerJobType) => (
            <JobItem key={job.job_id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchJob;
