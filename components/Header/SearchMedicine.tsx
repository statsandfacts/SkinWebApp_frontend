"use client";
import { setIsTestSearchModal } from "@/redux/slices/digitalPrescription/drug.slice";
import { baseUrl } from "@/services/api.digitalPrescription.service";
import axios from "axios";
import debounce from "lodash.debounce";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface Medicine {
  name: string;
  salt_composition: string;
  manufacturers: string;
  ProductForm: string;
  use_of: string;
  Id: string | null;
}

interface SearchMedicinePortalProps {
  name?: string;
  boxStyle?: string | {};
}

const SearchMedicinePortal: React.FC<SearchMedicinePortalProps> = ({
  name,
  boxStyle={},
}) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchOptions = async (input: string) => {
    if (input.length >= 3) {
      setIsLoading(true);
      try {
        let url = `${baseUrl}drug/search?name=${input}`;
        if (name === "investigation") {
          url = `${baseUrl}investigation/search?name=${input}`;
        } else if (name === "composition") {
          url = `${baseUrl}drug/search?composition=${input}`;
        }

        const response = await axios.get(url);
        let result = [];
        if (name !== "investigation") {
          result = response.data.search_result;
        } else {
          result = [response.data?.details];
        }
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
    if (name === "investigation") {
      router.push(`/investigation/${medicine?.Id}`);
      dispatch(setIsTestSearchModal(false));
    } else {
      router.push(`/prescription/${medicine?.Id}`);
    }
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative x-4 mx-4">
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={`Search for ${name ? name : "Medicine"}`}
          className="p-2 border border-gray-300 text-sm font-light rounded-md w-full min-w-28"
        />
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          style={boxStyle}
          className={`absolute left-0 ${
            name !== "investigation"
              ? "lg:left-[0]] min-h-[15rem]"
              : "h-full left-[-9px] min-h-[6rem]"
          } w-full lg:w-96 mt-2 p-1 bg-white border border-slate-300 rounded-md max-h-96 z-10 overflow-y-auto shadow-xl`}
        >
          {isLoading ? (
            <div className="flex justify-center h-full items-center">
              <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
            </div>
          ) : filteredMedicines?.length > 0 ? (
            filteredMedicines?.map((medicine, index) => (
              <button
                className="text-sm text-slate-500 p-2 border-b-1 w-full text-left"
                key={index}
                onClick={() => HandleClick(medicine)}
              >
                {medicine?.name} <br />
                <small className="text-slate-400">
                  {medicine?.salt_composition}
                </small>
              </button>
            ))
          ) : (
            <div className="p-4 text-slate-500 text-center">
              {`No ${name ? name : "medicine"} found for ${searchQuery}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMedicinePortal;
