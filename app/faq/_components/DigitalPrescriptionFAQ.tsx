"use client";
import CustomHeader from "@/components/Header/PublicLayoutHeader";
import { COMMON } from "@/config/const";
import { Accordion, AccordionItem } from "@nextui-org/react";

export const DigitalPrescriptionFAQ = () => {
  return (
    <>
      <div className="p-10 md:px-40">
        <CustomHeader
          header="Frequently Asked Questions"
          subHeader="Get answers about NextCare app and services."
          imageURL="/vector/faq.png"
        />

        <Accordion
          variant="shadow"
          defaultExpandedKeys={["0"]}
          className="animate-slide-up"
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
