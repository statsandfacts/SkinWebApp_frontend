"use client";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
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
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import {
  setReuploadModal,
  setSingleCaseDetails,
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
import ReUploadImageModal from "./ReUploadImageModal";
import { useRouter } from "next/navigation";
import { setIsRedeemDiscount } from "@/redux/slices/digitalPrescription/auth.slice";
import RedeemDiscountModal from "../RedeemDiscountModal";

const PrescriptionDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userId } = useAuthInfo();

  const { dashboardData, loading, error } = useSelector(
    (state: RootState) => state.userDashboard
  );
  const { pharmacyUserId } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(fetchPatientDashboard(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <div className="flex gap-2 justify-end w-full md:hidden">
        {/* {pharmacyUserId && (
          <Button
            color="success"
            className="text-sm text-white px-4 rounded-lg font-bold py-1 h-9"
            onPress={() => dispatch(setIsRedeemDiscount(true))}
          >
            Redeem
          </Button>
        )} */}
        <Button
          color="primary"
          variant="solid"
          className="text-sm px-4 rounded-lg font-bold py-1 h-9"
          onPress={() => {
            router.push("/upload-prescription");
          }}
        >
          <ArrowUpTrayIcon className="h-4 w-4 " /> Upload Documents
        </Button>
      </div>
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
                                <TableColumn>Action</TableColumn>
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
                                              dispatch(setReuploadModal(true));
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
                                              setViewOriginalImageModal(true)
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
                    <TableColumn>Report Type</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Action</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {dashboardData.unmapped_report_dtls.map(
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
      <ReUploadImageModal />
      <RedeemDiscountModal />
    </div>
  );
};

export default PrescriptionDetails;
