import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BMIInfo: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("bmi");

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
          {t("what_is_bmi")}
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 gap-6">
          <div className="sm:w-2/3 mb-4 sm:mb-6 text-gray-700 text-justify leading-relaxed">
            <p>{t("bmi_desc")}</p>
            <p className="mt-2">{t("bmi_formula")}</p>
          </div>

          {/* Image on the right side for larger screens */}
          <div className="sm:w-1/3 flex justify-center sm:justify-end">
            <Image
              src="/digitalPrescription/bmi.jpeg"
              alt="BMI Calculation"
              width={300} // Adjust width as needed
              height={300} // Adjust height as needed
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("bmi_tests")}
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>{t("bmi_test_preparation_1")}</li>
          <li>{t("bmi_test_preparation_2")}</li>
          <li>{t("bmi_test_preparation_3")}</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("understanding_bmi_score")}
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          {t("understanding_bmi_desc")}
        </p>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>{t("underweight")}</li>
          <li>{t("normal_weight")}</li>
          <li>{t("overweight")}</li>
          <li>{t("obese")}</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("bmi_usage")}
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          {t("bmi_usage_desc")}
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("faq")}
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>
            <strong>{t("bmi_best_health_measure")}</strong>
            <p>{t("bmi_best_health_answer")}</p>
          </li>
          <li>
            <strong>{t("healthy_bmi")}</strong>
            <p>{t("healthy_bmi_answer")}</p>
          </li>
          <li>
            <strong>{t("bmi_inaccuracy")}</strong>
            <p>{t("bmi_inaccuracy_answer")}</p>
          </li>
          <li>
            <strong>{t("bmi_for_children")}</strong>
            <p>{t("bmi_for_children_answer")}</p>
          </li>
          <li>
            <strong>{t("lower_bmi")}</strong>
            <p>{t("lower_bmi_answer")}</p>
          </li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("conclusion")}
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          {t("conclusion_text")}
        </p>
      </section>
    </div>
  );
};

export default BMIInfo;
