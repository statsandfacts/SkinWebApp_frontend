"use client";
import React, { useEffect } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  EyeIcon,
  DocumentMagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import {
  setSinglePrescriptionDetails,
  setViewOriginalImageModal,
  setViewPrescriptionDetailsModal,
} from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { useDispatch, useSelector } from "react-redux";
import ViewPrescriptionDetailsModal from "../ViewPrescriptionDetailsModal";
import { ToolTipBtn } from "../../common/ToolTipBtn";
import ViewOriginalPrescriptionImage from "../ViewOriginalPrescriptionImage";
import { AppDispatch, RootState } from "@/redux/store";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";

const PrescriptionDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();

  const { dashboardData, loading, error } = useSelector(
    (state: RootState) => state.userDashboard
  );

  useEffect(() => {
    dispatch(fetchPatientDashboard(userId));
  }, [dispatch, userId]);

  console.log("dashboardData", dashboardData);

  return (
    <>
      <Accordion variant="splitted">
        {dashboardData?.patient_case_dtls.length > 0 &&
          dashboardData?.patient_case_dtls.map((cases: any, cx: number) => (
            <AccordionItem
              key={cx}
              aria-label={cases?.case_id + cx}
              title={`Status: ${cases?.status}`}
            >
              <React.Fragment>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Date</th>
                      <th>Address</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cases?.prescription_dtls.length > 0 &&
                      cases?.prescription_dtls.map(
                        (prescription: any, pi: number) => (
                          <tr key={pi}>
                            <td> {prescription?.doctor_name} </td>
                            <td> {prescription?.prescription_date} </td>
                            <td> {prescription?.provider_dtls} </td>
                            <td className="flex gap-4 justify-center">
                              {cases?.status === "approve" && (
                                <ToolTipBtn
                                  onClick={() => {
                                    dispatch(
                                      setSinglePrescriptionDetails(prescription)
                                    );
                                    dispatch(
                                      setViewPrescriptionDetailsModal(true)
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
                                    setSinglePrescriptionDetails(prescription)
                                  );
                                  dispatch(setViewOriginalImageModal(true));
                                }}
                                title="View Original Image"
                                key={2}
                              >
                                <EyeIcon className="h-5 w-5" />
                              </ToolTipBtn>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </React.Fragment>
            </AccordionItem>
          ))}
      </Accordion>

      <ViewPrescriptionDetailsModal />
      <ViewOriginalPrescriptionImage />
    </>
  );
};

export default PrescriptionDetails;
