import React from "react";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import CustomHeader from "@/components/Header/PublicLayoutHeader";
import type { Metadata } from "next";
import ContactUsForm from "@/components/Contact/ContactUsForm";


export const metadata: Metadata = {
  title: "Contact Us",
};

const ContactUs = () => {
  return (
    <div className="w-full">
      <div className="w-full p-10 md:px-40">
        <CustomHeader
          header="Contact Us"
          subHeader="Get in touch with Nextcare.Life for support and inquiries"
          imageURL="/vector/contact_us.png"
        />
        <div className="grid gap-8 px-10 py-6 grid-cols-1 md:grid-cols-2 bg-gray-100 text-gray-900 rounded-lg shadow-lg animate-slide-up">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-sky-700">
                Get In Touch
              </h2>
              <div className="text-gray-700 mt-8">
                Contact us for questions, technical assistance, or collaboration
                opportunities via the contact information provided.
                <ul className="mt-5 pr-10">
                  <li className="p-2">
                    <a href="tel">
                      <span className="pr-2">
                        <PhoneIcon className="inline-block text-sky-700 w-6 h-6 mr-2" />
                      </span>
                      +91 91244 16966
                    </a>
                  </li>
                  <li className="p-2">
                    <a href="mailto:support@nextcare.life">
                      <span className="pr-2">
                        <EnvelopeIcon className="inline-block text-sky-700 w-6 h-6 mr-2" />
                      </span>
                      support@nextcare.life
                    </a>
                  </li>
                  <li className="p-2 flex">
                    <div>
                      <span className="pr-2">
                        <MapPinIcon className="inline-block text-sky-700 w-6 h-6 mr-2" />
                      </span>
                    </div>
                    <div>
                      <span>
                        KIIT-TBI, Campus 11, KIIT University, Patia,
                        Bhubaneswar, Odisha 751024
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 mt-4">
                <p className="text-sm md:text-base font-semibold text-gray-600">
                  Incubated at KIIT and Supported by DST NIDHI PRAYAS
                </p>
                <div className="flex gap-5">
                  <Image
                    src="/digitalPrescription/dst-logo.png"
                    alt="DST NIDHI PRAYAS Logo"
                    width={150}
                    height={100}
                    className="object-contain"
                  />
                  <Image
                    src="/digitalPrescription/dst-nidhi.png"
                    alt="DST NIDHI PRAYAS Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <ContactUsForm />
         
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
