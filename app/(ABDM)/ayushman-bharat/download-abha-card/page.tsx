import { Metadata } from "next";
import DownloadAbhaCard from "../components/DownloadAbhaCard";

export const metadata: Metadata = {
  title: "Download ABHA Health ID",
};

const ABHADownloadPage = () => {
  return (
    <div className="p-10 md:px-40">
      <DownloadAbhaCard />
    </div>
  );
};

export default ABHADownloadPage;
