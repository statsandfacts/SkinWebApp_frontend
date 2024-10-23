import { baseUrl } from "@/services/api.digitalPrescription.service";
import axios from "axios";
import debounce from "lodash.debounce";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface Medicine {
  name: string;
  salt_composition: string;
  manufacturers: string;
  ProductForm: string;
  use_of: string;
}

interface SearchMedicinePortalProps {
  selectedName: string;
  handleOnChange: (query: any) => void;
}

const SearchMedicinePortal: React.FC<SearchMedicinePortalProps> = ({
  selectedName,
  handleOnChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setSearchQuery(selectedName);
  }, [selectedName]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchOptions = async (input: string) => {
    if (input.length >= 3) {
      setIsLoading(true);
      try {
        let url = `${baseUrl}drug/search?name=${input}`;

        const response = await axios.get(url);
        const result = response.data.search_result;
        setFilteredMedicines(result);
      } catch (error) {
        toast.error("Getting Error At The Time Of Search Medicine.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setFilteredMedicines([]);
    }
  };

  const debouncedFetchOptions = debounce(fetchOptions, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchOptions(query);
    handleOnChange({ name: query });
    setIsDropdownOpen(query.length > 0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const HandleClick = (medicine: Medicine) => {
    setIsDropdownOpen(false);
    handleOnChange(medicine);
  };

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search Medicine"
          className="border border-gray-300 rounded-md w-full min-w-28 uppercase p-3"
        />
      </div>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-12 left-0 bg-white border border-sky-300 rounded-md mt-2 h-60 z-10 w-full overflow-auto shadow-xl"
        >
          {isLoading ? (
            <p className="w-full text-center text-sky-600">Searching ....</p>
          ) : filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine, index) => (
              <div
                key={index}
                className="p-4 border-b grid grid-cols-5 w-[40rem] cursor-pointer border-gray-300"
                onClick={() => HandleClick(medicine)}
              >
                <p className="text-sm text-slate-500 col-span-1">
                  <strong>Name:</strong> {medicine?.name}
                </p>
                <p className="text-sm text-slate-500 col-span-1">
                  <strong>Composition:</strong> {medicine?.salt_composition}
                </p>
                <p className="text-sm text-slate-500 col-span-1">
                  <strong>Manufacturer:</strong> {medicine?.manufacturers}
                </p>
                <p className="text-sm text-slate-500 col-span-1">
                  <strong>Product Form:</strong> {medicine?.ProductForm}
                </p>
                <p className="text-sm text-slate-500 col-span-1">
                  <strong>Use:</strong> {medicine?.use_of}
                </p>
              </div>
            ))
          ) : (
            <div className="p-4 text-slate-500 text-center">
              No medicine found for {searchQuery}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMedicinePortal;
