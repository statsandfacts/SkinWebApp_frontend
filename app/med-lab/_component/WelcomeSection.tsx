import React from 'react';
import Image from 'next/image'; // If using Next.js, otherwise use <img />


export default function WelcomeSection() {
  return (
    <div className="text-center p-6">
      <h2 className="text-[#025687] font-semibold text-[36px] rounded">
        Welcome to your personal health assistant at Nextcare.Life!
      </h2>
      <h2 className="text-black font-normal text-[26px] text-center">
        Whether you’re trying to understand a medicine prescribed by your doctor, find
      </h2>
      <h2 className="text-black font-normal text-[26px] text-center">
        alternatives with fewer side effects, or get detailed instructions for lab tests, our search
      </h2>
      <h2 className="text-black font-normal text-[26px] text-center">
        platform has you covered. Simply type in the name of a medicine or investigation, and
      </h2>
      <h2 className="text-black font-normal text-[26px] text-center mb-10">
        access accurate, verified information instantly.
      </h2>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-20 justify-center items-stretch max-w-2xl mx-auto">
        {/* Search Medicine Card */}
        <div className="bg-primary-lite p-6 rounded-xl shadow-lg text-center flex flex-col items-center justify-between">
          <div className="w-20 h-20 rounded-full bg-sky-200 flex items-center justify-center ">
            <Image src="/medlabs/medicinesearch.png" alt="Search Medicine Icon" width={60} height={60} />
          </div>
          <h3 className="text-black font-bold text-[20px]">Search Medicine</h3>
          <p className="text-black text-[16px] ">
          Know its uses, side effects, dosage, brand alternatives, common interactions,safety warnings and precautions.
           
          </p>
        </div>

        {/* Search Lab Investigation Card */}
        <div className=" bg-primary-lite p-6 rounded-xl shadow-lg text-center flex flex-col items-center justify-between">
          <div className="w-20 h-20 rounded-full bg-sky-200 flex items-center justify-center mb-1">
            <Image src="/medlabs/labinvestigation.png" alt="Search Lab Icon" width={60} height={60} />
          </div>
          <h3 className="text-black font-bold text-[20px]">Search Lab Investigation</h3>
          <p className="text-black text-[16px] mt-1">
            Understand why a test is ordered, preparation required (like fasting), normal values, and how to interpret results.
          </p>
        </div>
      </div>
    </div>
  );
}
