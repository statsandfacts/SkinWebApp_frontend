"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import ImageModal from "./ImageModal";

interface ImageCarouselProps {
  imageUrls: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handlePrev = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentImage((prev) =>
      prev < imageUrls.length - 1 ? prev + 1 : prev
    );
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={imageUrls}
        selectedIndex={currentImage}
        onSelect={(index) => setCurrentImage(index)}
      />

      {/* Carousel */}
      <div className="relative flex items-center justify-center w-full max-w-[700px]">
        {currentImage > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 p-1"
          >
            <CircleChevronLeft className="w-8 h-8 text-gray-700" />
          </button>
        )}

        <div
          className="relative w-full aspect-[1/1] cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={imageUrls[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            className="object-contain p-2"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>

        {currentImage < imageUrls.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 p-1"
          >
            <CircleChevronRight className="w-8 h-8 text-gray-700" />
          </button>
        )}
      </div>

      <div className="flex justify-center mt-4 space-x-1">
        {imageUrls.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`text-xl ${
              index === currentImage ? "text-sky-600" : "text-gray-400"
            }`}
          >
            &#8226;
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
