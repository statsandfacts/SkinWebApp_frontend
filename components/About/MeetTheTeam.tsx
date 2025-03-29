"use client";
import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    imageSrc: "/aboutus/dr.sir.png",
    name: "Col (Dr) Surendra Ramamurthy",
    role: "Chief Medical Officer & Fouding Member",
  },
  {
    imageSrc: "/aboutus/ceo.png",
    name: "Sidharth Mohanty",
    role: "Co-founder & CEO",
  },
  {
    imageSrc: "/aboutus/kanha.png",
    name: "Kanha kumar khatua",
    role: "SDE & Fouding member",
  },
  {
    imageSrc: "/aboutus/swasata.png",
    name: "Shaswata Shrinivas Panda",
    role: "Lead Pharmacist",
  },
  {
    imageSrc: "/aboutus/ayushman.png",
    name: " Ayusman Bibhuprasad",
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
    role: "Frnotend Developer",
  },
  {
    imageSrc: "/aboutus/subash-qa.png",
    name: "Subas Lenka ",
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
    <div className="text-center p-10">
      <h1 className="text-6xl font-bold mb-4">Meet The Team</h1>
      <h3 className="text-xl font-light mb-10">
        Meet our experts, dedicated to excelling in diverse healthcare solutions
        and services
      </h3>

      <div className="grid grid-cols-3 gap-6 justify-center items-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={member.imageSrc}
              alt={member.name}
              width={150}
              height={150}
              className="rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold">{member.name}</h2>
            <h3 className="text-lg font-light">{member.role}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
