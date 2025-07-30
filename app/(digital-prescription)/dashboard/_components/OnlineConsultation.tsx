"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import type { AppDispatch } from "@/redux/store";
import {
  addSymptom,
  clearSymptoms,
} from "@/redux/slices/digitalPrescription/symptoms.slice";
import BackButton from "@/components/common/BackButton";
import { toast } from "react-toastify";

const OnlineConsultation = () => {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  const addSymptomHandler = (symptom: string) => {
    if (!symptom.trim()) return;
    dispatch(clearSymptoms());
    dispatch(addSymptom(symptom.trim()));
    setSearch("");
  };

  const handleProceed = () => {
    if (search.trim()) addSymptomHandler(search);
    setIsModalOpen(true);
  };

  const handleNotify = () => {
    if (!email.trim() || !email.includes("@")) {
     toast.error("Please enter a valid email address.");
      return;
    }

    console.log("Notify Me email submitted:", email);
    setEmail("");
    setIsModalOpen(false);
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

      {isModalOpen && (
        <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 text-center rounded-md border border-yellow-200">
          <p>
            No doctors are currently available for online or offline
            consultation. Please submit your Email ID, and we’ll notify you as
            soon as appointments open.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full mt-4 px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleNotify}
            className="mt-3 bg-primary text-white px-6 py-2 rounded "
          >
            Notify Me
          </button>
        </div>
      )}
    </div>
  );
};

export default OnlineConsultation;
