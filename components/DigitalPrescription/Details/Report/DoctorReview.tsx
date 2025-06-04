import React from 'react';
import Image from 'next/image';

export default function DoctorReview() {
  return (
    <div className="flex items-center justify-between p-6 rounded-2xl shadow-md bg-white w-full max-w-5xl h-32">

      <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-lg text-gray-700 w-full">
        {/* Column 1 */}
        <div className="flex flex-col space-y-1">
          <div>
            <span className="font-semibold text-gray-500">Lab Test ID:</span>{' '}
            <span className="text-blue-600 cursor-pointer">123456</span>
          </div>
          <div>
            <span className="font-semibold text-gray-500">Test Date:</span>{' '}
            <span className="text-blue-600">17 Mar, 12:05PM</span>
          </div>
          <div>
            <span className="font-semibold text-gray-500">Report Date:</span>{' '}
            <span className="text-blue-600">22 Mar, 02:05PM</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col space-y-1">
          <div>
            <span className="font-semibold text-gray-500">Name:</span>{' '}
            <span className="text-blue-600">Sidharth M</span>
          </div>
          <div>
            <span className="font-semibold text-gray-500">Age:</span>{' '}
            <span className="text-blue-600">35 Years</span>
          </div>
          <div>
            <span className="font-semibold text-gray-500">Sex:</span>{' '}
            <span className="text-blue-600">Male</span>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col space-y-1">
          <div>
            <span className="font-semibold text-gray-500">Lab:</span>{' '}
            <span className="text-blue-600">Apollo Diagnostics</span>
          </div>
          <div>
            <span className="font-semibold text-gray-500">Pathologist:</span>{' '}
            <span className="text-blue-600">Dr. A. Verma</span>
          </div>
          <div>
            <span className="text-blue-600">DK, MD</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-6">
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
