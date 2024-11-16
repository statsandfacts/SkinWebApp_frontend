"use client";
import { COMMON } from "@/config/const";
import { Accordion, AccordionItem } from "@nextui-org/react";

export const DigitalPrescriptionFAQ = () => {
  return (
    <>
      <div className="p-10 md:px-40">
        <header className="relative mb-6 w-full p-6 rounded-lg shadow-lg bg-gradient-to-r from-sky-700 via-sky-500 to-cyan-700 animate-fade-in">
          <div className="absolute inset-0 bg-opacity-20 bg-white rounded-lg pointer-events-none"></div>
          <div className="relative text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-2xl text-white/90 font-medium mx-auto max-w-3xl leading-relaxed">
              Find answers to all your questions regarding NextCare app,
              products, services and more
            </p>
          </div>
        </header>

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
