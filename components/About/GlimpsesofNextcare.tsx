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
        {/* First Column with 3 Images */}
        <div className="flex flex-col gap-6">
          <Image
            src={imagePaths[0]}
            alt="Nextcare Glimpse 1"
            width={500}
            height={300}
            className="rounded-lg"
          />
          <Image
            src={imagePaths[1]}
            alt="Nextcare Glimpse 2"
            width={500}
            height={300}
            className="rounded-lg"
          />
          <Image
            src={imagePaths[2]}
            alt="Nextcare Glimpse 3"
            width={500}
            height={300}
            className="rounded-lg"
          />
        </div>
        {/* Second Column with 2 Images */}
        <div className="flex flex-col gap-6 mt-12">
          <Image
            src={imagePaths[3]}
            alt="Nextcare Glimpse 4"
            width={500}
            height={300}
            className="rounded-lg"
          />
          <Image
            src={imagePaths[4]}
            alt="Nextcare Glimpse 5"
            width={500}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Glimpsesofnextcare;
