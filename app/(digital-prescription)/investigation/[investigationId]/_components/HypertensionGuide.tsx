import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const HypertensionGuide: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("BP");

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center mb-4 text-blue-600 focus:outline-none"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
          Back
        </button>
        <LanguageSwitcher />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">
        {t("title")}
      </h1>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("what_is_bp")}
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="sm:w-2/3">
            <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
              {t("bp_desc")}
            </p>
          </div>

          {/* Image on the right side */}
          <div className="sm:w-1/3 flex justify-center sm:justify-end">
            <Image
              src="/digitalPrescription/bp.jpeg"
              alt="Blood Pressure"
              width={300} // Adjust width as needed
              height={300} // Adjust height as needed
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          {t("bp_measured")}
        </div>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2">
          <li>{t("sys")}</li>
          <li>{t("dia")}</li>
        </ul>
        <p className="text-gray-700 leading-relaxed text-justify">
          {t("normal_bp")}
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("blood_pressure_tests")}
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>{t("avoid_caffeine_alcohol_smoking")}</li>
          <li>{t("use_restroom")}</li>
          <li>{t("sit_quietly")}</li>
          <li>{t("wear_loose_clothing")}</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("healthcare_provider_info")}
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>{t("medical_history")}</li>
          <li>{t("medications_supplements")}</li>
          <li>{t("lifestyle_information")}</li>
          <li>{t("symptoms")}</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("understanding_hypertension")}
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          {t("silent_killer")}
        </p>
        <p>{t("types_of_hypertension")}</p>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2">
          <li>{t("primary_hypertension")}</li>
          <li>{t("secondary_hypertension")}</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("hypertension_test")}
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>{t("test_systolic_pressure")}</li>
          <li>{t("test_diastolic_pressure")}</li>
        </ul>
        <p className="text-gray-700 leading-relaxed text-justify">
          {t("hypertension_stages")}
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("faq")}
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>{t("can_hypertension_be_cured")}</li>
          <li>{t("lifestyle_changes")}</li>
          <li>{t("bp_check_frequency")}</li>
          <li>{t("is_hypertension_hereditary")}</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("conclusion")}
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          {t("hypertension_management")}
        </p>
      </section>
    </div>
  );
};

export default HypertensionGuide;
