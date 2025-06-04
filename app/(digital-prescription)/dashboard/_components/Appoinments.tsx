"use client";
import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import { Button } from "@heroui/button";
import BackButton from "@/components/common/BackButton";
import BookAppoinmentModel from "./BookAppoinmentModel";
const Appoinments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    setIsModalOpen(false);
    setIsAccepted(false); 
  };

  return (
    <>
      <div className="flex flex-col items-center bg-white mt-5">
        <div className="flex justify-start w-full max-w-sm sm:max-w-7xl">
          <BackButton />
        </div>

        <div className="w-full bg-gray-50 rounded-lg shadow-sm p-3 mb-10 flex flex-col justify-center items-center max-w-sm sm:max-w-7xl">
          <HeartHandshake className="w-10 h-10 text-sky-600 group-hover:text-sky-700 transition-all duration-500 transform group-hover:translate-y-[-8px] group-hover:scale-110 animate-bounce" />
          <p className="text-center text-gray-700 mt-2">
            Get expert medical advice in minutes
          </p>
          <Button
            color="primary"
            className="rounded-lg mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            Book Appointment
          </Button>
        </div>

        <BookAppoinmentModel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isAccepted={isAccepted}
          setIsAccepted={setIsAccepted}
        />
      </div>
    </>
  );
};

export default Appoinments;
