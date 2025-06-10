"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CameraPermissionModal from "./CameraPermissionModal";
import BackButton from "@/components/common/BackButton";

const AppoinmentsType = () => {
  const [mode, setMode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleClinicVisit = () => {
    setMode("Clinic Visit");
    router.push("/dashboard/appoinment/online-consultation");
  };

  const handleOnlineConsultation = () => {
    setMode("Online Consultation");
    setShowModal(true);
  };

  const handleAddMember = () => {
    toast.warning("working on progress")
  };

  return (
    <div className="relative p-6 max-w-lg mx-auto font-sans">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-1 mt-5">
        Who are you consulting for?
      </h2>
      <p className="text-sm text-gray-500 mb-6 mt-4">
        Select person you want to consult for and your preferred mode of consultation
      </p>

      {/* No Member Found */}
      <div className="flex flex-col items-center mb-4">
        <p className="text-sm text-gray-600 mt-4">
          No member found. Please add a new member
        </p>
      </div>

      {/* Add New Member */}
      <button
        onClick={handleAddMember}
        className="text-primary font-medium text-sm mb-4 flex items-center mt-4"
      >
        <span className="text-xl mr-1">+</span> Add New Member
      </button>

      {/* Mode of Consultation */}
      <div className="mb-6">
        <p className="text-sm text-gray-700 mb-2 mt-5">
          What is your preferred mode of consultation?
        </p>
        <div className="flex space-x-3 mt-5">
          <button
            onClick={handleClinicVisit}
            className="px-4 py-2 rounded text-sm font-medium bg-primary text-white"
          >
            Clinic Visit
          </button>

          <button
            onClick={handleOnlineConsultation}
            className="px-4 py-2 rounded text-sm font-medium bg-primary text-white"
          >
            Online Consultation
          </button>
        </div>

        <div className="absolute button-4 mt-8 mr-10">
          <BackButton />
        </div>
      </div>

      <CameraPermissionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default AppoinmentsType;
