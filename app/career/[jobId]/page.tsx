import type { Metadata } from "next";
import JobDetail from "@/components/Career/JobDetail";

export const metadata: Metadata = {
  title: "Job Detail",
};

const JobDetailPage = () => {
  return (
    <div className="p-10 md:px-40">
      <JobDetail />
    </div>
  );
};

export default JobDetailPage;
