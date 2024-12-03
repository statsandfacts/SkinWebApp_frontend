"use client";
import React, { useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import BackButton from "@/components/common/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Loader from "@/components/Loader";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import RedeemDiscountModal from "@/components/DigitalPrescription/RedeemDiscountModal";
import ItemCard from "./ItemCard";
import {
  CheckCircle,
  LoaderIcon,
  UploadCloud,
  FileCheck
} from "lucide-react";

const Prescriptions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();

  const { dashboardData, loading, error, prescriptionCases } = useSelector(
    (state: RootState) => state.userDashboard
  );

  useEffect(() => {
    if (!dashboardData) {
      dispatch(fetchPatientDashboard(userId));
    }
  }, [dispatch, dashboardData]);

  return (
    <>
      <div className="flex flex-col items-center bg-white mt-2">
        <div className="flex justify-start w-full max-w-sm sm:max-w-7xl">
          <BackButton />
        </div>
        <DashboardHeader isLogout={false} />

        <div className="w-full max-w-sm overflow-auto sm:max-w-5xl">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500 ml-3"> Error: {error} </p>
          ) : (
            <>
              {dashboardData && dashboardData?.show_case_details && (
                <section className="prescriptions-section mb-4">
                  <h2 className="text-lg font-bold mb-2">Prescriptions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
                    {prescriptionCases.approved.length > 0 && (
                      <ItemCard
                        title={"Approved"}
                        link={"/dashboard/prescriptions/approved"}
                        icon={CheckCircle}
                      />
                    )}
                    {prescriptionCases.conditionallyApproved.length > 0 && (
                      <ItemCard
                        title={"Conditionally Approved"}
                        link={"/dashboard/prescriptions/conditionally-approved"}
                        icon={FileCheck}
                      />
                    )}
                    {prescriptionCases.inProgress.length > 0 && (
                      <ItemCard
                        title={"In-Progress"}
                        link={"/dashboard/prescriptions/in-progress"}
                        icon={LoaderIcon}
                      />
                    )}
                    {prescriptionCases.reUpload.length > 0 && (
                      <ItemCard
                        title={"Re-Upload"}
                        link={"/dashboard/prescriptions/re-upload"}
                        icon={UploadCloud}
                      />
                    )}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>

      <RedeemDiscountModal />
    </>
  );
};

export default Prescriptions;
