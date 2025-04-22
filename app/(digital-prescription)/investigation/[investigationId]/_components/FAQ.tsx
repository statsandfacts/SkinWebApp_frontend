"use client";
import { Accordion, AccordionItem } from "@heroui/react";
import React from "react";

interface FAQ {
  Value_1: string;
  Value_2: string;
}

interface FAQProps {
  faqs: FAQ[];
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  return (
    <div>
      <h1 className="text-xl font-bold text-sky-700 mb-2 border-b pb-2 border-sky-500">
        Frequently Asked Questions
      </h1>
      {faqs.length > 0 ? (
        <div>
          <Accordion isCompact defaultExpandedKeys={["0"]}>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq?.Value_1}
                title={<p className="text-base font-semibold text-sky-900" >{faq?.Value_1}</p>}
              >
                <p className="text-sm text-slate-600 font-normal">
                  {faq?.Value_2}
                </p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-4">No FAQs available.</p>
      )}
    </div>
  );
};

export default FAQ;
