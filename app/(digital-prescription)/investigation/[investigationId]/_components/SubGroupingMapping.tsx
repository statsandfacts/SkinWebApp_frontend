"use client";
import { setSubGroupDetail } from "@/redux/slices/digitalPrescription/drug.slice";
import { AppDispatch } from "@/redux/store";
import { Accordion, AccordionItem } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

interface SubGroup {
  parameter_dtls?: any;
  test_details: any;
  understanding_test: any;
  sub_parameter_dtls?: any;
  interpreting_result?: any;
}

interface SubGroupingMappingProps {
  subGroup: SubGroup[];
}

const SubGroupingMapping: React.FC<SubGroupingMappingProps> = ({
  subGroup,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {subGroup && subGroup.length > 0 ? (
        <Accordion>
          {subGroup.map((parameter, index) => (
            <AccordionItem
              key={index}
              aria-label={`parameter-${index}`}
              title={parameter?.test_details?.name}
              subtitle={parameter?.test_details.synonyms}
            >
              <div>
                <p className="text-gray-800 font-semibold text-base">
                  {parameter?.understanding_test?.short_desc}
                </p>
                <p className="text-gray-500 font-normal text-base mt-2">
                  {parameter?.understanding_test?.long_desc}
                </p>
                {parameter.parameter_dtls &&
                  parameter.parameter_dtls.length > 0 && (
                    <Link
                      href={`/investigation/view-more`}
                      onClick={() => dispatch(setSubGroupDetail(parameter))}
                      className="text-sky-500 border-b border-sky-400"
                    >
                      view more
                    </Link>
                  )}
                {((parameter.sub_parameter_dtls &&
                  parameter.sub_parameter_dtls.length > 0) ||
                  parameter.interpreting_result) && (
                  <Link
                    href={`/investigation/view-more`}
                    onClick={() => dispatch(setSubGroupDetail(parameter))}
                    className="text-sky-500 border-b border-sky-400"
                  >
                    view more
                  </Link>
                )}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div>
          <p className="text-gray-600 font-medium text-center mt-4">
            No parameters available.
          </p>
          <p className="text-gray-600 font-medium text-center">
            Consult your healthcare provider for more information.
          </p>
        </div>
      )}
    </>
  );
};

export default SubGroupingMapping;
