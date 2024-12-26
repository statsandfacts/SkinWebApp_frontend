import CustomHeader from "@/components/Header/PublicLayoutHeader";
import { ArrowRightIcon, IdCardIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ayushman Bharat Digital Mission",
};

const ABDMPage = () => {
  return (
    <div className="p-10 md:px-40">
      <CustomHeader
        header="Ayushman Bharat Digital Mission"
        subHeader="Empowering every Indian with access to digital healthcare and wellness solutions."
        imageURL="/vector/abdm.png"
      />

      <section className="mt-10 text-white transform hover:scale-[1.02] animate-slide-up transition-transform duration-300 ease-in-out flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <Image
            src="/digitalPrescription/abha_image.jpg"
            alt="ABHA Card"
            className="rounded-lg shadow-md"
            width={450}
            height={450}
            priority
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-extrabold text-sky-800">
            Create Your ABHA (Ayushman Bharat Health Account)
          </h2>
          <p className="mt-4 text-lg text-sky-700">
            ABHA is your gateway to a seamless digital healthcare experience.
            Create your unique health ID today and connect to India’s futuristic
            healthcare services.
          </p>
          <Link
            href={"/ayushman-bharat/create-abha-health-id"}
            className="mt-6 inline-flex items-center px-8 py-4 bg-white text-sky-600 font-bold text-xl rounded-lg shadow-lg hover:bg-sky-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            <IdCardIcon className="mr-3 h-6 w-6" />
            Create ABHA
          </Link>
        </div>
      </section>

      <section className="mt-10 text-white transform hover:scale-[1.02] animate-slide-up transition-transform duration-300 ease-in-out flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-extrabold text-sky-800">
            About Ayushman Bharat Digital Mission
          </h2>
          <p className="mt-4 text-lg text-sky-700">
            The Ayushman Bharat Digital Mission (ABDM) is a revolutionary
            initiative aimed at transforming the Indian healthcare ecosystem. By
            enabling the creation of digital health IDs, it seeks to empower
            citizens with secure and convenient access to their medical
            information, bridging the gap between patients, doctors, and
            healthcare facilities.
          </p>
        </div>
        <div className="w-full md:w-1/2 mb-6 md:flex md:justify-end">
          <Image
            src="/digitalPrescription/abdm_image.jpg"
            alt="ABHA Card"
            className="rounded-lg shadow-md"
            width={450}
            height={450}
            priority
          />
        </div>
      </section>
    </div>
  );
};

export default ABDMPage;
