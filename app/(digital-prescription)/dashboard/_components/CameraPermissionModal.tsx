"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CameraPermissionModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  const handleConfirm = () => {
    onClose(); // optional: close modal
    router.push("/dashboard/appoinment/online-consultation"); // ✅ navigate to your target route
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Permission Required</h2>
        <p className="text-sm text-gray-600 mb-4">
          To proceed with online consultation, your camera and microphone will be accessed.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1 rounded bg-primary text-white "
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
