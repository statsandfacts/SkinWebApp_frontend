"use client";
import React, { useCallback, useEffect } from "react";
import {
  Link as ScrollLink,
  Element as ScrollElement,
  scroller,
} from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getDrugDetails } from "@/redux/slices/digitalPrescription/drug.slice";
import Loader from "@/components/Loader";
import Image from "next/image";

const PrescriptionOverview: React.FC<{ medicineName: string }> = ({
  medicineName,
}) => {
  const dispatch = useDispatch<AppDispatch>();
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

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      {loading ? (
        <Loader />
      ) : (
        <>
          {data && data.length > 0 && (
            <React.Fragment>
              <div className="w-1/4 bg-white shadow-lg rounded-lg p-4 sticky top-20 max-h-[600px] overflow-auto">
                <ul className="space-y-2">
                  {data.map((section: any) => (
                    <li key={section.name}>
                      <ScrollLink
                        to={section.name}
                        smooth={true}
                        duration={500}
                        spy={true}
                        activeClass="font-bold text-blue-600"
                        className="block py-2 px-4 rounded-lg hover:bg-blue-100 transition duration-200 cursor-pointer"
                        offset={-100}
                      >
                        {section.name}
                      </ScrollLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-3/4 ml-4">
                {data.map((section: any, i: number) => (
                  <ScrollElement key={i} name={section.name} className="mb-2">
                    <div className="bg-white shadow-md rounded-lg mb-4 transition-transform duration-200 p-4">
                      {section.keyName === "overview" ? (
                        <div>
                          <h2 className="text-3xl font-semibold text-gray-900 mb-4 border-b pb-2">
                            {section.overview?.name}
                          </h2>

                          <div className="mb-2">
                            <label className="text-gray-700 font-medium block uppercase">
                              Manufacturers
                            </label>
                            <p className="text-gray-500 text-sm font-normal">
                              {section.overview?.manufacturers || "N/A"}
                            </p>
                          </div>

                          <div className="mb-2">
                            <label className="text-gray-700 font-medium block  uppercase">
                              SALT COMPOSITION
                            </label>
                            <p className="text-gray-500 text-sm font-normal">
                              {section.overview?.salt_composition || "N/A"}
                            </p>
                          </div>

                          <div className="mb-2">
                            <label className="text-gray-700 font-medium block uppercase ">
                              Storage
                            </label>
                            <p className="text-gray-500 text-sm font-normal">
                              {section.overview?.storage || "N/A"}
                            </p>
                          </div>

                          <div className="mb-2">
                            <label className="text-gray-700 font-medium block uppercase ">
                              Prescription Required
                            </label>
                            <p className="text-gray-500 text-sm font-normal">
                              {section.overview?.prescription_required
                                ? "Yes"
                                : "No"}
                            </p>
                          </div>

                          <div className="mb-2">
                            <label className="text-gray-700 font-medium block uppercase ">
                              Product Introduction
                            </label>
                            <p className="text-gray-500 text-sm font-normal">
                              {section.overview?.product_information || "N/A"}
                            </p>
                          </div>
                        </div>
                      ) : section.keyName === "uses_and_benefits" ? (
                        <div>
                          <h2 className="text-sm uppercase font-semibold text-gray-900 mb-4 border-b pb-2">
                            Uses and Benefits
                          </h2>

                          <div className="mb-4">
                            <p className="text-gray-500 text-sm font-normal">
                              {section.uses_and_benefits?.introduction || "N/A"}
                            </p>
                          </div>

                          <div className="mb-2">
                            <label className="text-gray-700 font-medium block  uppercase">
                              Use of Medicine
                            </label>
                            <p className="text-gray-500 text-sm font-normal">
                              {section.uses_and_benefits?.use_of || "N/A"}
                            </p>
                          </div>
                        </div>
                      ) : section.keyName === "side_effects" ? (
                        <div>
                          <h2 className="text-sm uppercase font-semibold text-gray-900 mb-4 border-b pb-2">
                            Side Effects
                          </h2>

                          <div className="mb-2">
                            <label className="text-gray-700 text-sm font-medium block uppercase">
                              Common Side Effects
                            </label>
                            <p className="text-gray-500 text-sm font-normal">
                              {section.side_effects?.common_side_effect ||
                                "N/A"}
                            </p>
                          </div>
                        </div>
                      ) : section.keyName === "how_to_use" ? (
                        <div>
                          <h2 className="text-sm uppercase font-semibold text-gray-900 mb-4 border-b pb-2">
                            How to Use
                          </h2>
                          <p className="text-gray-500 text-sm font-normal">
                            {section.how_to_use?.how_to_use || "N/A"}
                          </p>
                        </div>
                      ) : section.keyName === "how_drug_works" ? (
                        <div>
                          <h2 className="text-sm uppercase font-semibold text-gray-900 mb-4 border-b pb-2">
                            How the Drug Works
                          </h2>
                          <p className="text-gray-500 text-sm font-normal">
                            {section.how_drug_works?.function || "N/A"}
                          </p>
                        </div>
                      ) : section.keyName === "safety_advice" ? (
                        <div>
                          <h2 className="text-sm font-semibold uppercase text-gray-900 mb-4 border-b pb-2">
                            Safety advice
                          </h2>
                          <div className="flex flex-col gap-3" >
                            <div>
                              <div className="flex gap-3">
                                <Image
                                  alt="alcohol image"
                                  height={30}
                                  width={30}
                                  src={"/safety/alcohol.png"}
                                />
                                <div className="flex justify-center items-center gap-3">
                                  <p className="text-gray-800 text-sm font-semibold">
                                    Alcohol
                                  </p>
                                  <div
                                    className={`text-gray-600 text-xs font-normal w-fit ${
                                      section.safety_advice
                                        ?.alcoholInteraction === "UNSAFE"
                                        ? "bg-red-100"
                                        : section.safety_advice
                                            ?.alcoholInteraction === "SAFE"
                                        ? "bg-green-100"
                                        : "bg-blue-100"
                                    } px-2 py-1 rounded-2xl`}
                                  >
                                    {section.safety_advice
                                      ?.alcoholInteraction || "N/A"}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-500 text-sm font-normal ml-3">
                                {section.safety_advice?.AlcoholDetails || "N/A"}
                              </p>
                            </div>

                            <div>
                              <div className="flex gap-3">
                                <Image
                                  alt="alcohol image"
                                  height={30}
                                  width={30}
                                  src={"/safety/pregnancy.png"}
                                />
                                <div className="flex justify-center items-center gap-3">
                                  <p className="text-gray-800 text-sm font-semibold">
                                    Pregnancy
                                  </p>
                                  <div
                                    className={`text-gray-600 text-xs font-normal w-fit ${
                                      section.safety_advice
                                        ?.pregnancyInteraction === "UNSAFE"
                                        ? "bg-red-100"
                                        : section.safety_advice
                                            ?.pregnancyInteraction === "SAFE"
                                        ? "bg-green-100"
                                        : "bg-blue-100"
                                    } px-2 py-1 rounded-2xl`}
                                  >
                                    {section.safety_advice
                                      ?.pregnancyInteraction || "N/A"}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-500 text-sm font-normal ml-3">
                                {section.safety_advice?.PregnencyDetails ||
                                  "N/A"}
                              </p>
                            </div>

                            <div>
                              <div className="flex gap-3">
                                <Image
                                  alt="alcohol image"
                                  height={30}
                                  width={30}
                                  src={"/safety/lactation.png"}
                                />
                                <div className="flex justify-center items-center gap-3">
                                  <p className="text-gray-800 text-sm font-semibold">
                                    Breast feeding
                                  </p>
                                  <div
                                    className={`text-gray-600 text-xs font-normal w-fit ${
                                      section.safety_advice
                                        ?.lactationInteraction === "UNSAFE"
                                        ? "bg-red-100"
                                        : section.safety_advice
                                            ?.lactationInteraction === "SAFE"
                                        ? "bg-green-100"
                                        : "bg-blue-100"
                                    } px-2 py-1 rounded-2xl`}
                                  >
                                    {section.safety_advice
                                      ?.lactationInteraction || "N/A"}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-500 text-sm font-normal ml-3">
                                {section.safety_advice?.BreastfeedingDetails ||
                                  "N/A"}
                              </p>
                            </div>

                            <div>
                              <div className="flex gap-3">
                                <Image
                                  alt="alcohol image"
                                  height={30}
                                  width={30}
                                  src={"/safety/driving.png"}
                                />
                                <div className="flex justify-center items-center gap-3">
                                  <p className="text-gray-800 text-sm font-semibold">
                                    Driving
                                  </p>
                                  <div
                                    className={`text-gray-600 text-xs font-normal w-fit ${
                                      section.safety_advice
                                        ?.drivingInteraction === "UNSAFE"
                                        ? "bg-red-100"
                                        : section.safety_advice
                                            ?.drivingInteraction === "SAFE"
                                        ? "bg-green-100"
                                        : "bg-blue-100"
                                    } px-2 py-1 rounded-2xl`}
                                  >
                                    {section.safety_advice
                                      ?.drivingInteraction || "N/A"}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-500 text-sm font-normal ml-3">
                                {section.safety_advice?.DrivingDetails || "N/A"}
                              </p>
                            </div>

                            <div>
                              <div className="flex gap-3">
                                <Image
                                  alt="alcohol image"
                                  height={30}
                                  width={30}
                                  src={"/safety/kidney.png"}
                                />
                                <div className="flex justify-center items-center gap-3">
                                  <p className="text-gray-800 text-sm font-semibold">
                                    Kidney
                                  </p>
                                  <div
                                    className={`text-gray-600 text-xs font-normal w-fit ${
                                      section.safety_advice
                                        ?.kidneyInteraction === "UNSAFE"
                                        ? "bg-red-100"
                                        : section.safety_advice
                                            ?.kidneyInteraction === "SAFE"
                                        ? "bg-green-100"
                                        : "bg-blue-100"
                                    } px-2 py-1 rounded-2xl`}
                                  >
                                    {section.safety_advice?.kidneyInteraction ||
                                      "N/A"}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-500 text-sm font-normal ml-3">
                                {section.safety_advice?.KidneyDetails || "N/A"}
                              </p>
                            </div>

                            <div>
                              <div className="flex gap-3">
                                <Image
                                  alt="alcohol image"
                                  height={30}
                                  width={30}
                                  src={"/safety/liver.png"}
                                />
                                <div className="flex justify-center items-center gap-3">
                                  <p className="text-gray-800 text-sm font-semibold">
                                    Liver
                                  </p>
                                  <div
                                    className={`text-gray-600 text-xs font-normal w-fit ${
                                      section.safety_advice
                                        ?.liverInteraction === "UNSAFE"
                                        ? "bg-red-100"
                                        : section.safety_advice
                                            ?.liverInteraction === "SAFE"
                                        ? "bg-green-100"
                                        : "bg-blue-100"
                                    } px-2 py-1 rounded-2xl`}
                                  >
                                    {section.safety_advice?.liverInteraction ||
                                      "N/A"}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-500 text-sm font-normal ml-3">
                                {section.safety_advice?.LiverDetails || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : section.keyName === "missed_does" ? (
                        <div>
                          <h2 className="text-sm uppercase font-semibold text-gray-900 mb-4 border-b pb-2">
                            Missed Dose
                          </h2>
                          <p className="text-gray-500 text-sm font-normal">
                            {section.missed_does?.if_miss || "N/A"}
                          </p>
                        </div>
                      ) : section.keyName === "fact_box" ? (
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                            Fact Box
                          </h2>
                          {section.fact_box && section.fact_box.length > 0 ? (
                            section.fact_box.map(
                              (
                                fact: { Value_1: string; Value_2: string },
                                index: number
                              ) => (
                                <div
                                  key={index}
                                  className="mb-1 flex justify-between w-3/6 bg-green-100 p-2 rounded-md"
                                >
                                  <p className="text-gray-500 text-sm font-normal">
                                    {" "}
                                    {fact.Value_1 || "N/A"}{" "}
                                  </p>
                                  <p className="text-gray600 text-sm font-medium">
                                    {" "}
                                    {fact.Value_2 || "N/A"}{" "}
                                  </p>
                                </div>
                              )
                            )
                          ) : (
                            <p className="text-gray-500 text-sm font-normal">
                              No facts available.
                            </p>
                          )}
                        </div>
                      ) : section.keyName === "faqs" ? (
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                            FAQs
                          </h2>
                          {section.faqs && section.faqs.length > 0 ? (
                            section.faqs.map(
                              (
                                faq: { Value_1: string; Value_2: string },
                                index: number
                              ) => (
                                <div key={index} className="mb-4">
                                  <p className="text-gray-700 font-medium">
                                    <strong>{faq.Value_1 || "N/A"}:</strong>
                                  </p>
                                  <p className="text-gray-500 text-sm font-normal">
                                    {faq.Value_2 || "N/A"}
                                  </p>
                                </div>
                              )
                            )
                          ) : (
                            <p className="text-gray-500 text-sm font-normal">
                              No FAQs available.
                            </p>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </ScrollElement>
                ))}
              </div>
            </React.Fragment>
          )}
        </>
      )}
    </div>
  );
};

export default PrescriptionOverview;
