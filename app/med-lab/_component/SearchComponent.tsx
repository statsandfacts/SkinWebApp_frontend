"use client";

import { useState } from "react";
import SearchMedicinePortal from "./SearchMedicinePortal";

const SearchComponent = () => {
  const [selectedSearch, setSelectedSearch] = useState<
    "medicine" | "investigation"
  >("medicine");

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6">
      <div className="flex justify-center gap-5 md:gap-10 w-full max-w-5xl mb-4">
        <div
          className={`flex-1 text-center p-3 h-fit md:p-6 cursor-pointer transition-all duration-300 shadow-lg rounded-tl-xl rounded-tr-xl ${
            selectedSearch === "medicine"
              ? "bg-sky-800 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setSelectedSearch("medicine")}
        >
          <h2 className="text-sm md:text-xl font-semibold">Search Medicine</h2>
        </div>

        {/* Lab Investigation Tab */}
        <div
          className={`flex-1 text-center p-3 h-fit md:p-6 cursor-pointer transition-all duration-300 shadow-lg rounded-tl-xl rounded-tr-xl ${
            selectedSearch === "investigation"
              ? "bg-sky-800 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setSelectedSearch("investigation")}
        >
          <h2 className="text-sm md:text-xl font-semibold">
            Search Lab Investigation
          </h2>
        </div>
      </div>

      <SearchMedicinePortal name={selectedSearch} />
    </div>
  );
};

export default SearchComponent;
