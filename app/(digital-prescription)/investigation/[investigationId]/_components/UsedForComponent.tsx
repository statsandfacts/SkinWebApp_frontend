"use client";
import React from "react";

interface UseCase {
  value: string;
}

interface UsedForComponentProps {
  useCases: UseCase[];
}

const UsedForComponent: React.FC<UsedForComponentProps> = ({ useCases }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-sky-700 border-b pb-1 border-sky-500 mb-3">Used For</h2>
      <ul className="space-y-2">
        {useCases.length > 0 ? (
          useCases.map((useCase, index) => (
            <li
              key={index}
              className="p-2 border rounded-lg bg-white shadow-sm hover:shadow-md border-sky-300"
            >
              <p className="text-gray-500 font-normal text-base">{useCase.value}</p>{" "}
            </li>
          ))
        ) : (
          <p className="text-gray-600 text-center">No used for available.</p>
        )}
      </ul>
    </div>
  );
};

export default UsedForComponent;
