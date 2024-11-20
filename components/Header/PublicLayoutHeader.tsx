"use client";
import React from "react";
import Image from "next/image";

interface HeaderProps {
  header: string;
  subHeader: string;
  imageURL: string;
}

const CustomHeader: React.FC<HeaderProps> = ({
  header,
  subHeader,
  imageURL,
}) => {
  return (
    <header className="relative mb-6 min-h-[16rem] w-full py-2 px-12 rounded-lg shadow-lg bg-gradient-to-r from-sky-700 via-sky-500 to-cyan-700 animate-fade-in flex flex-col md:flex-row items-center">
      <div className="absolute inset-0 bg-opacity-20 bg-white rounded-lg pointer-events-none"></div>
      <div className="relative text-center md:text-left md:flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          {header}
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-2xl text-white/90 font-medium leading-relaxed">
          {subHeader}
        </p>
      </div>
      <div className="relative mt-6 md:mt-0 md:ml-8 flex-shrink-0">
        <Image
          src={imageURL}
          alt="Header Illustration"
          width={250}
          height={250}
        />
      </div>
    </header>
  );
};

export default CustomHeader;
