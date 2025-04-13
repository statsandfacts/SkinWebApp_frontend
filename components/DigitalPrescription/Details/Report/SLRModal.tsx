"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setViewSmartLabReportModal } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import Image from "next/image";
import {
  SLRDiteAdj,
  SLREduIn,
  SLRGrpExp,
  SLRNotDetected,
  SLRParExp,
} from "./index";

const SLRModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.digitalPrescription.viewSmartLabReportModal
  );
  const { singlePrescriptionDetails } = useSelector(
    (state: any) => state.digitalPrescription
  );

  console.log("singlePrescriptionDetails", singlePrescriptionDetails);
  const slrRes = singlePrescriptionDetails?.slr_res;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(setViewSmartLabReportModal(false))}
      backdrop="blur"
      size="5xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="text-2xl font-bold text-gray-800">
          🧾 Nextcare.Life Smart Lab Report
        </ModalHeader>
        <ModalBody>
          <div className=" space-y-2">
            <p className="text-sm italic">
              Empowering Health Decisions with Clarity and Insight
            </p>

            <hr className="my-4 border-gray-300" />

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                👤 Patient Information
              </h3>
              <ul className="list-disc ml-6 text-sm mt-2 space-y-1">
                <li>Name: xxxxxxxxxx</li>
                <li>Age: x years</li>
                <li>Gender: xxxxxxxxxx</li>
                <li>Lab ID: xxxxxxxxxxxxxxx</li>
                <li>Test Date: xxxxxxxxxxxxxxxxx</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mt-4">
                🧬 Your Health Summary Report
              </h3>
              <p className="text-sm mt-2">
                Wishing you strength, good health, and wellness as you take this
                important step toward understanding your body better. Stay
                proactive, stay positive — your health is your wealth!
              </p>
            </div>

            <div className="text-base pl-4 mt-2 italic">
              *This summary is based only on your blood and urine test results.
              It does not include findings from X-ray, MRI, CT scan, Stool test,
              ECG, or EEG. (Warnings)
            </div>

            <SLRGrpExp data={slrRes?.grouped_results || []} />

            <div className="mt-6 border-t pt-4 text-sm text-gray-700 space-y-3  max-h-60">
              <div className="mt-4">
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    <span className="font-semibold">🟢 Normal:</span> Value is
                    within the healthy reference range.
                  </li>
                  <li>
                    <span className="font-semibold">🟡 Borderline (±10%):</span>{" "}
                    Slightly outside the normal range, may need monitoring.
                  </li>
                  <li>
                    <span className="font-semibold">🔴 Abnormal (10–20%):</span>{" "}
                    Outside the healthy range and may indicate a developing
                    issue.
                  </li>
                  <li>
                    <span className="font-semibold">
                      🟥 Very Abnormal (&gt;20%):
                    </span>{" "}
                    Significantly outside the range; potential health risk.
                  </li>
                </ul>
              </div>
            </div>

            <SLRParExp data={slrRes?.smartlab_data || []} />

            <div>
              <h3 className="font-semibold">📉 If the Value is Low</h3>
              <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                <div>
                  <p className="font-medium underline mb-3">Causes:</p>
                  <ul className="list-disc ml-5">
                    <li>Iron deficiency</li>
                    <li>Chronic bleeding</li>
                    <li>Malnutrition</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium underline mb-3">Effects:</p>
                  <ul className="list-disc ml-5">
                    <li>Fatigue</li>
                    <li>Weakness</li>
                    <li>Shortness of breath</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-sm space-y-1 mt-4">
              <p className="font-semibold ">✅ What You Can Do (Low Hb):</p>
              <ul className="list-disc ml-6">
                <li>Take iron-rich foods like spinach, red meat, beans</li>
                <li>Use doctor-prescribed iron supplements</li>
                <li>Avoid tea/coffee with meals (reduces iron absorption)</li>
              </ul>
            </div>

            <div className="text-sm mt-4">
              <p className="font-semibold ">🟢 Do’s in Diet (Low Hb):</p>
              <ul className="list-disc ml-6">
                <li>Green leafy vegetables</li>
                <li>Dates, raisins</li>
                <li>Vitamin C-rich fruits (for better iron absorption)</li>
              </ul>
            </div>

            <div className="text-sm mt-6">
              <p className="font-semibold ">🚫 Don’ts in Diet (Low Hb):</p>
              <ul className="list-disc ml-6">
                <li>Limit caffeine</li>
                <li>Avoid calcium-rich food during iron intake</li>
              </ul>
            </div>

            <div className="mt-6 text-sm">
              <p className="font-semibold ">✅ If Value is Normal:</p>
              <p className="ml-6 italic">
                Your Hemoglobin level is within the normal range. Keep up your
                balanced diet and stay active to maintain your health.
              </p>
            </div>
          </div>
          <div className="ml-6 mt-4">
            <Image
              id="hemoglobin-chart"
              src="/smartlabreport/image.png"
              alt="Hemoglobin Chart"
              width={600}
              height={400}
              className="rounded-md shadow-md"
            />
          </div>

          <SLRDiteAdj data={slrRes?.groupwise_data || []} />

          <SLREduIn data={slrRes?.educational_insights || []} />

          <SLRNotDetected data={slrRes?.not_detected_results || []} />

          <div className="mt-8  ">
            <h2 className="text-xl font-semibold mb-2">
              💬 Your Opinion Matters
            </h2>
            <p className="text-gray-700 mb-4">
              We are the first of our kind in the industry, and we had love to
              hear how we did to help you understand your health better. Do
              share your thoughts using the feedback link below or simply drop
              us a note on our social media pages. Every word goes a long way in
              motivating our team and delivering better.
            </p>
            <p className="text-blue-600 font-medium mb-4">
              Feedback: 👉{" "}
              <a href="#" className="underline">
                Click Here
              </a>
            </p>
            <p className="text-gray-700 mb-2">Social Links:</p>
            <div className="flex flex-wrap gap-4 text-blue-600 font-medium">
              <a href="https://nextcare.life/" className="hover:underline">
                🔗 Facebook
              </a>
              <a href="#" className="hover:underline">
                Instagram
              </a>
              <a href="#" className="hover:underline">
                LinkedIn
              </a>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </div>
            <div className="mt-6 text-gray-800 italic">
              Your health deserves more than numbers — it deserves insight.
              <br />
              Thank you for trusting us with your care.
              <br />
              <span className="text-orange-600 font-semibold">
                🧡 Nextcare.Life — Future of Care
              </span>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SLRModal;
