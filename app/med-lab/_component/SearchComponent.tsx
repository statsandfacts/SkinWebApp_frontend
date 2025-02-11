"use client";

import { useState } from "react";
import SearchMedicinePortal from "./SearchMedicinePortal";

const SearchComponent = () => {
  const [selectedSearch, setSelectedSearch] = useState<"medicine" | "investigation">("medicine");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Search Medicines & Lab Investigations</h1>

      {/* Tabs Container */}
      <div className="flex justify-center gap-10 w-full max-w-5xl mb-8">
        {/* Medicine Tab */}
        <div
          className={`flex-1 text-center p-6 cursor-pointer transition-all duration-300 shadow-lg rounded-tl-xl rounded-tr-xl ${
            selectedSearch === "medicine"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setSelectedSearch("medicine")}
        >
          <h2 className="text-xl font-semibold">Search Medicine</h2>
        </div>

        {/* Lab Investigation Tab */}
        <div
          className={`flex-1 text-center p-6 cursor-pointer transition-all duration-300 shadow-lg rounded-tl-xl rounded-tr-xl ${
            selectedSearch === "investigation"
              ? "bg-green-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setSelectedSearch("investigation")}
        >
          <h2 className="text-xl font-semibold">Search Lab Investigation</h2>
        </div>
      </div>

      {/* Show Search Portal and Grid Below */}
      <SearchMedicinePortal name={selectedSearch} />
    </div>
  );
};

export default SearchComponent;
