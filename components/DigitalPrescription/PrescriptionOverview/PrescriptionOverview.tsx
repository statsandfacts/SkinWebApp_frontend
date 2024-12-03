"use client";
import React, { useCallback, useEffect } from "react";
import { Link as ScrollLink, Element as ScrollElement } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getDrugDetails } from "@/redux/slices/digitalPrescription/drug.slice";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import FAQ from "@/app/(digital-prescription)/investigation/[investigationId]/_components/FAQ";
import { FactBox, SubstitutesMedicines } from "./SubstitutesMedicines";
import { SafetyAdvice } from "./SafetyAdvice";

const PrescriptionOverview: React.FC<{ medicineName: string }> = ({
  medicineName,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.drugs
  );

  const fetchDrugDetails = useCallback(() => {
    if (medicineName) {
      dispatch(getDrugDetails(medicineName));
    }
  }, [dispatch, medicineName]);

  useEffect(() => {
    fetchDrugDetails();
  }, [fetchDrugDetails]);

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 ml-3 text-center w-full"> Error: {error} </p>
      ) : (
        <>
          {data && data.length > 0 && (
            <React.Fragment>
              <div className="hidden sm:block w-1/4 bg-white shadow-lg rounded-lg p-4 sticky top-20 max-h-[600px] overflow-auto">
                <ul className="space-y-2">
                  {data.map((section: any) => (
                    <li key={section.name}>
                      <ScrollLink
                        to={section.name}
                        smooth={true}
                        duration={500}
                        spy={true}
                        activeClass="font-bold text-sky-600"
                        className="block py-2 px-4 rounded-lg hover:bg-sky-50 transition duration-200 cursor-pointer"
                        offset={-100}
                      >
                        {section.name}
                      </ScrollLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full sm:w-3/4 sm:ml-4">
                <div>
                  <button
                    onClick={() => router.back()}
                    className="flex justify-center items-center text-slate-600 mb-2 transition ease-in-out duration-200 hover:text-sky-700 hover:translate-x-1"
                  >
                    <ChevronLeftIcon className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
                    Back
                  </button>
                </div>
                <div className="mt-2">
                  {data.map((section: any, i: number) => (
                    <ScrollElement key={i} name={section.name} className="mb-2">
                      <div className="bg-white shadow-md rounded-lg mb-4 transition-transform duration-200 p-4">
                        {section.keyName === "overview" ? (
                          <div>
                            <h1 className="text-2xl font-semibold text-sky-700 mb-4 border-b pb-2 border-sky-500">
                              {section.overview?.name}
                            </h1>

                            <div className="mb-2">
                              <label className="text-sky-900 font-medium block uppercase">
                                Manufacturers
                              </label>
                              <p className="text-slate-500 text-sm font-normal">
                                {section.overview?.manufacturers}
                              </p>
                            </div>

                            <div className="mb-2">
                              <label className="text-sky-900 font-medium block uppercase">
                                SALT COMPOSITION
                              </label>
                              <p className="text-slate-500 text-sm font-normal">
                                {section.overview?.salt_composition}
                              </p>
                            </div>

                            <div className="mb-2">
                              <label className="text-sky-900 font-medium block uppercase">
                                MRP
                              </label>
                              <p className="text-slate-500 text-sm font-normal">
                                ₹{section.overview?.MRP}
                              </p>
                            </div>

                            <div className="mb-2">
                              <label className="text-sky-900 font-medium block uppercase ">
                                Storage
                              </label>
                              <p className="text-slate-500 text-sm font-normal">
                                {section.overview?.storage}
                              </p>
                            </div>

                            <div className="mb-2">
                              <label className="text-sky-900 font-medium block uppercase ">
                                Prescription Required
                              </label>
                              <p className="text-slate-500 text-sm font-normal">
                                {section.overview?.prescription_required
                                  ? "Yes"
                                  : "No"}
                              </p>
                            </div>

                            <div className="mb-2">
                              <label className="text-sky-900 font-medium block uppercase ">
                                Product Introduction
                              </label>
                              <p className="text-slate-500 text-sm font-normal">
                                {section.overview?.product_information}
                              </p>
                            </div>
                          </div>
                        ) : section.keyName === "uses_and_benefits" ? (
                          <div>
                            <h1 className="text-2xl font-bold text-sky-700 mb-2 border-b pb-2 border-sky-500">
                              Uses and Benefits
                            </h1>

                            <div className="mb-4">
                              <p className="text-slate-500 text-sm font-normal">
                                {section.uses_and_benefits?.introduction ||
                                  "N/A"}
                              </p>
                            </div>

                            <div className="mb-2">
                              <label className="text-sky-900 font-semibold block uppercase">
                                Use of Medicine
                              </label>
                              <p className="text-slate-500 text-sm font-normal">
                                {section.uses_and_benefits?.use_of}
                              </p>
                            </div>
                          </div>
                        ) : section.keyName === "side_effects" ? (
                          <div>
                            <h1 className="text-2xl font-bold text-sky-700 mb-2 border-b pb-2 border-sky-500">
                              Side Effects
                            </h1>

                            <p className="text-slate-500 text-sm font-normal">
                              {section.side_effects?.common_side_effect}
                            </p>
                          </div>
                        ) : section.keyName === "how_to_use" ? (
                          <div>
                            <h1 className="text-xl font-bold text-sky-700 mb-2 border-b pb-2 border-sky-500">
                              How to Use
                            </h1>
                            <p className="text-slate-500 text-sm font-normal">
                              {section.how_to_use?.how_to_use}
                            </p>
                          </div>
                        ) : section.keyName === "how_drug_works" ? (
                          <div>
                            <h1 className="text-xl font-bold text-sky-700 mb-2 border-b pb-2 border-sky-500">
                              How the Drug Works
                            </h1>
                            <p className="text-slate-600 text-sm font-normal">
                              {section.how_drug_works?.function}
                            </p>
                          </div>
                        ) : section.keyName === "safety_advice" ? (
                          <SafetyAdvice safetyAdvice={section.safety_advice} />
                        ) : section.keyName === "missed_does" ? (
                          <div>
                            <h2 className="text-xl font-bold text-sky-700 mb-2 border-b pb-2 border-sky-500">
                              Missed Dose
                            </h2>
                            <p className="text-sm text-sky-600 font-normal">
                              {section.missed_does?.if_miss}
                            </p>
                          </div>
                        ) : section.keyName === "fact_box" ? (
                          <FactBox factBoxItems={section.fact_box} />
                        ) : section.keyName === "faqs" ? (
                          <FAQ faqs={section?.faqs || []} />
                        ) : section.keyName === "substitutes" ? (
                          <SubstitutesMedicines
                            substitutesMedicines={section?.substitutes}
                            medicineName={medicineName}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </ScrollElement>
                  ))}
                </div>
                <div className="bg-gray-100 border-l-4 border-sky-700 p-4 md:p-6 rounded-md shadow-md mt-5">
                  <p className="text-black text-sm md:text-base leading-relaxed">
                    <strong className="text-sky-800">Disclaimer:</strong> The
                    information provided here is for general purposes only.
                    Please consult with your healthcare provider before
                    practicing any of these recommendations.
                  </p>
                </div>
              </div>
            </React.Fragment>
          )}
        </>
      )}
    </div>
  );
};

export default PrescriptionOverview;
