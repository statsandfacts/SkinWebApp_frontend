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
      <h2 className="text-lg font-semibold text-gray-800">Used For</h2>
      <ul className="space-y-2">
        {useCases.length > 0 ? (
          useCases.map((useCase, index) => (
            <li
              key={index}
              className="p-2 border rounded-lg bg-white shadow-sm"
            >
              <p className="text-gray-500 font-normal text-base">{useCase.value}</p>{" "}
            </li>
          ))
        ) : (
          <p className="text-gray-600 text-center">No use cases available.</p>
        )}
      </ul>
    </div>
  );
};

export default UsedForComponent;
