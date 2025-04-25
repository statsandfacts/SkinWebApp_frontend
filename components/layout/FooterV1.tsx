"use client";
import { COMMON } from "@/config/const";
import { CreditCardIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FontAwesomeXIcon from "../SvgIcon/FontAwesomeXIcon";

type Props = {};

const FooterV1 = (props: Props) => {
  return (
    <>
      <footer className="bg-primary h-[92vh]" id="contact">
        <div className="flex flex-col justify-between px-16 pb-10 mt-10 w-full bg-primary max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="grid grid-cols-2 gap-3 sm:gap-8 sm:grid-cols-4">
            <div>
              <p className="text-lg text-white font-bold">
                Healthcare Services
              </p>
              <ul className="space-y-2 mt-4">
                {[
                  "Digital Prescription",
                  "Smart Lab Reports",
                  "Symptom Bot",
                  "Health Record Management",
                ].map((item) => (
                  <li className="text-[#D9D9D9] font-normal text-sm" key={item}>
                    {" "}
                    {item}{" "}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-lg text-white font-bold">About</p>
              <div className="flex flex-col gap-2 mt-4">
                {[
                  { name: "Home", url: "/" },
                  { name: "About Us", url: "/about-us" },
                  { name: "Why nextcare.life", url: "/why-next-care" },
                  { name: "Careers", url: "/career" },
                ].map((item) => (
                  <Link
                    className="text-[#D9D9D9] font-normal text-sm"
                    key={item.name}
                    href={item.url}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-lg text-white font-bold">ABDM</p>
              <div className="flex flex-col gap-2  mt-4">
                {[
                  {
                    name: "Create ABHA ID",
                    url: "/ayushman-bharat/create-abha-health-id",
                  },
                  { name: "About ABDM", url: "/ayushman-bharat" },
                ].map((item) => (
                  <Link
                    href={item.url}
                    className="text-[#D9D9D9] font-normal text-sm"
                    key={item.name}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="order-last col-span-2 sm:col-span-1 sm:order-none">
              <div className="flex justify-start items-end">
                <Image
                  src="/logo-white.svg"
                  width={150}
                  height={150}
                  alt="nextcare logo"
                />
                <span className="text-gray-500">Beta</span>
              </div>
              <p className="font-medium text-4xl drop-shadow-lg text-white">
                Future of Care
              </p>
            </div>

            <div>
              <p className="text-lg text-white font-bold">Privacy & Securtiy</p>
              <div className="flex flex-col gap-2  mt-4">
                {[
                  {
                    name: "Terms and Conditions",
                    url: "/policy/terms-and-condition",
                  },
                  { name: "Privacy Policy", url: "/policy" },
                  { name: "Data Security", url: "/coming-soon" },
                  { name: "Disclaimer", url: "/policy/disclaimer" },
                ].map((item) => (
                  <Link
                    className="text-[#D9D9D9] font-normal text-sm"
                    key={item.url}
                    href={item.url}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-lg text-white font-bold">Calculators</p>
              <div className="flex flex-col gap-2  mt-4">
                {[
                  { name: "BMI", url: "/calculator/bmi" },
                  { name: "BMR", url: "/calculator/bmr" },
                  {
                    name: "Blood Pressure Risk",
                    url: "/calculator/blood-pressure-risk-calculator",
                  },
                  {
                    name: "Pregnancy Due Date",
                    url: "/calculator/pregnancy-due-date",
                  },
                  {
                    name: "Diabetes Risk",
                    url: "/calculator/diabetes-risk-calculator",
                  },
                ].map((item) => (
                  <Link
                    className="text-[#D9D9D9] font-normal text-sm"
                    key={item.url}
                    href={item.url}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-lg text-white font-bold">Get Started</p>
              <div className="flex flex-col gap-2  mt-4">
                {[
                  { name: "HCR", url: "/hcr" },
                  { name: "Contact Us", url: "/contact-us" },
                ].map((item) => (
                  <Link
                    className="text-[#D9D9D9] font-normal text-sm"
                    key={item.url}
                    href={item.url}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 py-2 mt-4">
            <Link
              href="https://www.linkedin.com/company/nextcare-life/"
              className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href="https://twitter.com/NextcareLife"
              className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              <FontAwesomeXIcon color="#ffffff" height={16} width={16} />
            </Link>
            <Link
              href="https://www.instagram.com/nextcare.life?igsh=MTdkMjg5M2s2NmRobA%3D%3D&utm_source=qr"
              className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.facebook.com/share/19dqeCuNou/?mibextid=wwXIfr"
              className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              <Facebook className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.youtube.com/@NCL24283"
              className="p-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              <Youtube className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs font-light text-white">
            Copyright © {new Date().getFullYear()}
          </p>
          <p className="text-xs font-light text-white">
            Stats & Facts Technologies Pvt. Ltd.
          </p>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center items-center px-16 py-2.5 w-full bg-black max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between items-center max-md:flex-wrap">
              <div className="flex gap-2 self-stretch my-auto text-sm text-white whitespace-nowrap">
                <ShieldCheckIcon className="w-5 h-5" />
                <div className="grow">100% Authentic</div>
              </div>

              <div className="flex gap-2 self-stretch my-auto text-sm text-white whitespace-nowrap">
                <CreditCardIcon className="w-5 h-5" />
                <div className="grow">Secure Payments</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-16 py-6 w-full bg-primary text-stone-900 max-md:px-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-5 justify-between mx-5 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
              <div className="flex-auto my-auto text-sm text-white">
                Copyright © {new Date().getFullYear()}
                <div className="flex gap-2 my-auto text-sm text-white">
                  Stats & Facts Technologies Pvt. Ltd.
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pb-1.5 text-xs whitespace-nowrap">
                <Link
                  href={"/policy/terms-and-condition"}
                  className="grow justify-center px-2 py-1.5 border border-solid border-black border-opacity-0 text-white"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href={"/policy"}
                  className="grow justify-center px-2 py-1.5 border border-solid border-black border-opacity-0 text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  href={"/policy/refund-cancellation"}
                  className="grow justify-center px-2 py-1.5 border border-solid border-black border-opacity-0 text-white"
                >
                  Refund & Cancellation Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterV1;
