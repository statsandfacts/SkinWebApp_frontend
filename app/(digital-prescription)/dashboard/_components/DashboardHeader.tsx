"use client";
import Link from "next/link";
import { Upload } from "lucide-react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userLogout } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { logOutUser } from "@/redux/slices/digitalPrescription/auth.slice";
import { resetPrescription } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { resetFamilyMember } from "@/redux/slices/digitalPrescription/familyMembers.slice";

type DashboardHeaderProps = {
  isLogout?: boolean; // Optional boolean prop
};

const DashboardHeader = ({ isLogout = true }: DashboardHeaderProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = () => {
    setIsLoading(true);
    userLogout()
      .then((response) => {
        toast.success("Logout successfully.");
        router.push("/");
        dispatch(logOutUser());
        dispatch(resetPrescription());
        dispatch(resetFamilyMember());
      })
      .catch((error) => {
        toast.error("Logout Failed!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {/* {isLogout && (
        <div className="w-full max-w-7xl flex justify-end">
          <button
            onClick={handleLogout}
            className="p-2 flex justify-center items-center text-red-400 hover:text-red-500 transition-all text-sm"
            disabled={isLoading}
          >
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      )} */}

      {/* Upload Card */}
      <div className="w-full bg-gray-50 rounded-lg shadow-sm p-3 mb-10 flex flex-col justify-center items-center max-w-sm sm:max-w-7xl mt-6">
        <Link href={"/upload-prescription"}>
          <div className="flex justify-center items-center mt-2">
            <Upload className="w-10 h-10 text-sky-600 group-hover:text-sky-700 transition-all duration-500 transform group-hover:translate-y-[-8px] group-hover:scale-110 animate-bounce" />
          </div>
        </Link>
        <div className="mt-4 text-lg font-semibold text-slate-700 group-hover:text-sky-700 transition-all duration-500 ease-in-out group-hover:translate-y-[-8px]">
          Upload Health Documents
        </div>
        <div className="mt-2 text-sm text-slate-500 group-hover:text-sky-600 transition-all duration-500 ease-in-out group-hover:translate-y-[-8px]">
          Upload prescriptions, reports, and health-related documents.
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
