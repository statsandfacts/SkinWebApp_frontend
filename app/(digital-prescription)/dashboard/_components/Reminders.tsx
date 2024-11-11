"use client";
import BackButton from "@/components/common/BackButton";
import AddReminderModal from "@/components/DigitalPrescription/Details/Reminder/AddReminderModal";
import { setIsReminderModal } from "@/redux/slices/digitalPrescription/drug.slice";
import { AppDispatch } from "@/redux/store";
import { Button } from "@nextui-org/button";
import { Bell, PlusIcon } from "lucide-react"; // Use a reminder icon, e.g., a bell
import React from "react";
import { useDispatch } from "react-redux";

const Reminders = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="flex flex-col items-center bg-white mt-2">
        <div className="flex justify-start w-full max-w-7xl">
          <BackButton />
        </div>

        <div className="w-full bg-gray-50 rounded-lg shadow-sm p-3 mb-10 flex flex-col justify-center items-center max-w-7xl">
          <div className="flex justify-center items-center mt-2">
            <Bell className="w-10 h-10 text-sky-600 group-hover:text-sky-700 transition-all duration-500 transform group-hover:translate-y-[-8px] group-hover:scale-110 animate-bounce" />
          </div>
          <div className="text-lg font-semibold text-slate-700 group-hover:text-sky-700 transition-all duration-500 ease-in-out group-hover:translate-y-[-8px]">
            Set Medicine Reminder
          </div>
          <div className="text-sm text-slate-500 group-hover:text-sky-600 transition-all duration-500 ease-in-out group-hover:translate-y-[-8px]">
            Receive timely reminders for your medication schedule.
          </div>
          <div className="mt-2">
            <Button
              color="primary"
              className="rounded-lg"
              onPress={() => {
                dispatch(setIsReminderModal(true));
              }}
            >
              Set Reminder
              <PlusIcon className="h-5 w-5" />{" "}
            </Button>
          </div>
        </div>
      </div>

      <AddReminderModal />
    </>
  );
};

export default Reminders;
