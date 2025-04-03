"use client";
import { AppDispatch, RootState } from "@/redux/store";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Share2Icon,
  ClipboardCopyIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../app/blog/_component/BlogContent.module.css";
import { Button } from "@nextui-org/button";
import moment from "moment";
import { fetchJobDtls } from "@/redux/slices/digitalPrescription/career.slice";
import { toast } from "react-toastify";

const JobDetail = () => {
  const router = useRouter();
  const { jobId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { singleJobDtls } = useSelector((state: RootState) => state.career);

  useEffect(() => {
    if (!singleJobDtls) {
      dispatch(fetchJobDtls(jobId));
    }
  }, [singleJobDtls]);

  const handleApply = () => {
    const subject = encodeURIComponent(
      `Application for ${singleJobDtls?.job_title}`
    );
    const body = encodeURIComponent(
      `Dear Hiring Manager,\n\nI am interested in the ${singleJobDtls?.job_title} position at your company.\n\nPlease find my resume attached.\n\nBest regards,`
    );
    window.location.href = `mailto:contact@statsandfacts.in?subject=${subject}&body=${body}`;
  };

  const handleShare = () => {
    const jobUrl = window.location.href;
    navigator.clipboard.writeText(jobUrl);
    toast.success("Job link copied to clipboard!");
  };

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex justify-center items-center text-slate-600 mb-2 transition ease-in-out duration-200 hover:text-sky-700 hover:translate-x-1"
      >
        <ChevronLeftIcon className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
        Career
      </button>
      <div className="md:px-14 lg:px-40">
        <p className="font-bold text-xl md:text-4xl text-sky-800">
          {singleJobDtls?.job_title}
        </p>
        <div className="flex items-center gap-2 md:gap-4 mt-4">
          <p className="font-medium text-lg text-slate-700">
            {singleJobDtls?.location}
          </p>
          <div className="h-4 border-l-2 border-slate-400"></div>
          <p className="font-medium text-lg text-slate-700">
            JOB ID : {singleJobDtls?.job_id}
          </p>
          <div className="h-4 border-l-2 border-slate-400"></div>
          <p className="font-medium text-lg text-slate-700">
            {singleJobDtls?.employment_type}
          </p>
        </div>
        <div className="mt-6 flex items-center gap-2 md:gap-4">
          <Button color="primary" className="rounded-md" onClick={handleApply}>
            Apply Now
            <ChevronRightIcon className="h-6 w-6 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
          </Button>

          <button
            className="flex items-center gap-2 font-bold text-sky-800"
            onClick={handleShare}
          >
            <ClipboardCopyIcon className="h-6 w-6 transition-transform duration-200 ease-in-out" />
            Copy Clipboard
          </button>
        </div>
        <div className="mt-6 border p-3 bg-white rounded-lg shadow-sm">
          <p className="font-bold text-4xl text-slate-700 mb-6">
            Job Description
          </p>
          {singleJobDtls?.description && (
            <div className={styles.content}>
              <div
                dangerouslySetInnerHTML={{ __html: singleJobDtls?.description }}
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-sm font-normal text-slate-600">
            Experience Range : {singleJobDtls?.experience_range}
          </p>
          <p className="text-sm font-normal text-slate-600">
            Employment Type : {singleJobDtls?.employment_type}
          </p>
          <p className="text-sm font-normal text-slate-600">
            Department : {singleJobDtls?.department}
          </p>
          <p className="text-sm font-normal text-slate-600">
            Salary : {singleJobDtls?.salary_range}
          </p>
          <p className="text-sm font-normal text-slate-600">
            Location : {singleJobDtls?.location}
          </p>
          <p className="text-sm font-normal text-slate-600">
            Posted Date :{" "}
            {moment(singleJobDtls?.posted_date).format("DD-MM-YYYYY")}
          </p>
        </div>

        <div>
          <p className="font-bold text-base text-slate-600">Contact :</p>
          <p className="text-sm font-normal text-slate-600">
            Email : contact@statsandfacts.in
          </p>
          <p className="text-sm font-normal text-slate-600">
            Phone : 7008524252, 9124416966
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
