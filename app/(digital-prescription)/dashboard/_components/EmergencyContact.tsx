"use client";
import { useEffect, useState } from "react";
import { AlertCircle, Phone, Plus, CheckCircle } from "lucide-react";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { updateUser } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import BackButton from "@/components/common/BackButton";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import Loader from "@/components/Loader";

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
        toast.error(error?.message || "Emergency Contact Updated Failed!");
      })
      .finally(() => setIsLoading(false));
  };

  const handleEmergencyCall = () => {
    if (!dashboardData?.emergency_contact) {
      toast.error("Emergency contact not found.");
      return;
    }
    window.location.href = `tel:${dashboardData?.emergency_contact}`;
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
            onClick={handleEmergencyCall}
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
        </>
      )}
    </div>
  );
};

export default EmergencyContact;
