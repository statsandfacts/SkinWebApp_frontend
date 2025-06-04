

import React from 'react';

export default function HealthScore() {
  return (
    <div className="flex items-center justify-between p-10 rounded-2xl shadow-lg bg-white w-full max-w-5xl h-40 mt-5">

      <div>
        <div className="text-2xl font-bold text-gray-800">
          Sid, your <br /> health is good.
        </div>
        <div className="text-xl text-gray-600 mt-1">
          We found 2 low risks in your health and <br />
          we have some recommendations for <br />
          your lifestyle changes.
        </div>
      </div>

      <div className="relative w-32 h-32">
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#4ade80"
            strokeWidth="10"
            fill="none"
            strokeDasharray="282.6"
            strokeDashoffset="33.91"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-green-700 font-semibold">
          <div className="text-sm">Health</div>
          <div className="text-2xl">88%</div>
        </div>
      </div>
    </div>
  );
}
