"use client";
import React from "react";
import Image from "next/image";
import { DownloadIcon } from "lucide-react";

const DownloadAbhaCardSection: React.FC = () => {
  return (
    <section className="mt-10 text-white transform hover:scale-[1.02] animate-slide-up transition-transform duration-300 ease-in-out flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <Image
          src="/digitalPrescription/abha_download_info.jpg"
          alt="Download ABHA Card"
          className="rounded-lg shadow-md"
          width={450}
          height={450}
          priority
        />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-extrabold text-sky-800">
          How to Download ABHA Card
        </h2>
        <p className="mt-4 text-lg text-sky-700">
          To download your ABHA card online, visit the official ABHA portal at{" "}
          <a
            href="https://abdm.gov.in/"
            className="text-sky-600 hover:text-sky-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://abdm.gov.in/
          </a>
          . Log in to your ABHA account and download your ABHA card easily from
          the portal.
        </p>
        <p className="mt-4 text-lg text-sky-700">
          Alternatively, you can use the ABHA mobile app. If you haven&apos;t
          installed it yet, Android users can download it directly from the Play
          Store. Once installed, log in to your ABHA account and download your
          ABHA card on the go.
        </p>
      </div>
    </section>
  );
};

export default DownloadAbhaCardSection;
