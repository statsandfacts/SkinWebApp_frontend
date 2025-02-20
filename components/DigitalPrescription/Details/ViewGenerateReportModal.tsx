"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setViewUploadedReportModal } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import Image from "next/image";
import Link from "next/link";
import DigitalLabReport from "./Report/DigitalLabReport";

export default function ViewGenerateReportModal() {
  const dispatch = useDispatch();
  const { isViewReportModal, singlePrescriptionDetails } = useSelector(
    (state: any) => state.digitalPrescription
  );

  const onClose = () => {
    dispatch(setViewUploadedReportModal(false));
  };

  const renderDetail = (type: string) => {
    if (type === "Underweight") {
      return "You are considered underweight. It's important to focus on a balanced diet and consult a healthcare provider to ensure proper nutrition.";
    } else if (type === "Normal weight") {
      return "You are in the normal weight range. Maintain a healthy lifestyle with a balanced diet and regular exercise to stay in this category.";
    } else if (type === "Overweight") {
      return "You are classified as overweight. Consider adopting healthier eating habits and increasing physical activity to manage your weight.";
    } else if (type === "Obesity") {
      return "You are in the obesity range. This increases health risks, and it's advisable to consult a healthcare professional for a weight management plan.";
    } else if (type === "Extreme Obesity") {
      return "You fall into the extreme obesity category. This significantly raises health risks, and professional medical guidance is recommended for long-term weight management.";
    } else {
      return "Invalid BMI category. Please enter a valid type.";
    }
  };

  console.log("singlePrescriptionDetails", singlePrescriptionDetails);

  return (
    <>
      <Modal size={"2xl"} isOpen={isViewReportModal} onClose={onClose}>
        <ModalContent className="mb-16">
          {() => (
            <>
              <ModalHeader className="bg-gray-100 p-4 rounded-t-md">
                <h2 className="text-lg font-bold text-center text-sky-700">
                  {singlePrescriptionDetails?.report_type === "HCR" ||
                  singlePrescriptionDetails?.report_type ===
                    "Health Camp Report"
                    ? "Health Camp Report"
                    : "Smart Lab Report"}
                </h2>
              </ModalHeader>
              <ModalBody className="bg-white">
                {singlePrescriptionDetails?.report_type === "HCR" ||
                singlePrescriptionDetails?.report_type ===
                  "Health Camp Report" ? (
                  <div className="overflow-y-auto max-h-[23rem]">
                    {/* Patient Info */}
                    <div className="mb-6 border-b pb-4">
                      <h3 className="text-md font-semibold text-gray-700 mb-3">
                        Basic Information
                      </h3>
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-600">
                            <strong>Name:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Name}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Email:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Email}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Phone:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Phone}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-600">
                            <strong>Gender:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Gender}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Age:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Age}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Height:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Height}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Weight:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Weight}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Blood Pressure Section */}
                    <div className="mb-6 border-b pb-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
                        <div className="w-full sm:w-2/4">
                          <h3 className="text-md font-semibold text-gray-700 mb-3">
                            Blood Pressure Measurement
                          </h3>
                          <p className="text-sm text-gray-600">
                            <strong>Time:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Time}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Systolic (mmHg):</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Sys}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Diastolic (mmHg):</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Dia}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Pulse Rate (bpm):</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Pulse_Rate}
                          </p>

                          <p className={`text-sm text-sky-800 mt-4`}>
                            <strong>Category :</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.bp_category}
                          </p>
                          <Link
                            href={"/investigation/hypertension"}
                            className="text-sm font-light text-sky-500 border-b-2 border-b-sky-500 w-fit"
                          >
                            view more...
                          </Link>
                        </div>
                        <div className="w-full sm:w-2/4">
                          <h3 className="text-md font-semibold text-gray-700 mb-3">
                            Blood Pressure Classification
                          </h3>
                          <p className="text-sm text-gray-600">
                            <strong>Normal BP: </strong> Less than 120/80 mmHg
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Elevated BP: </strong> {"120-129/<80 mmHg"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Hypertension (Stage 1): </strong>{" "}
                            130-139/80-89 mmHg
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Hypertension (Stage 2): </strong> ≥140/≥90
                            mmHg
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Hypertensive Crisis: </strong>{" "}
                            {
                              ">180/120 mmHg (Immediate medical attention required)"
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Blood Oxygen Section */}
                    <div className="mb-6 border-b pb-4">
                      <h3 className="text-md font-semibold text-gray-700 mb-3">
                        Blood Oxygen Level
                      </h3>
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-600">
                          <strong>SpO2:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.PULSE_OXIMETER}%
                        </p>
                        <p className="text-sm text-sky-800">
                          {/* <strong>Ideal weight range for you :</strong>{" "} */}
                          {singlePrescriptionDetails?.ocr_op?.spo2}
                        </p>
                        <Link
                          href={"/investigation/oxymeter"}
                          className="text-sm font-light text-sky-500 border-b-2 border-b-sky-500 w-fit"
                        >
                          view more...
                        </Link>
                      </div>
                    </div>

                    {/* BMI Calculation Section */}
                    <div className="mb-6 border-b pb-4">
                      <h3 className="text-md font-semibold text-gray-700 mb-3">
                        BMI Calculation
                      </h3>
                      <div className="flex-col md:flex-row flex justify-center items-center md:items-start md:justify-between gap-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            <strong>BMI:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.bmi}
                          </p>
                          <p className="text-sm text-green-700">
                            <strong>Ideal weight range for you :</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.weight_between}
                          </p>
                          <p className="text-sm text-gray-500 font-light w-64 mt-2">
                            {renderDetail(
                              singlePrescriptionDetails?.ocr_op?.result
                            )}
                          </p>
                          <Link
                            href={"/investigation/bmi"}
                            className="text-sm font-light text-sky-500 border-b-2 border-b-sky-500 w-fit"
                          >
                            view more...
                          </Link>
                        </div>
                        <div className="w-3/6 flex flex-col ">
                          <p className="text-sm text-gray-600 ">
                            <strong>Weight Category:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.result}
                          </p>
                          <Image
                            alt={
                              singlePrescriptionDetails?.ocr_op?.result ||
                              "BMI Image"
                            }
                            src={
                              singlePrescriptionDetails?.ocr_op?.result ===
                              "Underweight"
                                ? "/images/digitalPrescription/under_weight.png"
                                : singlePrescriptionDetails?.ocr_op?.result ===
                                  "Normal weight"
                                ? "/images/digitalPrescription/normal_weight.png"
                                : singlePrescriptionDetails?.ocr_op?.result ===
                                  "Overweight"
                                ? "/images/digitalPrescription/over_weight.png"
                                : singlePrescriptionDetails?.ocr_op?.result ===
                                  "Obesity"
                                ? "/images/digitalPrescription/obesity_weight.png"
                                : singlePrescriptionDetails?.ocr_op?.result ===
                                  "Extreme Obesity"
                                ? "/images/digitalPrescription/extreme_weight.png"
                                : ""
                            }
                            width={220}
                            height={220}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Blood Sugar Tests */}
                    <div className="mb-6 border-b pb-4">
                      <h3 className="text-md font-semibold text-gray-700 mb-3">
                        Blood Sugar Tests
                      </h3>
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-600">
                          <strong>FBS:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.fbs
                            ? `${singlePrescriptionDetails?.ocr_op?.fbs} mg/dl`
                            : ""}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>PPBS:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.ppbs
                            ? `${singlePrescriptionDetails?.ocr_op?.ppbs} mg/dl`
                            : ""}
                        </p>
                        {singlePrescriptionDetails?.ocr_op?.sugar_value ===
                        "No parameters found" ? null : (
                          <p className="text-sm text-sky-800">
                            {singlePrescriptionDetails?.ocr_op?.sugar_value}
                          </p>
                        )}

                        <Link
                          href={
                            "/dashboard/health-camp-reports/blood-sugar-test-details"
                          }
                          className="text-sm font-light text-sky-500 border-b-2 border-b-sky-500 w-fit"
                        >
                          view more...
                        </Link>
                      </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="mb-6 border-b pb-4">
                      <h3 className="text-md font-semibold text-gray-700 mb-3">
                        Additional Information
                      </h3>
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            <strong>Chronic Disease:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Chronic_Disease}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Drinking:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Drinking}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Smoking:</strong>{" "}
                            {singlePrescriptionDetails?.ocr_op?.Smoking}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        <strong>Checked by:</strong> Shaswata Shrinivas Panda
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>OSPC License No:</strong> 32295
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Date:</strong>{" "}
                        {singlePrescriptionDetails?.ocr_op?.Date}
                      </p>
                    </div>
                  </div>
                ) : (
                  <DigitalLabReport />
                  // <p className="w-full text-center text-slate-500">
                  //   This Feature Loading... Almost There! Please have patience.
                  // </p>
                )}
              </ModalBody>
              <ModalFooter className="bg-gray-100 p-4 rounded-b-md flex items-center">
                <Image
                  src={"/favicon/android-chrome-192x192.png"}
                  className="rounded-md"
                  alt="logo"
                  width={50}
                  height={50}
                />
                <p className="text-end text-sky-700 font-bold text-sm w-full">
                  NextCare.life
                </p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
