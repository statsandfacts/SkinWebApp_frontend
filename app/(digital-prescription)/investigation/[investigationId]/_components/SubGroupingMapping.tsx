"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface SubGroup {
  name: string;
  synonyms: string;
  short_desc: string;
  long_desc: string;
  parameter_dtls?: any;
}

interface SubGroupingMappingProps {
  subGroup: SubGroup[];
}

const SubGroupingMapping: React.FC<SubGroupingMappingProps> = ({
  subGroup,
}) => {
  return (
    <>
      {subGroup && subGroup.length > 0 && (
        <Accordion>
          {subGroup.map((parameter, index) => (
            <AccordionItem
              key={index}
              aria-label={`parameter-${index}`}
              title={parameter.name}
              subtitle={parameter.synonyms}
            >
              <div>
                <p className="text-gray-800 font-semibold text-base">
                  {parameter.short_desc}
                </p>
                <p className="text-gray-500 font-normal text-base mt-2">
                  {parameter.long_desc}
                </p>
                {
                    parameter.parameter_dtls.length > 0 && 
                    <Link href={""} className="text-sky-500 border-b border-sky-400">
                        view more
                    </Link>
                }
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default SubGroupingMapping;
