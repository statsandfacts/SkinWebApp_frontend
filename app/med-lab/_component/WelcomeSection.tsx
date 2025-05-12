import React from "react";
import Image from "next/image";

export default function WelcomeSection() {
  return (
    <div className="text-center p-6 w-3/4">
      <h2 className="text-primary font-semibold text-3xl rounded">
        Welcome to your personal health assistant at Nextcare.Life!
      </h2>
      <p className="text-black font-light text-2xl text-center">
        Whether you’re trying to understand a medicine prescribed by your
        doctor, find alternatives with fewer side effects, or get detailed
        instructions for lab tests, our search platform has you covered. Simply
        type in the name of a medicine or investigation, and access accurate,
        verified information instantly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 justify-center items-stretch max-w-3xl mt-3 mx-auto">
        <InfoCard
          icon="/medlabs/medicinesearch.png"
          title="Search Medicine"
          description="Know its uses, side effects, dosage, brand alternatives, common interactions, safety warnings and precautions."
        />
        <InfoCard
          icon="/medlabs/labinvestigation.png"
          title="Search Lab Investigation"
          description="Understand why a test is ordered, preparation required (like fasting), normal values, and how to interpret results."
        />
      </div>
    </div>
  );
}

interface InfoCardProps {
  icon: string;
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-primary-lite p-6 rounded-xl shadow-lg text-center flex flex-col items-center justify-between">
      <div className="w-20 h-20 rounded-full bg-cyan-200 flex items-center justify-center p-2">
        <Image src={icon} alt={`${title} Icon`} width={60} height={60} />
      </div>
      <h3 className="text-black font-bold text-xl">{title}</h3>
      <p className="text-black text-base mt-1">{description}</p>
    </div>
  );
};
