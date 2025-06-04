"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/common/BackButton";
import { toast } from "react-toastify";
import { getAvailabilityByDoctorId } from "@/services/api.digitalPrescription.service";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function CalendarPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const doctorId = searchParams.get("doctor") || "";

  const doctorName = searchParams.get("name");

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userPreferredTime, setUserPreferredTime] = useState("");
  const [availability, setAvailability] = useState<Record<string, { in_time: string; out_time: string }[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
useEffect(() => {
  const fetchAvailability = async () => {
    try {
      setIsLoading(true);
      const data = await getAvailabilityByDoctorId(doctorId);

      const formatted: Record<string, { in_time: string; out_time: string }[]> = {};
      data.forEach((entry: { date: string; in_time: string; out_time: string }) => {
        if (!formatted[entry.date]) {
          formatted[entry.date] = [];
        }
        formatted[entry.date].push({
          in_time: entry.in_time,
          out_time: entry.out_time,
        });
      });

      setAvailability(formatted);
    } catch (error) {
      console.error("Error fetching availability:", error);
      toast.error("Failed to fetch doctor availability.");
    } finally {
      setIsLoading(false);
    }
  };

  if (doctorId) {
    fetchAvailability();
  }
}, [doctorId]);


  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
    setIsModalOpen(true);
    setUserPreferredTime("");
  };

  const getAvailability = (date: Date) => {
    const key = formatDate(date);
    return availability[key] || [];
  };

  const isAvailable = (date: Date) => {
    const key = formatDate(date);
    return !!availability[key];
  };

  const handleConfirm = () => {
    if (!userPreferredTime) {
      toast.warn("Please enter your preferred time.");
      return;
    }

    const query = new URLSearchParams({
  doctor: doctorId,
  
  date: selectedDate?.toISOString() || "",
  time: userPreferredTime,
   
});


    router.push(`/dashboard/appoinment/confirmation?${query.toString()}`);

    toast.success(`Preferred time submitted: ${userPreferredTime} on ${selectedDate?.toDateString()}`);
    setIsModalOpen(false);
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", {
    month: "long",
  });

  if (isLoading) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Loading availability...</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto relative">
      <h2 className="text-2xl font-semibold mb-6">Availability for {doctorName}</h2>

      {/* Month Controls */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          &lt; Prev
        </button>
        <span className="font-semibold text-lg">{monthName} {currentYear}</span>
        <button onClick={handleNextMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Next &gt;
        </button>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const date = new Date(currentYear, currentMonth, day);
          const available = isAvailable(date);

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`border rounded p-2 text-center transition-all flex flex-col items-center justify-center ${
                available
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-white hover:bg-blue-100"
              }`}
            >
              <span className="text-base font-medium">{day}</span>
              {available && <span className="text-xs mt-1">Available</span>}
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-4">
              Available Times on {selectedDate.toDateString()}
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {getAvailability(selectedDate).length > 0 ? (
                getAvailability(selectedDate).map((slot, idx) => (
                  <li key={idx}>{slot.in_time} - {slot.out_time}</li>
                ))
              ) : (
                <li>No available slots</li>
              )}
            </ul>

            {/* User Input */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Your Preferred Time:
            </label>
            <input
              type="text"
              placeholder="e.g. 3:00 PM"
              value={userPreferredTime}
              onChange={(e) => setUserPreferredTime(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-start mt-5">
        <BackButton />
      </div>
    </div>
  );
}
