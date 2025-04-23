"use client";
import { fetchAllJobs } from "@/redux/slices/digitalPrescription/career.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { CareerJobType } from "@/types/digitalPrescription/career.types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobItem from "./JobItem";
import Loader from "../Loader";

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
        <Loader />
      ) : errorMessage ? (
        <p className="text-center text-red-500">{errorMessage}</p>
      ) : data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {data.map((job: CareerJobType) => (
            <JobItem key={job.job_id} job={job} />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-slate-400">
          We’re not hiring at the moment, but new opportunities are always on
          the horizon. Check back soon or follow us for updates!
        </h1>
      )}
    </div>
  );
};

export default SearchJob;
