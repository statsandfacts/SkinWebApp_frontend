"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRightCircle } from "lucide-react";

interface Medicine {
  id?: string;
  name?: string;
  manufacturers?: string;
  MRP?: string;
}

interface Fact {
  Value_1: string;
  Value_2: string;
}

interface SubstitutesMedicinesProps {
  substitutesMedicines: Medicine[];
  medicineName: string;
}

interface FactBoxProps {
  factBoxItems: Fact[];
}

export const SubstitutesMedicines: React.FC<SubstitutesMedicinesProps> = ({
  substitutesMedicines,
  medicineName,
}) => {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-2xl font-bold text-sky-700 mb-2 border-b pb-2 border-sky-500">
        Substitute Medicines
      </h1>
      {substitutesMedicines && substitutesMedicines.length > 0 ? (
        <ul className="space-y-2">
          {substitutesMedicines.slice(0, 5).map((medicine, index) => (
            <li
              key={index}
              className="p-2 bg-white border border-sky-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex flex-col sm:flex-row sm:justify-between sm:items-center"
              onClick={() => router.push(`/prescription/${medicine?.id}`)}
            >
              <div>
                <p className="text-lg font-semibold text-sky-900">
                  {medicine?.name}
                </p>
                <p className="text-sm text-slate-600">
                  Manufactured by: {medicine?.manufacturers}
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-600">
                {" "}
                <span className="sm:hidden">MRP: </span> ₹{medicine?.MRP}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sky-600">No substitute medicines available.</p>
      )}
      {substitutesMedicines.length > 5 && (
        <button
          onClick={() =>
            router.push(`/prescription/${medicineName}/all-substitutes`)
          }
          className="mt-4 flex items-center justify-center px-4 py-2 bg-sky-700 text-white font-medium rounded-md hover:bg-sky-800 transition-colors group"
        >
          View All Substitutes
          <ArrowRightCircle
            size={24}
            className="ml-2 transition-transform group-hover:translate-x-1"
          />
        </button>
      )}
    </div>
  );
};

export const FactBox: React.FC<FactBoxProps> = ({ factBoxItems }) => {
  return (
    <div>
      <h1 className="text-xl font-bold text-sky-700 mb-2 border-b pb-2 border-sky-500">
        Fact Box
      </h1>
      {factBoxItems && factBoxItems.length > 0 ? (
        <ul className="space-y-2">
          {factBoxItems.map(
            (fact: { Value_1: string; Value_2: string }, index: number) => (
              <li
                key={index}
                className="p-2 bg-white flex justify-between items-center border border-sky-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <p className="text-lg font-semibold text-sky-900">
                  {fact?.Value_1}
                </p>
                <p className="text-sm text-slate-600">{fact?.Value_2}</p>
              </li>
            )
          )}
        </ul>
      ) : (
        <p className="text-sky-600">No facts available.</p>
      )}
    </div>
  );
};
