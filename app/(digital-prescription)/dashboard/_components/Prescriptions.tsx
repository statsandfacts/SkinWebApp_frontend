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
  AlertCircle,
  LoaderIcon,
  UploadCloud,
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
                        icon={AlertCircle}
                      />
                    )}
                    {prescriptionCases.approved.length > 0 && (
                      <ItemCard
                        title={"In-Progress"}
                        link={"/dashboard/prescriptions/in-progress"}
                        icon={LoaderIcon}
                      />
                    )}
                    {prescriptionCases.conditionallyApproved.length > 0 && (
                      <ItemCard
                        title={"Re-Upload"}
                        link={"/dashboard/prescriptions/re-upload"}
                        icon={UploadCloud}
                      />
                    )}
                  </div>
                  {/* {dashboardData?.patient_case_dtls.length > 0 ? (
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
                  )} */}
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
