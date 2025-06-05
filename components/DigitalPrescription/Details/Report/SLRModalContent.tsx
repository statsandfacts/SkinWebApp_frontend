"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  SLRDiteAdj,
  SLREduIn,
  SLRGrpExp,
  SLRNotDetected,
  SLRParExp,
} from "./index";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { UserIcon, ArrowRight, Loader, ChevronLeftIcon } from "lucide-react";
import SLRFooter from "./SLRFooter";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { fetchSingleReportData } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import HandIcon from "@/components/SvgIcon/HandIcon";

const guideSteps = [
  "Your Health Summary",
  "Parameters at a glance",
  "Educational Insights",
  "Health Plan & Adjustments",
  "Detailed Parameter Insights",
  "Not detected Parameters",
  "Your opinion",
];

const SLRModalContent = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { reportId } = useParams();
  const { userDetails } = useAuthInfo();
  const { singleReport } = useSelector(
    (state: RootState) => state.userDashboard
  );

  useEffect(() => {
    if (reportId) {
      dispatch(fetchSingleReportData(reportId));
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-white mt-2">
      <div className="flex justify-start w-full max-w-sm sm:max-w-7xl">
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center text-slate-600 mb-2 transition ease-in-out duration-200 hover:text-sky-700 hover:translate-x-1"
        >
          <ChevronLeftIcon className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
          Back
        </button>
      </div>
      <div className="w-full max-w-sm overflow-auto sm:max-w-5xl">
        {singleReport.loading ? (
          <Loader className="animate-spin" />
        ) : singleReport.error ? (
          <p className="text-red-500 ml-3"> Error: {singleReport.error} </p>
        ) : (
          <>
            <div className="flex flex-col justify-center items-start w-full gap-4 p-4">
              <div className="flex flex-col items-start">
                <Image
                  src="/logo_with_bg.svg"
                  alt="Logo"
                  width={100}
                  height={500}
                />
                <p className="text-3xl font-bold text-primary">Nextcare.Life</p>
                <p className="text-4xl font-bold text-primary">
                  Smart Lab Report
                </p>
                <small className="text-lg font-light text-gray-400">
                  Empowering Health Decision with clarity and insight
                </small>
              </div>

              {/* User Details */}
              <div className="w-full bg-primary-lite shadow-primary-50 shadow-lg p-6 rounded-xl">
                <div className="flex justify-between items-start gap-x-10">
                  <div className="flex items-start gap-3">
                    <UserIcon className="h-8 w-8 text-primary" />
                    <div className="flex flex-col text-white text-lg font-medium space-y-1">
                      <p>{userDetails?.name}</p>
                      {/* <p>Age: {userDetails?.age}</p> */}
                      <p>Gender: {userDetails?.gender}</p>
                    </div>
                  </div>
                  <div className="flex flex-col text-white text-sm font-medium space-y-1 text-right">
                    {/* <p>Lab No: {singlePrescriptionDetails?.lab_number || "123456"}</p>
            <p>
              Test date: {singlePrescriptionDetails?.test_date || "03-05-2025"}
            </p> */}
                  </div>
                </div>
              </div>

              {/* Health Summary */}
              <div className="w-full bg-primary-lite shadow-primary-50 shadow-lg p-6 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/smartlabreports/healthsummery.png"
                      width={35}
                      height={35}
                      alt="Health Summary Icon"
                      className="mt-1"
                    />
                    <p className="text-white font-medium text-lg">
                      Your Health Summary
                    </p>
                  </div>
                  {/* <p className="text-white font-medium text-sm">Health Score</p> */}
                </div>
                <div className="flex justify-between items-start mt-2">
                  <p className="w-4/5 font-light text-sm text-white ml-6">
                    Unlock the story behind your numbers! Your health summary
                    breaks down test results into easy-to-understand insights,
                    spotlighting what matters most. No jargon—just clear,
                    personalized guidance to help you stay on top of your
                    well-being.
                  </p>
                  {/* <div className="flex flex-col items-center gap-1 mr-4">
                    <p className="text-white text-xs">Score</p>
                    <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white text-white font-semibold">
                      {singlePrescriptionDetails?.health_score ?? "75"}
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Guide Flow  */}
              {/* <div className="flex flex-col items-center my-6 w-full">
                <p className="text-primary font-medium text-xl mb-4">
                  Step-by-Step Lab Report Guide
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-5xl w-full">

                  {guideSteps.map((step, index) => (
                    <React.Fragment key={index}>
                      <div className="bg-primary-mute rounded-3xl px-4 py-2 sm:py-6 shadow-md text-center font-medium text-sm text-slate-500 whitespace-nowrap">
                        {step}
                      </div>
                      {index < guideSteps.length - 1 && (
                        <div className="flex items-center justify-center p-1 bg-primary rounded-md">
                          <ArrowRight className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div> */}
              {/* Guide Flow */}
              <div className="flex flex-col items-center my-6 w-full">
                <p className="text-primary font-semibold text-xl mb-4">
                  <HandIcon color="#ffffff" height={16} width={16} />
                  Step-by-Step Lab Report Guide
                </p>

                <div className="grid grid-cols-3 gap-10 max-w-3xl ">
                  {guideSteps.map((step, index) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center justify-center">
                        <div className="w-36 h-20  bg-primary-mute rounded-3xl shadow-md text-center flex items-center justify-center text-sm font-medium text-slate-500">
                          {step}
                        </div>
                        {index < guideSteps.length - 1 && (
                          <div className="flex items-center justify-center p-1 bg-primary rounded-md ml-10">
                            <ArrowRight className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Dynamic Sections */}
              <SLRGrpExp
                data={singleReport.data?.data?.slr_res?.grouped_results || []}
              />
              <SLRParExp
                data={singleReport.data?.data?.slr_res?.smartlab_data || []}
              />
              <SLRDiteAdj
                data={singleReport.data?.data?.slr_res?.groupwise_data || []}
              />
              <SLREduIn
                data={
                  singleReport.data?.data?.slr_res?.educational_insights || []
                }
              />
              <SLRNotDetected
                data={
                  singleReport.data?.data?.slr_res?.not_detected_results || []
                }
              />
              <SLRFooter />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SLRModalContent;
