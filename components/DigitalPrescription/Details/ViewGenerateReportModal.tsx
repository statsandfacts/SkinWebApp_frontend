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

type BPResult = {
  message: string | null;
  className: string | null;
};

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

  const classifyBloodPressure = (
    systolic: string | null,
    diastolic: string | null
  ): BPResult => {
    // Convert strings to numbers, handling nulls
    const systolicValue = systolic ? parseInt(systolic) : NaN;
    const diastolicValue = diastolic ? parseInt(diastolic) : NaN;

    // Check for NaN values to ensure valid input
    if (isNaN(systolicValue) || isNaN(diastolicValue)) {
      return {
        message: "Invalid input. Please enter numbers.",
        className: "text-gray-600",
      }; // Optional: handle invalid input
    }

    if (systolicValue >= 180 || diastolicValue >= 120) {
      return {
        message: "Hypertensive Crisis! Seek medical help.",
        className: "text-red-600",
      }; // Red color for emergency
    }
    if (systolicValue >= 140 || diastolicValue >= 90) {
      return {
        message: "Stage 2 Hypertension detected.",
        className: "text-orange-600",
      }; // Orange color for Stage 2
    }
    if (systolicValue >= 130 || diastolicValue >= 80) {
      return {
        message: "Stage 1 Hypertension detected.",
        className: "text-yellow-700",
      }; // Yellow color for Stage 1
    }
    if (systolicValue >= 120 && diastolicValue < 80) {
      return {
        message: "Blood Pressure is Elevated.",
        className: "text-yellow-400",
      }; // Blue color for Elevated
    }
    return {
      message: "Blood Pressure is Normal.",
      className: "text-green-600",
    }; // Green color for Normal
  };

  return (
    <>
      <Modal size={"2xl"} isOpen={isViewReportModal} onClose={onClose}>
        <ModalContent className="mb-20">
          {() => (
            <>
              <ModalHeader className="bg-gray-100 p-4 rounded-t-md">
                <h2 className="text-lg font-bold text-center text-sky-700">
                  {"Health Camp Report"}
                </h2>
              </ModalHeader>
              <ModalBody className="bg-white p-6">
                <div className="overflow-y-auto max-h-[30rem]">
                  {/* Patient Info */}
                  <div className="mb-6 border-b pb-4">
                    <h3 className="text-md font-semibold text-gray-700 mb-3">
                      Basic Information
                    </h3>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-600">
                          <strong>Name:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Email:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Phone:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.phone}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-600">
                          <strong>Gender:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.gender}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Age:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.age}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Height:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.height}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Weight:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.weight}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Blood Pressure Section */}
                  <div className="mb-6 border-b pb-4">
                    {/* <h3 className="text-md font-semibold text-gray-700 mb-3">
                      Blood Pressure
                    </h3> */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
                      <div className="w-full sm:w-2/4">
                        <h3 className="text-md font-semibold text-gray-700 mb-3">
                          Blood Pressure Measurement
                        </h3>
                        <p className="text-sm text-gray-600">
                          <strong>Time:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Systolic (mmHg):</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.sys}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Diastolic (mmHg):</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.dia}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Pulse Rate (bpm):</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.pulse_rate}
                        </p>

                        <p
                          className={`text-sm text-gray-600 mt-4 ${
                            classifyBloodPressure(
                              singlePrescriptionDetails?.ocr_op?.sys,
                              singlePrescriptionDetails?.ocr_op?.pulse_rate
                            )?.className
                          }`}
                        >
                          <strong>Category :</strong>{" "}
                          {
                            classifyBloodPressure(
                              singlePrescriptionDetails?.ocr_op?.sys,
                              singlePrescriptionDetails?.ocr_op?.pulse_rate
                            )?.message
                          }
                        </p>
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
                      </div>
                      <div className="w-3/6 flex flex-col ">
                        <p className="text-sm text-gray-600 ">
                          <strong>Weight Category:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.result}
                        </p>
                        <Image
                          alt={singlePrescriptionDetails?.ocr_op?.result || "BMI Image"}
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

                  {/* Additional Information Section */}
                  <div className="mb-6 border-b pb-4">
                    <h3 className="text-md font-semibold text-gray-700 mb-3">
                      Additional Information
                    </h3>
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>Chronic Disease:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.chronic_disease}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Drinking:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.drinking}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Smoking:</strong>{" "}
                          {singlePrescriptionDetails?.ocr_op?.smoking}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      <strong>Checked by:</strong> Harapriya Dash
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>License No:</strong> 4127/O.P.C Dt. 23.06.2022
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Date:</strong>{" "}
                      {singlePrescriptionDetails?.ocr_op?.date}
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="bg-gray-100 p-4 rounded-b-md flex items-center">
                <Image
                  src={"/favicon/android-chrome-512x512.png"}
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
