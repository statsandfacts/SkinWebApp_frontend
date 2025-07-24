"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import type { RootState, AppDispatch } from "@/redux/store";
import { fetchDoctors } from "@/redux/slices/digitalPrescription/doctors.slice";
import {
  addSymptom,
  clearSymptoms,
} from "@/redux/slices/digitalPrescription/symptoms.slice";
import DoctorModal from "./DoctorListModal";
import BackButton from "@/components/common/BackButton";

const OnlineConsultation = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const { list: doctors, loading } = useSelector(
    (state: RootState) => state.doctors
  );
  console.log("Doctors in redux store:", doctors);

  // ❌ Close modal if user navigates back or to another route
  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  const addSymptomHandler = (symptom: string) => {
    if (!symptom.trim()) return;
    dispatch(clearSymptoms()); // ✨ Reset Redux symptom state
    dispatch(addSymptom(symptom.trim())); // Add only the current value
    setSearch(""); // Clear input field UI
  };

  const handleProceed = () => {
    if (search.trim()) addSymptomHandler(search);
    dispatch(fetchDoctors());
    setSearch(""); // 🧹 Clear input immediately
    setIsModalOpen(true); // Open modal
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
        <div className="flex gap-3">
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

      {loading && <p className="mt-4 text-center">Loading doctors…</p>}

      {isModalOpen && (
        <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 text-center rounded-md border border-yellow-200">
          Currently, no doctors are available for online or offline
          consultation. Please try again later.
        </div>
      )}
    </div>
  );
};

export default OnlineConsultation;
