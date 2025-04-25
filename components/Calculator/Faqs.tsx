"use client";
import { Accordion, AccordionItem } from "@heroui/accordion";
import React from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQ[];
}

const CalculatorFAQ: React.FC<FAQProps> = ({ faqs }) => {
  return (
    <div className="mt-8">
      <h1 className="text-xl font-bold text-sky-700 mb-2 border-b pb-2 border-sky-500">
        Frequently Asked Questions
      </h1>
      {faqs.length > 0 ? (
        <div>
          <Accordion isCompact defaultExpandedKeys={["0"]}>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq?.question}
                title={
                  <p className="text-base font-semibold text-sky-900">
                    {faq?.question}
                  </p>
                }
              >
                <p className="text-sm text-slate-600 font-normal">
                  {faq?.answer}
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

export default CalculatorFAQ;
