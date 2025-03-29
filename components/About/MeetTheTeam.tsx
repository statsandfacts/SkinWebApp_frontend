"use client";
import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    imageSrc: "/aboutus/dr.sir.png",
    name: "Col (Dr) Surendra Ramamurthy",
    role: "Chief Medical Officer & Founding Member",
  },
  {
    imageSrc: "/aboutus/ceo.png",
    name: "Sidharth Mohanty",
    role: "Co-founder & CEO",
  },
  {
    imageSrc: "/aboutus/kanha.png",
    name: "Kanha Kumar Khatua",
    role: "SDE & Founding Member",
  },
  {
    imageSrc: "/aboutus/swasata.png",
    name: "Shaswata Shrinivas Panda",
    role: "Lead Pharmacist",
  },
  {
    imageSrc: "/aboutus/ayushman.png",
    name: "Ayusman Bibhuprasad",
    role: "UX Designer & QA Engineer",
  },
  {
    imageSrc: "/aboutus/piyush-backend.png",
    name: "Piyush Prateem",
    role: "Backend Developer",
  },
  {
    imageSrc: "/aboutus/guru-fronted.png",
    name: "Guruprasad Rana",
    role: "Frontend Developer",
  },
  {
    imageSrc: "/aboutus/subash-qa.png",
    name: "Subas Lenka",
    role: "QA Engineer",
  },
  {
    imageSrc: "/aboutus/amiya-backend.png",
    name: "Amiya Ranjan Padhi",
    role: "Backend Developer",
  },
];

const MeetTheTeam = () => {
  return (
    <div className="text-center px-6 py-12 md:px-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Meet The Team</h1>
      <h3 className="text-lg md:text-xl font-light mb-10 max-w-3xl mx-auto">
        Meet our experts, dedicated to excelling in diverse healthcare solutions
        and services.
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <Image
              src={member.imageSrc}
              alt={member.name}
              width={150}
              height={150}
              className="rounded-full object-cover mb-4"
            />
            <h2 className="text-xl md:text-2xl font-bold">{member.name}</h2>
            <h3 className="text-base md:text-lg font-light text-gray-600">
              {member.role}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
