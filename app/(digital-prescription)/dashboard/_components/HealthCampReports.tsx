"use client";
import React, { useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import BackButton from "@/components/common/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ToolTipBtn } from "@/components/common/ToolTipBtn";
import {
  setSinglePrescriptionDetails,
  setViewOriginalImageModal,
  setViewUploadedReportModal,
} from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "lucide-react";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import ViewOriginalPrescriptionImage from "@/components/DigitalPrescription/ViewOriginalPrescriptionImage";
import ViewGenerateReportModal from "@/components/DigitalPrescription/Details/ViewGenerateReportModal";

const HealthCampReports = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();

  const { dashboardData, loading, error } = useSelector(
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
              <section className="reports-section">
                <h2 className="text-lg font-bold mb-4">Health Camp Reports</h2>
                <div>
                  {dashboardData &&
                  dashboardData?.hcr_reports &&
                  dashboardData?.hcr_reports.length > 0 ? (
                    <Table
                      removeWrapper
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Report Type</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Action</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.hcr_reports.map(
                          (report: any, pi: number) => (
                            <TableRow key={pi}>
                              <TableCell className="capitalize">
                                {dashboardData?.name}
                              </TableCell>
                              <TableCell>
                                {report?.report_type === "HCR"
                                  ? "Health Camp Report"
                                  : report?.report_type}
                              </TableCell>
                              <TableCell>{report?.ocr_op?.Date}</TableCell>
                              <TableCell className="flex gap-2">
                                <ToolTipBtn
                                  onClick={() => {
                                    dispatch(
                                      setSinglePrescriptionDetails(report)
                                    );
                                    dispatch(setViewUploadedReportModal(true));
                                  }}
                                  title="View Digital Generated Report"
                                  key={1}
                                >
                                  <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                                </ToolTipBtn>

                                <ToolTipBtn
                                  onClick={() => {
                                    dispatch(
                                      setSinglePrescriptionDetails(report)
                                    );
                                    dispatch(setViewOriginalImageModal(true));
                                  }}
                                  title="View Uploaded Report"
                                  key={2}
                                >
                                  <EyeIcon className="h-5 w-5" />
                                </ToolTipBtn>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-slate-600 text-center text-xs">
                      No test report uploaded.
                    </p>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      <ViewOriginalPrescriptionImage />
      <ViewGenerateReportModal />
    </>
  );
};

export default HealthCampReports;
