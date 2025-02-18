"use client";
import { useEffect, useState } from "react";
import { AlertCircle, Phone, Plus } from "lucide-react";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { updateUser } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import BackButton from "@/components/common/BackButton";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import Loader from "@/components/Loader";
import { emergencyContact } from "@/services/api.digitalPrescription.service";

interface EmergencyContact {
  phone: string;
}

const EmergencyContact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();
  const { dashboardData, loading, error } = useSelector(
    (state: RootState) => state.userDashboard
  );

  const [contact, setContact] = useState<string>(
    dashboardData?.emergency_contact
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sendSmsLoading, setSendSmsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!dashboardData) {
      dispatch(fetchPatientDashboard(userId));
    } else {
      setContact(dashboardData?.emergency_contact);
    }
  }, [dispatch, dashboardData]);

  const handleSaveContact = () => {
    if (!contact) {
      toast.error("Please enter emergency contact");
      return;
    }
    setIsLoading(true);
    updateUser({
      user_id: userId,
      emergency_contact: contact,
    })
      .then((response) => {
        toast.success("Emergency Contact Updated");
        dispatch(fetchPatientDashboard(userId));
      })
      .catch((error) => {
        toast.error(error?.message || "Emergency Contact Update Failed!");
      })
      .finally(() => setIsLoading(false));
  };

  const handleEmergencyCall = (number: string) => {
    if (!number) {
      toast.error("Emergency contact not found.");
      return;
    }
    window.location.href = `tel:${number}`;
  };

  const handleSendSMS = async () => {
    if (!userId) {
      toast.error("User ID is not available.");
      return;
    }
    setSendSmsLoading(true);
    emergencyContact(userId)
      .then((response) => {
        toast.success("SMS sent successfully");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Failed to send SMS");
      })
      .finally(() => {
        setSendSmsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <div className="flex justify-start w-full max-w-sm sm:max-w-7xl">
        <BackButton />
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 ml-3"> Error: {error} </p>
      ) : (
        <>
          <div
            className="w-full bg-gray-50 rounded-lg shadow-sm shadow-red-100 p-6 mb-10 flex flex-col justify-center items-center max-w-sm sm:max-w-7xl cursor-pointer"
            onClick={() =>
              handleEmergencyCall(dashboardData?.emergency_contact)
            }
          >
            <div className="flex flex-col justify-center items-center text-center">
              <div className="flex justify-center items-center">
                <Phone className="w-10 h-10 text-red-600 transition-all duration-300 transform animate-bounce" />
              </div>
              <div className="mt-4 text-lg font-semibold text-slate-700">
                Call Emergency Contact
              </div>
              <div className="mt-2 text-sm text-slate-500">
                Tap to call{" "}
                <span className="text-sky-700 font-bold">
                  {dashboardData?.emergency_contact}
                </span>{" "}
                for medical emergency.
              </div>
            </div>
          </div>

          {/* New "Send SMS" Button */}
          <Button
            onClick={handleSendSMS}
            isLoading={sendSmsLoading}
            disabled={sendSmsLoading}
            color="danger"
            className="rounded-lg"
          >
            Send Emergency SMS
          </Button>

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
                isLoading={isLoading}
              >
                <Plus size={20} />
                {dashboardData?.emergency_contact
                  ? "Update Contact"
                  : "Save Contact"}
              </Button>
            </div>
          </div>

          {/* New section for Ambulance and Ayushman Bharat PMJAY */}
          <div className="mt-6 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Left side - Ambulance */}
              <div
                className="w-full md:max-w-[48%] bg-gray-50 rounded-lg shadow-sm p-4 cursor-pointer transform transition-all hover:scale-105"
                onClick={() => handleEmergencyCall("102")}
              >
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-red-600 mr-2 transition-all duration-500 transform animate-bounce" />
                  <div>
                    <div className="mt-2 text-sm font-semibold text-slate-700">
                      Ambulance
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Tap to call{" "}
                      <span className="text-sky-700 font-bold">108</span> for an
                      ambulance.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Ayushman Bharat PMJAY */}
              <div
                className="w-full md:max-w-[48%] bg-gray-50 rounded-lg shadow-sm p-4 cursor-pointer transform transition-all hover:scale-105"
                onClick={() => handleEmergencyCall("14555")}
              >
                <div className="flex items-center">
                  <Phone className="w-7 h-7 text-red-600 mr-2 transition-all duration-500 transform animate-bounce" />
                  <div>
                    <div className="mt-2 text-sm font-semibold text-slate-700">
                      Ayushman Bharat PMJAY
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Tap to call{" "}
                      <span className="text-sky-700 font-bold">14555</span> for
                      Ayushman Bharat.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmergencyContact;
