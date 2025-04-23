"use client";
import React from "react";
import ABHAForm from "./ABHAForm";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

const ABHA = () => {
  return (
    <div>
      <section className="mt-10 text-white animate-slide-up gap-8 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-extrabold text-sky-800">
            What is Ayushman Bharat Health Account ?
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            The Ayushman Bharat Health Account (ABHA) is a key initiative under
            the Ayushman Bharat Digital Mission (ABDM). It allows individuals to
            create a unique health ID, providing seamless access to their
            medical history, prescriptions, and more. By linking healthcare
            services digitally, ABHA empowers citizens with secure and efficient
            access to healthcare services while maintaining privacy.
          </p>
        </div>

        <Card className="w-full min-h-[22rem] md:w-1/2 mb-6 p-2 md:p-4">
          <div>
            <h3 className="text-xl font-bold mb-4 text-sky-800">
              Create Your ABHA Health ID
            </h3>
            {/* <p className="text-slate-800 text-sm font-semibold">By Using Aadhaar Number</p> */}
          </div>
          <ABHAForm />

          {/* <Tabs aria-label="Options" fullWidth size="lg" className="w-full">
            <Tab key="Aadhaar Number" title="Aadhaar Number">
              <div>
                <ABHAForm />
              </div>
            </Tab>
            <Tab key="Mobile Number" title="Mobile Number">
              <div>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </div>
            </Tab>
          </Tabs> */}
        </Card>
      </section>
    </div>
  );
};

export default ABHA;
