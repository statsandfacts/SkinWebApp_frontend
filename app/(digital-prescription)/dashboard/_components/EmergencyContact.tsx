"use client";
import { useState } from "react";
import { AlertCircle, Phone, Plus, CheckCircle } from "lucide-react";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { updateUser } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import BackButton from "@/components/common/BackButton";

interface EmergencyContact {
  phone: string;
}

const EmergencyContact = () => {
  const { userDetails, userId } = useAuthInfo();
  const [contact, setContact] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSaveContact = () => {
    if (!contact) {
      toast.error("Please enter emergency contact");
      return;
    }
    setLoading(true);
    updateUser({
      user_id: userId,
      emergency_contact: contact,
    })
      .then((response) => {
        toast.success("Emergency Contact Updated");
      })
      .catch((error) => {
        toast.error(error?.message || "Emergency Contact Updated Failed!");
      })
      .finally(() => setLoading(false));
  };

  const handleEmergencyCall = (emergencyContactNumber: any) => {
    if (!emergencyContactNumber) {
      toast.error;
    }
    window.location.href = `tel:${emergencyContactNumber}`;
  };

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <div className="flex justify-start w-full max-w-7xl">
        <BackButton />
      </div>
      <div
        className="w-full bg-gray-50 rounded-lg shadow-sm shadow-red-100 p-6 mb-10 flex flex-col justify-center items-center max-w-7xl cursor-pointer"
        onClick={handleEmergencyCall}
      >
        <div className="flex flex-col justify-center items-center text-center">
          <div className="flex justify-center items-center">
            <Phone className="w-10 h-10 text-red-600 transition-all duration-300 transform animate-bounce" />
          </div>
          <div className="mt-4 text-lg font-semibold text-slate-700">
            Call Emergency Contact
          </div>
          {/* TODO: ADD EMERGENCY CONTACT HERE */}
          <div className="mt-2 text-sm text-slate-500">
            Tap to call {} for urgent.
          </div>
        </div>
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
          <AlertCircle className="text-red-600" size={28} />
          Emergency Contact
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Phone className="text-gray-600" size={20} />
            <input
              type="tel"
              name="phone"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
            />
          </div>
          <Button
            onClick={handleSaveContact}
            color="primary"
            className="w-full rounded-lg"
            isLoading={loading}
          >
            <Plus size={20} />
            {userDetails?.emergency_contact ? "Update Contact" : "Save Contact"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
