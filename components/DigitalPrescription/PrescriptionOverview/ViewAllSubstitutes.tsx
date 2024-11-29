"use client";
import { getDrugDetails } from "@/redux/slices/digitalPrescription/drug.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubstitutesMedicines } from "./SubstitutesMedicines";
import { ChevronLeftIcon } from "lucide-react";

const ViewAllSubstitutes = () => {
  const router = useRouter();
  const { prescriptionName } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.drugs
  );

  useEffect(() => {
    if (!data) {
      dispatch(getDrugDetails(prescriptionName));
    }
  }, [data]);

  console.log("data", data);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-sm overflow-auto sm:max-w-5xl p-2">
        <div className="mb-2 border-b pb-2 border-sky-500 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="flex justify-center items-center text-slate-600 transition ease-in-out duration-200 hover:text-sky-700 hover:translate-x-1"
          >
            <ChevronLeftIcon className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
            Back
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-sky-700 ">
            {data[0]?.overview?.name}
          </h1>
        </div>
        <ul className="space-y-2">
          {data
            .find((item: any) => item?.keyName === "substitutes")
            ?.substitutes?.map((medicine: any, index: number) => (
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
                  <span className="sm:hidden">Price: </span> ₹{medicine?.MRP}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewAllSubstitutes;
