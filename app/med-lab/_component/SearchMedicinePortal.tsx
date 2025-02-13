"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Medicine {
  Id: string;
  name: string;
  salt_composition: string;
  ProductForm: string;
  use_of: string;
  manufacturers: string;
  Dosage: string;
}

const SearchMedicinePortal: React.FC<{
  name: "medicine" | "investigation";
}> = ({ name }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDrugDetails = async (input: string) => {
    if (input.length < 3) {
      setFilteredResults([]);
      return;
    }

    setIsLoading(true);
    try {
      let url =
        name === "medicine"
          ? `https://nextcare.life:8000/api/stage1/drug/search?name=${input}`
          : `https://nextcare.life:8000/api/stage1/investigation/search?name=${input}`;

      const response = await axios.get(url);
      setFilteredResults(response.data?.search_result || []);
    } catch (error) {
      // toast.error("Error fetching search results.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchDrugDetails(query);
  };

  useEffect(() => {
    setSearchQuery("");
    setFilteredResults([]);
  }, [name]);

  const handleArrowClick = (item: Medicine) => {
    const changeRoute = name === "medicine" ? "prescription" : "investigation";
    router.push(`/${changeRoute}/${item.Id}`);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={`Search for ${name}`}
          className="p-2 border border-gray-300 text-sm font-light rounded-md w-full mb-4 max-w-4xl"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <button
                key={index}
                className="border p-4 rounded-md shadow-md hover:shadow-lg text-left transition-all cursor-pointer"
                onClick={() => handleArrowClick(item)}
              >
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.salt_composition}</p>
                <p className="text-sm text-gray-500">Use: {item.use_of}</p>
                <p className="text-sm text-gray-500">
                  Manufacturers: {item.manufacturers}
                </p>
                <p className="text-sm text-gray-500">Dosage: {item.Dosage}</p>

                {/* <div
                  className="text-right text-gray-500 mt-2 cursor-pointer"
                  onClick={() => handleArrowClick(item)}
                ></div> */}
              </button>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMedicinePortal;
