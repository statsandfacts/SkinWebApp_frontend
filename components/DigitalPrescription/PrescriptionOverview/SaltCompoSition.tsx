"use client";
import  { useState } from "react";

import { fetchSaltComposition } from "@/services/api.digitalPrescription.service";
import { getSaltComposition } from "@/redux/slices/digitalPrescription/drug.slice";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";



const SaltCompoSition: React.FC<{ medicineName: string }> = ({
  medicineName,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.drugs
  );

  const fetchSaltComposition = useCallback(() => {
    if (medicineName) {
      dispatch(getSaltComposition(medicineName));
    }
  }, [dispatch, medicineName]);


  const [substitutes, setSubstitutes] = useState<SubstituteType[]>([]);

  const [selectedMedicineId, setSelectedMedicineId] = useState<string | null>(
    null
  );
  const [medicineDetails, setMedicineDetails] =
    useState<MedicineDetailsType | null>(null);
  const faqs = medicineDetails?.faqs ?? [];

  type FaqType = {
    Value_1: string;
    Value_2: string;
  };

  type MedicineDetailsType = {
    salt_composition: string;
    uses_and_benefits: {
      introduction: string;
    };
    how_drug_works: string;
    common_side_effect: string;
    how_to_use: string;
    faqs?: {
      Value_1: string;
      Value_2: string;
      faqs: FaqType[];
    }[];
  };

  type SubstituteType = {
    id: string;
    name: string;
    MRP: number;
    manufacturers: string;
  };

  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const defaultId = "D280098"; // Default ID
//         const data = await fetchSaltComposition(defaultId);
//         setMedicineDetails(data.drug_common_data);
//         setSubstitutes(data.substitutes);
//         if (data.substitutes.length > 0) {
//           setSelectedMedicineId(data.substitutes[0].id);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);


 const fetchDrugDetails = useCallback(() => {
    if (medicineName) {
      dispatch(getSaltComposition(medicineName));
    }
  }, [dispatch, medicineName]);

  useEffect(() => {
    fetchDrugDetails();
  }, [fetchDrugDetails]);

  

  const handleMedicineClick = (id: string) => {
    setSelectedMedicineId(id);
  };

  return (
    <div className="flex p-8 font-sans">
  {/* Medicine Information */}
  <div className="flex-[2] mr-4">
        {medicineDetails ? (
          <>
            <h2>
              INFORMATION ABOUT {medicineDetails.salt_composition.toUpperCase()} 
            </h2>
            <hr />
            <h3>Uses and Benefits</h3>
            <p>{medicineDetails.uses_and_benefits.introduction}</p>
            <h3>How {medicineDetails.salt_composition} works</h3>
            <p>{medicineDetails.how_drug_works}</p>
            <h3>Common Side Effects</h3>
            <p>{medicineDetails.common_side_effect}</p>
            <h3>How to Use</h3>
            <p>{medicineDetails.how_to_use}</p>
          </>
        ) : (
          <p>Loading medicine details...</p>
        )}
      </div>

      {/* Substitutes List */}
      <div className="flex-1 mr-4 max-h-[80vh] overflow-y-auto border border-gray-300 p-4">

        <h3 className="text-lg font-semibold mb-2">Available Substitutes</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {substitutes.map((substitute) => (
            <li
              key={substitute.id}
              onClick={() => handleMedicineClick(substitute.id)}
              
            >
              <strong>{substitute.name}</strong> - ₹{substitute.MRP} -{" "}
              {substitute.manufacturers}
            </li>
          ))}
        </ul>
      </div>

      {/* FAQs */}
      <div className="flex-1 max-h-[80vh] overflow-y-auto border border-gray-300 p-4">
        <h3 className="text-lg font-semibold mb-2">FAQs</h3>
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-md font-medium">{faq.Value_1}</h4>
              <p className="text-sm text-gray-700">{faq.Value_2}</p> 
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No FAQs available.</p>
        )}
      </div>
    </div>
  );
}

export default SaltCompoSition;
