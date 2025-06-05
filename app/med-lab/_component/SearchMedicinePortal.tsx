"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { baseUrl } from "@/services/api.digitalPrescription.service";
import { drugUrl, investigationUrl } from "@/services/urls.service";

interface Medicine {
  Id?: string;
  name?: string;
  description?: string;
  salt_composition?: string;
  ProductForm?: string;
  use_of?: string;
  manufacturers?: string;
  Dosage?: string;
  mrp?: string;
  image_urls?: string;
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
        name === "medicine" ? drugUrl + input : investigationUrl + input;

      const response = await axios.get(url);
      if (name === "medicine") {
        setFilteredResults(response.data?.search_result || []);
      } else {
        const result = response.data?.details ? [response.data?.details] : [];
        setFilteredResults(result);
      }
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
    <div className="w-full max-w-3xl">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder={`Search for ${name}`}
        className="p-4 border border-gray-300 text-sm font-light rounded-full mb-4 mt-3 w-full bg-sky-100 focus:outline-none"
      />

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
                <div className="w-full h-40 flex items-center justify-center bg-white rounded-lg overflow-hidden border">
                  {item.image_urls && item.image_urls.length > 0 ? (
                    <Image
                      src={item.image_urls[0]}
                      alt={item.name || "Medicine Image"}
                      width={400}
                      height={200}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">No preview</div>
                  )}
                </div>

                <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
                {name === "medicine" ? (
                  <>
                    <p className="text-sm text-gray-500">
                      {item.salt_composition}
                    </p>
                    <p className="text-sm text-gray-500">Use: {item.use_of}</p>
                    <p className="text-sm text-gray-500">
                      Manufacturers: {item.manufacturers}
                    </p>
                    <p className="text-sm text-gray-500">
                      Dosage: {item.Dosage}
                    </p>
                    <p className="text-sm text-gray-500">Price: ₹{item.mrp}</p>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">{item.description}</p>
                )}
              </button>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 mt-5"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMedicinePortal;
