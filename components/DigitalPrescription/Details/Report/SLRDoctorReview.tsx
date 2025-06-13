import React from "react";
import Image from "next/image";
import { useAuthInfo } from "@/hooks/useAuthInfo";

export default function SLRDoctorReview() {
  const { userDetails } = useAuthInfo();

  return (
    <div className="flex items-center justify-between w-full p-3 rounded-2xl shadow-md">
      <div className="flex flex-col">
        <div>
          <span className="font-semibold text-gray-500">Name:</span>{" "}
          <span className="text-blue-600">{userDetails?.name}</span>
        </div>

        <div>
          <span className="font-semibold text-gray-500">Sex:</span>{" "}
          <span className="text-blue-600">{userDetails?.gender}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Image
          src="/aboutus/swasata.png"
          alt="SS Panda"
          width={60}
          height={60}
          className="rounded-full object-cover"
        />
        <div className="text-xs text-gray-600 text-center">
          <div className="font-medium">SS Panda</div>
          <div className="text-green-600">✔ Reviewed</div>
          <div className="text-gray-400">What is this?</div>
        </div>
      </div>
    </div>
  );
}
