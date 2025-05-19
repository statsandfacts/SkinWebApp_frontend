"use client";

import { useState } from "react";
import SearchMedicinePortal from "./SearchMedicinePortal";
import WelcomeSection from "./WelcomeSection";

const SearchComponent = () => {
  const [selectedSearch, setSelectedSearch] = useState<
    "medicine" | "investigation"
  >("medicine");

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6">
      <WelcomeSection />
      <div className="flex justify-center w-1/2 gap-5 md:gap-10 max-w-3xl mb-4 mt-10">
        <div
          className={`flex-1 text-center p-3 h-fit md:p-6 cursor-pointer transition-all duration-300 shadow-lg rounded-full ${
            selectedSearch === "medicine"
              ? "bg-sky-800 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setSelectedSearch("medicine")}
        >
          <h2 className="text-light md:text-xl font-semibold">
            Search Medicine
          </h2>
        </div>

        <div
          className={`flex-1 text-center 1/2 p-3 h-fit md:p-6 cursor-pointer transition-all duration-300 shadow-lg rounded-full ${
            selectedSearch === "investigation"
              ? "bg-sky-800 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setSelectedSearch("investigation")}
        >
          <h2 className="text-light md:text-xl font-semibold">
            Search Lab Investigation
          </h2>
        </div>
      </div>

      <SearchMedicinePortal name={selectedSearch} />
    </div>
  );
};

export default SearchComponent;
