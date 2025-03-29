"use client";
import React from "react";
import Image from "next/image";

const imagePaths = [
  "/aboutus/image1nextcare.png",
  "/aboutus/image2nextcare.png",
  "/aboutus/image3nextcare.png",
  "/aboutus/image4nextcare.png",
  "/aboutus/image5nextcare.png",
];

const Glimpsesofnextcare = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-10">Glimpses of Life at Nextcare</h1>
      <div className="flex justify-center gap-6">
        <div className="flex flex-col gap-6">
          {imagePaths.slice(0, 3).map((path, index) => (
            <Image
              key={index}
              src={path}
              alt={`Image ${index + 1}`}
              width={500}
              height={300}
              className="rounded-lg"
            />
          ))}
        </div>
        <div className="flex flex-col gap-6 mt-12">
          {imagePaths.slice(3, 5).map((path, index) => (
            <Image
              key={index}
              src={path}
              alt={`Image ${index + 1}`}
              width={500}
              height={300}
              className="rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Glimpsesofnextcare;
