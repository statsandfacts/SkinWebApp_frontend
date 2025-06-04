import React from 'react';

export default function TriglycerideInsight() {
  return (
    <div className="p-4"> 
      <h2 className="text-2xl font-semibold text-green-700 mb-3">Insights</h2>

      <div className="bg-red-100 rounded-2xl p-4 border border-red-200 shadow text-gray-800 w-full max-w-lg">
        <div className="inline-block px-3 py-1 bg-orange-400 text-white text-sm rounded-md mb-2 font-semibold">
          Triglycerides: HDL ratio
        </div>
        <p className="font-semibold">Your Triglycerides: HDL ratio is Abnormal</p>
        <p className="mt-2">
          Your ratio of <span className="font-semibold">3.21</span> is slightly above the recommended threshold, suggesting that your body may not be metabolizing fats and sugars efficiently.
        </p>
      </div>
    </div>
  );
}
