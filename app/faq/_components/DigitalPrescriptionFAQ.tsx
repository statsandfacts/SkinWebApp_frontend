"use client";
import { COMMON } from "@/config/const";
import { Accordion, AccordionItem } from "@heroui/accordion";

export const DigitalPrescriptionFAQ = () => {
  return (
    <>
      <div className="sm:p-10 md:px-40">
        <Accordion
          variant="shadow"
          defaultExpandedKeys={["0"]}
          className="animate-slide-up shadow-none"
        >
          {COMMON.FAQ.map((faq: { q: string; a: string }, index: number) => (
            <AccordionItem key={index} aria-label={faq?.q} title={faq?.q}>
              <p className="text-slate-500 "> {faq?.a} </p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};
