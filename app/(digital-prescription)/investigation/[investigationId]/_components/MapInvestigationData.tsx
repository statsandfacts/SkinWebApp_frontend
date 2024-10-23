"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link as ScrollLink, Element as ScrollElement } from "react-scroll";
import SubGroupingMapping from "./SubGroupingMapping";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import InterpretingResult from "./InterpretingResult";
import FAQ from "./FAQ";
import UsedForComponent from "./UsedForComponent";

const MapInvestigationData = ({ data }: { data: any[] }) => {
  const router = useRouter();

  return (
    <>
      {data && data.length > 0 ? (
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
              <Button
                onClick={() => router.back()}
                className="rounded-lg bg-white shadow-md"
                startContent={<ArrowLeftIcon className="w-4 h-4" />}
              >
                Back
              </Button>
            </div>
            <div className="mt-2">
              {data.map((section: any, i: number) => (
                <ScrollElement key={i} name={section.name} className="mb-2">
                  <div className="bg-white shadow-md rounded-lg mb-4 transition-transform duration-200 p-4">
                    {section?.keyName === "test_details" ? (
                      <div>
                        <h2 className="text-3xl font-semibold text-gray-900">
                          {section?.test_details?.name}
                        </h2>
                        <p className="mb-4 border-b pb-2 text-gray-500 font-normal text-base mt-2">
                          {section?.test_details?.synonyms}{" "}
                        </p>
                        <div>
                          <strong className="text-gray-800 font-semibold text-base">
                            {" "}
                            Test Preparation:{" "}
                          </strong>
                          <span className="text-gray-500 font-normal text-base">
                            {section?.test_details?.test_preparation}
                          </span>
                        </div>
                        <div>
                          <strong className="text-gray-800 font-semibold text-base">
                            {" "}
                            You Need To Provide:{" "}
                          </strong>
                          <span className="text-gray-500 font-normal text-base">
                            {section?.test_details?.you_need_to_provide}
                          </span>
                        </div>
                      </div>
                    ) : section?.keyName === "understanding_test" ? (
                      <div>
                        <p className="text-gray-800 font-semibold text-base mb-3">
                          {section?.understanding_test?.short_desc}
                        </p>
                        <p className="text-gray-500 font-normal text-base mt-2">
                          {section?.understanding_test?.long_desc}
                        </p>
                      </div>
                    ) : section?.keyName === "interpreting_result" ? (
                      <InterpretingResult
                        interpreting_result={section?.interpreting_result}
                      />
                    ) : section?.keyName === "faqs" ? (
                      <FAQ faqs={section?.faqs || []} />
                    ) : section?.keyName === "used_for" ? (
                      <UsedForComponent useCases={section?.used_for || []} />
                    ) : [
                        "sub_groups",
                        "parameter_dtls",
                        "sub_parameter_dtls",
                      ].includes(section?.keyName) ? (
                      <SubGroupingMapping
                        subGroup={
                          section?.sub_groups ||
                          section?.parameter_dtls ||
                          section?.sub_parameter_dtls
                        }
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
                information provided here is for general purposes only. Please
                consult with your healthcare provider before practicing any of
                these recommendations.
              </p>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <p className="text-center w-full text-slate-600">
          Investigation Data Not Found
        </p>
      )}
    </>
  );
};

export default MapInvestigationData;
