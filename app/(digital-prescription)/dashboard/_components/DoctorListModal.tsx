"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CircleX } from "lucide-react";

export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  price: number;
};

type DoctorModalProps = {
  doctors: Doctor[];
  onClose: () => void;
};

const DoctorModal: React.FC<DoctorModalProps> = ({ doctors, onClose }) => {
  const router = useRouter();

  const handleDoctorClick = (doctorId: string) => {
    onClose(); 
    const query = new URLSearchParams({ doctor: doctorId }).toString();
    router.push(`/dashboard/appoinment/calendar?${query}`);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Available Doctors</h3>
          <button onClick={onClose} aria-label="Close">
            <CircleX className="text-gray-600 hover:text-black" />
          </button>
        </div>

        {doctors.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">
            No doctors available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="border p-6 rounded shadow-sm hover:shadow-md cursor-pointer"
                onClick={() => handleDoctorClick(doc.id)}
              >
                <h4 className="font-medium text-lg">{doc.name}</h4>
                <p className="text-sm text-gray-600">
                  Specialization: {doc.specialization}
                </p>
                <p className="text-sm text-gray-600">
                  Price:{" "}
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 0,
                  }).format(doc.price)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorModal;
