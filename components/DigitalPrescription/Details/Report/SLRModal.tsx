"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setViewSmartLabReportModal } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import Image from "next/image";
import {
  SLRDiteAdj,
  SLREduIn,
  SLRGrpExp,
  SLRNotDetected,
  SLRParExp,
} from "./index";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import FontAwesomeXIcon from "@/components/SvgIcon/FontAwesomeXIcon";

const SLRModal = () => {
  const dispatch = useDispatch();
  const { userDetails } = useAuthInfo();
  const isOpen = useSelector(
    (state: RootState) => state.digitalPrescription.viewSmartLabReportModal
  );
  const { singlePrescriptionDetails } = useSelector(
    (state: any) => state.digitalPrescription
  );

  console.log("userDetails=========", userDetails);

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
                <li>
                  Name:{" "}
                  <span className="capitalize font-bold">
                    {userDetails?.name}
                  </span>
                </li>
                <li>
                  Gender:{" "}
                  <span className="capitalize font-bold">
                    {userDetails?.gender}
                  </span>
                </li>
                {/* <li>Lab ID: xxxxxxxxxxxxxxx</li>
                <li>Test Date: xxxxxxxxxxxxxxxxx</li> */}
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

            <div className="text-xs text-slate-500 pl-4 mt-2 pb-3 italic">
              *This summary is based only on your blood and urine test results.
              It does not include findings from X-ray, MRI, CT scan, Stool test,
              ECG, or EEG. (Warnings)
            </div>

            <SLRGrpExp data={slrRes?.grouped_results || []} />

            <SLRParExp data={slrRes?.smartlab_data || []} />
          </div>
          {/* <div className="ml-6 mt-4">
            <Image
              id="hemoglobin-chart"
              src="/smartlabreports/chat_img.jpeg"
              alt="Hemoglobin Chart"
              width={600}
              height={400}
              className="rounded-md shadow-md"
            />
          </div> */}

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
            {/* <p className="text-blue-600 font-medium mb-4">
              Feedback: 👉{" "}
              <a href="#" className="underline">
                Click Here
              </a>
            </p> */}
            <p className="text-gray-700 mb-2">Social Links:</p>
            <div className="flex items-center gap-4 py-2 mt-4">
              <Link
                href="https://www.linkedin.com/company/nextcare-life/"
                className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com/NextcareLife"
                className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
              >
                <FontAwesomeXIcon color="#ffffff" height={16} width={16} />
              </Link>
              <Link
                href="https://www.instagram.com/nextcare.life?igsh=MTdkMjg5M2s2NmRobA%3D%3D&utm_source=qr"
                className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.facebook.com/share/19dqeCuNou/?mibextid=wwXIfr"
                className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.youtube.com/@NCL24283"
                className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 text-gray-800 italic">
              Your health deserves more than numbers — it deserves insight.
              <br />
              Thank you for trusting us with your care.
              <br />
              <span className="text-sky-800 font-semibold">
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
