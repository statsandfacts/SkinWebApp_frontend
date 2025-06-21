import { useEffect, useState } from "react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

const SymptomSlider = ({ list }: { list: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 2;

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex + itemsPerSlide >= list.length;

  const showNext = () => {
    if (!isLastSlide) {
      setCurrentIndex((prev) => prev + itemsPerSlide);
    }
  };

  const showPrevious = () => {
    if (!isFirstSlide) {
      setCurrentIndex((prev) => prev - itemsPerSlide);
    }
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + itemsPerSlide >= list.length ? 0 : prev + itemsPerSlide
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [list.length]);

  const visibleItems = list.slice(currentIndex, currentIndex + itemsPerSlide);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-auto max-w-xl mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className=" flex justify-center items-center bg-white rounded-3xl shadow-md border border-blue-700 p-6 text-center text-gray-800 font-medium transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4 px-2">
          {!isFirstSlide ? (
            <button onClick={showPrevious}>
              <CircleChevronLeft className="w-7 h-7 text-blue-700 hover:text-blue-900" />
            </button>
          ) : (
            <div className="w-7 h-7" />
          )}
          {!isLastSlide ? (
            <button onClick={showNext}>
              <CircleChevronRight className="w-7 h-7 text-blue-700 hover:text-blue-900" />
            </button>
          ) : (
            <div className="w-7 h-7" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomSlider;
