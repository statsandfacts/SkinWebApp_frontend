import React from 'react';

const notDetectedParameters = [
  'Glucose',
  'RBC',
  'Ketone',
  'WBC',
  'Culture & Sensitivity',
  'AFB',
];

export default function NonDetectedParameter() {
  return (
    <div className="p-6 justify-center items-center ml-40">
      <h2 className="text-2xl font-semibold text-center text-primary mb-6">
        Not detected Parameters
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
        {notDetectedParameters.map((param) => (
          <div
            key={param}
            className="bg-blue-100 rounded-2xl shadow-lg w-48 h-32 flex flex-col justify-center items-center"
          >
            <p className="font-bold text-primary text-lg">{param}</p>
            <p className="text-gray-700 text-lg">Not detected</p>
          </div>
        ))}
      </div>
    </div>
  );
}
