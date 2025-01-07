'use client'
import React from "react";
import Image from "next/image"; 
import { IdCardIcon } from "lucide-react";

const AbhaInfoSection: React.FC = () => {
  return (
    <section className="mt-10 text-white transform hover:scale-[1.02] animate-slide-up transition-transform duration-300 ease-in-out flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <Image
          src="/digitalPrescription/abha_card_info.jpg"
          alt="What is ABHA Card?"
          className="rounded-lg shadow-md"
          width={450}
          height={450}
          priority
        />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-extrabold text-sky-800">
          What is ABHA Card?
        </h2>
        <p className="mt-4 text-lg text-slate-700">
          The ABHA Card, also known as the Health ID Card, is a digital identity
          for individuals in India’s healthcare ecosystem. It allows you to
          securely store and share your medical records with healthcare
          providers, ensuring hassle-free access to healthcare services.
        </p>
        <p className="mt-4 text-lg text-slate-700">
          With an ABHA Card, you can manage your health records digitally,
          access telemedicine services, and connect to a vast network of
          healthcare facilities across the country.
        </p>
        <p className="mt-4 text-lg text-slate-700">
          Each ABHA Card contains a unique 14-digit identification number that
          links your health records across healthcare providers, making it
          easier to access and manage your medical information anytime,
          anywhere.
        </p>

        <button
          className="mt-6 inline-flex items-center px-8 py-4 bg-white text-sky-600 font-bold text-xl rounded-lg shadow-lg hover:bg-sky-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          onClick={() => window.scrollTo({ top: 180, behavior: "smooth" })}
        >
          <IdCardIcon className="mr-3 h-6 w-6" />
          Create ABHA
        </button>
      </div>
    </section>
  );
};

export default AbhaInfoSection;
