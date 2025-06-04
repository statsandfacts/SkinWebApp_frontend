"use client";
import { RootState } from "@/redux/store"; 
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { toast } from "react-toastify";
import { bookAppointment } from "@/services/api.digitalPrescription.service";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { useDispatch, useSelector } from "react-redux";
import { clearSymptoms } from "@/redux/slices/digitalPrescription/symptoms.slice"; 


export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { userId } = useAuthInfo();
  const doctorId = searchParams.get("doctor");
  const doctorName = searchParams.get("doctorName");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const [isSubmitting, setIsSubmitting] = useState(false);
const dispatch = useDispatch();

  const symptoms = useSelector((state: RootState) => state.symptoms.symptoms);
  console.log("symptoms",symptoms)
  // Join symptoms into a single string (comma-separated)
  const purpose = symptoms.length > 0 ? symptoms.join(", ") : "General consultation";

  const handleConfirmBooking = async () => {
    if (!doctorId || !date || !time) {
      toast.warn("Missing booking details.");
      return;
    }

    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        patient_id: userId,
        doctor_id: doctorId,
        appointment_date: date?.split("T")[0],
        time: time,
        purpose: purpose, 
      };

      const res = await bookAppointment(payload);

      if (res.status === 200) {
        toast.success("Appointment booked successfully!");
        dispatch(clearSymptoms());
        router.push("/dashboard/appoinment/payments");
      } else {
        toast.error(res.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Confirm Your Appointment</h2>

        <div className="space-y-2 text-gray-700 mb-6">
          {/* <p><strong>Doctor ID:</strong> {doctorId}</p>
          <p><strong>Doctor Name:</strong> {doctorName}</p> */}
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Symptoms:</strong> {purpose}</p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleConfirmBooking}
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>

        <div className="mt-5">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
