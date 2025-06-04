"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSymptom } from "@/redux/slices/digitalPrescription/symptoms.slice";
import { getAllDoctors } from "@/services/api.digitalPrescription.service";
import BackButton from "@/components/common/BackButton";
import DoctorModal from "./DoctorListModal";

const OnlineConsultation = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const addSymptomHandler = (symptom: string) => {
    if (!symptom.trim()) return;
    dispatch(addSymptom(symptom.trim()));
    setSearch(""); // Optionally clear input
  };

  const handleProceed = async () => {
    // Add symptom ONLY on proceed
    if (search.trim()) {
      addSymptomHandler(search);
    }

    try {
      const response = await getAllDoctors();
      const mappedDoctors = (response || []).map((doc: any) => ({
        id: doc.doctor_id,
        name: doc.name,
        specialization: doc.doctor_specialization,
        price: Number(doc.doctor_consulting_price),
      }));
      setDoctors(mappedDoctors);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 font-sans mt-5">
      <h2 className="text-xl font-semibold mb-1">Tell us your symptoms</h2>
      <p className="text-sm text-gray-600 mb-5">
        Please type the symptom you are suffering from in the field below.
      </p>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter the symptom you are experiencing"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 mt-5"
      />

      <div className="flex justify-between items-center mt-5">
        <BackButton />

        <div className="flex gap-3 mt-5">
          <button
            className="bg-red-100 text-red-400 text-sm px-4 py-2 rounded"
            onClick={handleProceed}
          >
            Skip to specialties
          </button>
          <button
            className="bg-primary text-white text-sm px-6 py-2 rounded"
            onClick={handleProceed}
          >
            Proceed
          </button>
        </div>
      </div>

      {isModalOpen && (
        <DoctorModal doctors={doctors} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default OnlineConsultation;
