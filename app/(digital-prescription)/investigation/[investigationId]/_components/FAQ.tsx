"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
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
      <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
      {faqs.length > 0 ? (
        <div>
          <Accordion isCompact defaultExpandedKeys={["0"]}>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq?.Value_1}
                title={faq?.Value_1}
              >
                <p className="text-gray-500 font-normal text-base">
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
