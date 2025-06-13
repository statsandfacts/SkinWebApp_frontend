"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  imageUrls: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageUrls.length > 0) {
        setCurrentImage((prev) =>
          prev === imageUrls.length - 1 ? 0 : prev + 1
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [imageUrls]);

  return (
    <div className="w-[400px] flex flex-col items-center">
      <div className="relative overflow-hidden flex justify-center items-center">
        <Image
          src={imageUrls[currentImage]}
          alt={`Slide ${currentImage + 1}`}
          className="object-contain p-2"
          width={350}
          height={350}
        />
      </div>

      <div className="flex justify-center mt-2 space-x-1">
        {imageUrls.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentImage ? "bg-sky-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
