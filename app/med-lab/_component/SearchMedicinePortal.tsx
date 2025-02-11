"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// Define Medicine Type based on the API data structure
interface Medicine {
  Id: string;
  name: string;
  salt_composition: string;
  ProductForm: string;
  use_of: string;
  manufacturers: string;
  Dosage: string;
}

const SearchMedicinePortal: React.FC<{ name: "medicine" | "investigation" }> = ({ name }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // API Call for Search
  const fetchDrugDetails = async (input: string) => {
    if (input.length < 3) {
      setFilteredResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`https://nextcare.life:8000/api/stage1/drug/search?name=${input}`);
      setFilteredResults(response.data.search_result); // Assuming response contains search_result
    } catch (error) {
      toast.error("Error fetching search results.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Search Input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchDrugDetails(query);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder={`Search for ${name}`}
        className="p-2 border border-gray-300 text-sm font-light rounded-md w-full mb-6"
      />

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.length > 0 ? (
            filteredResults.map((medicine, index) => (
              <div
                key={index}
                className="border p-4 rounded-md shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold">{medicine.name}</h3>
                <p className="text-sm text-gray-500">Salt Composition: {medicine.salt_composition}</p>
                <p className="text-sm text-gray-500">Use: {medicine.use_of}</p>
                <p className="text-sm text-gray-500">Manufacturers: {medicine.manufacturers}</p>
                <p className="text-sm text-gray-500">Dosage: {medicine.Dosage}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              {`No ${name} found for "${searchQuery}"`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMedicinePortal;
