"use client";
import React, { useCallback, useEffect } from "react";
import {
  Link as ScrollLink,
  Element as ScrollElement,
  scroller,
} from "react-scroll";
import { mockData } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getDrugDetails } from "@/redux/slices/digitalPrescription/drug.slice";

const PrescriptionOverview: React.FC<{ medicineName: string }> = ({
  medicineName,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.drugs
  );

  // const fetchDrugDetails = useCallback(() => {
  //   if (medicineName) {
  //     dispatch(getDrugDetails(medicineName));
  //   }
  // }, [dispatch, medicineName]);

  // useEffect(() => {
  //   fetchDrugDetails();
  // }, [fetchDrugDetails]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      <div className="w-1/4 bg-white shadow-lg rounded-lg p-4 sticky top-20 max-h-[600px] overflow-auto">
        <ul className="space-y-2">
          {mockData.map((section) => (
            <li key={section.id}>
              <ScrollLink
                to={section.name}
                smooth={true}
                duration={500}
                spy={true}
                activeClass="font-bold text-blue-600"
                className="block py-2 px-4 rounded-lg hover:bg-blue-100 transition duration-200 cursor-pointer"
                offset={-150}
              >
                {section.name}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 ml-4">
        {mockData.map((section) => (
          <ScrollElement key={section.id} name={section.name} className="mb-2">
            <div className="bg-white shadow-md rounded-lg mb-2 transition-transform duration-200">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {section.name}
                </h2>
                {Array.isArray(section.content) ? (
                  section.content.length > 0 &&
                  typeof section.content[0] === "object" ? (
                    <ul className="list-disc pl-6">
                      {section.content.map((item, index) => (
                        <li key={index} className="mb-2">
                          {/* {item.question ? (
                            <>
                              <span className="font-semibold">
                                {item.question}
                              </span>
                              : {item.answer}
                            </>
                          ) : (
                            <>
                              <span className="font-semibold">
                                {item.sideEffect}
                              </span>
                              : {item.description}
                            </>
                          )} */}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 leading-relaxed">
                      {/* {section.content} */}
                    </p>
                  )
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                )}
              </div>
            </div>
          </ScrollElement>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionOverview;
