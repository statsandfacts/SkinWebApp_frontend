"use client";
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
      <h2 className="text-lg font-semibold">
        Frequently Asked Questions
      </h2>
      {faqs.length > 0 ? (
        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <h3 className="text-base font-semibold text-gray-800">
                {faq?.Value_1}
              </h3>
              <p className="text-gray-500 font-normal text-base">{faq?.Value_2}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-4">
          No FAQs available.
        </p>
      )}
    </div>
  );
};

export default FAQ;
