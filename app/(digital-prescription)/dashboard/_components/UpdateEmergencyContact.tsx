"use client";
import { useEffect, useState } from "react";
import { AlertCircle, Phone, Plus } from "lucide-react";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { updateUser } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";

import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";



interface UpdateEmergency {
  phone: string;
}

const UpdateEmergency = () => {
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
          toast.error(error?.message || "Emergency Contact Update Failed!");
        })
        .finally(() => setIsLoading(false));
    };
  
    return (
    <div className=" mt-20 flex flex-col justify-center items-center  cursor-pointer">
        
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg justify-center">
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
    </div>
  );
};

export default UpdateEmergency;
