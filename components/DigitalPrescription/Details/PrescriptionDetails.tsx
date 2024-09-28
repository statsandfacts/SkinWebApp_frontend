"use client";
import React, { useEffect } from "react";
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
import {
  EyeIcon,
  DocumentMagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import {
  setSinglePrescriptionDetails,
  setViewOriginalImageModal,
  setViewPrescriptionDetailsModal,
  setViewUploadedReportModal,
} from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { useDispatch, useSelector } from "react-redux";
import ViewPrescriptionDetailsModal from "../ViewPrescriptionDetailsModal";
import { ToolTipBtn } from "../../common/ToolTipBtn";
import ViewOriginalPrescriptionImage from "../ViewOriginalPrescriptionImage";
import { AppDispatch, RootState } from "@/redux/store";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import Loader from "@/components/Loader";
import ViewGenerateReportModal from "./ViewGenerateReportModal";

const PrescriptionDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();

  const { dashboardData, loading, error } = useSelector(
    (state: RootState) => state.userDashboard
  );

  useEffect(() => {
    dispatch(fetchPatientDashboard(userId));
  }, [dispatch, userId]);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 ml-3"> Error: {error} </p>
      ) : (
        <>
          {/* Prescription Section */}
          {dashboardData && dashboardData?.show_case_details && (
            <section className="prescriptions-section mb-8">
              <h2 className="text-lg font-bold mb-4">Prescriptions</h2>
              {dashboardData?.patient_case_dtls.length > 0 ? (
                <Accordion variant="splitted">
                  {dashboardData?.patient_case_dtls.map(
                    (cases: any, cx: number) => (
                      <AccordionItem
                        key={cx}
                        aria-label={cases?.case_id + cx}
                        title={`Status: ${cases?.status}`}
                        className={`border ${
                          cases?.status === "approve"
                            ? "border-sky-200"
                            : "border-yellow-200"
                        }`}
                      >
                        <React.Fragment>
                          <Table
                            removeWrapper
                            aria-label="Example static collection table"
                          >
                            <TableHeader>
                              <TableColumn>Doctor Name</TableColumn>
                              <TableColumn>Date</TableColumn>
                              <TableColumn>Address</TableColumn>
                              <TableColumn>
                                {" "}
                                <></>{" "}
                              </TableColumn>
                            </TableHeader>
                            <TableBody>
                              {cases?.prescription_dtls.length > 0 ? (
                                cases?.prescription_dtls.map(
                                  (prescription: any, pi: number) => (
                                    <TableRow key={pi}>
                                      <TableCell className="capitalize">
                                        {prescription?.doctor_name}
                                      </TableCell>
                                      <TableCell>
                                        {prescription?.prescription_date}
                                      </TableCell>
                                      <TableCell>
                                        {prescription?.provider_dtls}
                                      </TableCell>
                                      <TableCell className="flex gap-2">
                                        {cases?.status === "approve" && (
                                          <ToolTipBtn
                                            onClick={() => {
                                              dispatch(
                                                setSinglePrescriptionDetails(
                                                  prescription
                                                )
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

                                        <ToolTipBtn
                                          onClick={() => {
                                            dispatch(
                                              setSinglePrescriptionDetails(
                                                prescription
                                              )
                                            );
                                            dispatch(
                                              setViewOriginalImageModal(true)
                                            );
                                          }}
                                          title="View Original Image"
                                          key={2}
                                        >
                                          <EyeIcon className="h-5 w-5" />
                                        </ToolTipBtn>
                                      </TableCell>
                                    </TableRow>
                                  )
                                )
                              ) : (
                                <TableRow key={"1"}>
                                  <TableCell colSpan={4}>
                                    {"No Cases! Found"}
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </React.Fragment>
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

          {/* Reports Section */}
          <section className="reports-section">
            <h2 className="text-lg font-bold mb-4">Reports</h2>
            <div>
              {dashboardData &&
              dashboardData?.unmapped_report_dtls &&
              dashboardData?.unmapped_report_dtls.length > 0 ? (
                <Table
                  removeWrapper
                  aria-label="Example static collection table"
                >
                  <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Gender</TableColumn>
                    <TableColumn>Date Of Birth</TableColumn>
                    <TableColumn>Action</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {dashboardData.unmapped_report_dtls.map(
                      (report: any, pi: number) => (
                        <TableRow key={pi}>
                          <TableCell className="capitalize">
                            {dashboardData.name}
                          </TableCell>
                          <TableCell>{dashboardData.gender}</TableCell>
                          <TableCell>{dashboardData.dob}</TableCell>
                          <TableCell className="flex gap-2">
                            <ToolTipBtn
                              onClick={() => {
                                dispatch(setSinglePrescriptionDetails(report));
                                dispatch(setViewUploadedReportModal(true));
                              }}
                              title="View Digital Generated Report"
                              key={1}
                            >
                              <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                            </ToolTipBtn>

                            <ToolTipBtn
                              onClick={() => {
                                dispatch(setSinglePrescriptionDetails(report));
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

      <ViewPrescriptionDetailsModal />
      <ViewOriginalPrescriptionImage />
      <ViewGenerateReportModal />
    </React.Fragment>
  );
};

export default PrescriptionDetails;
