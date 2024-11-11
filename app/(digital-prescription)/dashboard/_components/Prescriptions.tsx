"use client";
import React, { useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import BackButton from "@/components/common/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Loader from "@/components/Loader";
import {
  Accordion,
  AccordionItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ToolTipBtn } from "@/components/common/ToolTipBtn";
import {
    setReuploadModal,
  setSingleCaseDetails,
  setSinglePrescriptionDetails,
  setViewOriginalImageModal,
  setViewPrescriptionDetailsModal,
} from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import {
  ArrowUpTrayIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon } from "lucide-react";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import ViewPrescriptionDetailsModal from "@/components/DigitalPrescription/ViewPrescriptionDetailsModal";
import ViewOriginalPrescriptionImage from "@/components/DigitalPrescription/ViewOriginalPrescriptionImage";
import ReUploadImageModal from "@/components/DigitalPrescription/Details/ReUploadImageModal";
import RedeemDiscountModal from "@/components/DigitalPrescription/RedeemDiscountModal";

const Prescriptions = () => {
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
        <div className="w-full max-w-sm sm:max-w-5xl">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500 ml-3"> Error: {error} </p>
          ) : (
            <>
              {dashboardData && dashboardData?.show_case_details && (
                <section className="prescriptions-section mb-4">
                  <h2 className="text-lg font-bold mb-2">Prescriptions</h2>
                  {dashboardData?.patient_case_dtls.length > 0 ? (
                    <Accordion variant="splitted">
                      {dashboardData?.patient_case_dtls.map(
                        (cases: any, cx: number) => (
                          <AccordionItem
                            key={cx}
                            aria-label={cases?.case_id + cx}
                            title={
                              <span>
                                Status:{" "}
                                {["approve", "conditionally-approve"].includes(
                                  cases?.status
                                )
                                  ? `${cases?.status}d`
                                  : cases?.status}{" "}
                                {cases?.reason && (
                                  <span
                                    className={`text-sm font-normal ${
                                      cases?.status === "hold"
                                        ? "text-orange-400"
                                        : "text-red-400"
                                    }`}
                                  >
                                    ({cases?.reason})
                                  </span>
                                )}
                              </span>
                            }
                            className={`border ${
                              cases?.status === "approve"
                                ? "border-green-400"
                                : cases?.status === "conditionally-approve"
                                ? "border-indigo-400"
                                : cases?.status === "hold"
                                ? "border-orange-400"
                                : cases?.status === "reupload"
                                ? "border-red-400"
                                : "border-yellow-400"
                            }`}
                          >
                            <div>
                              {cases?.prescription_dtls &&
                              cases?.prescription_dtls?.length > 0 ? (
                                <Table
                                  removeWrapper
                                  aria-label="Example static collection table"
                                >
                                  <TableHeader>
                                    <TableColumn>Name</TableColumn>
                                    <TableColumn>Prescription Date</TableColumn>
                                    <TableColumn>Prescription Type</TableColumn>
                                    <TableColumn>Prescription</TableColumn>
                                  </TableHeader>
                                  <TableBody>
                                    {cases?.prescription_dtls.map(
                                      (prescription: any, pi: number) => (
                                        <TableRow key={pi}>
                                          <TableCell className="capitalize">
                                            {dashboardData?.name}
                                          </TableCell>
                                          <TableCell>
                                            {cases?.upload_date}
                                          </TableCell>
                                          <TableCell>
                                            {prescription?.report_type
                                              ? prescription?.report_type
                                              : "Prescription"}
                                          </TableCell>
                                          <TableCell className="flex gap-2">
                                            {[
                                              "approve",
                                              "conditionally-approve",
                                            ].includes(cases?.status) && (
                                              <ToolTipBtn
                                                onClick={() => {
                                                  dispatch(
                                                    setSinglePrescriptionDetails(
                                                      prescription
                                                    )
                                                  );
                                                  dispatch(
                                                    setSingleCaseDetails(cases)
                                                  );
                                                  dispatch(
                                                    setViewPrescriptionDetailsModal(
                                                      true
                                                    )
                                                  );
                                                }}
                                                title="View Prescription Details"
                                                key={1}
                                              >
                                                <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                                              </ToolTipBtn>
                                            )}

                                            {cases?.status === "reupload" && (
                                              <ToolTipBtn
                                                onClick={() => {
                                                  dispatch(
                                                    setSinglePrescriptionDetails(
                                                      prescription
                                                    )
                                                  );
                                                  dispatch(
                                                    setSingleCaseDetails(cases)
                                                  );
                                                  dispatch(
                                                    setReuploadModal(true)
                                                  );
                                                }}
                                                title="Reupload Your Prescription."
                                                color="danger"
                                                key={1}
                                              >
                                                <ArrowUpTrayIcon className="h-5 w-5" />
                                              </ToolTipBtn>
                                            )}

                                            <ToolTipBtn
                                              onClick={() => {
                                                dispatch(
                                                  setSinglePrescriptionDetails(
                                                    prescription
                                                  )
                                                );
                                                dispatch(
                                                  setViewOriginalImageModal(
                                                    true
                                                  )
                                                );
                                              }}
                                              title="Original Prescription Image"
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
                                  No Prescription Uploaded For This Case.
                                </p>
                              )}
                            </div>
                          </AccordionItem>
                        )
                      )}
                    </Accordion>
                  ) : (
                    <p className="text-slate-600 text-center text-xs">
                      No Prescription Uploaded Yet.
                    </p>
                  )}
                </section>
              )}
            </>
          )}
        </div>
      </div>

      <ViewPrescriptionDetailsModal />
      <ViewOriginalPrescriptionImage />
      <ReUploadImageModal />
      <RedeemDiscountModal />
    </>
  );
};

export default Prescriptions;
