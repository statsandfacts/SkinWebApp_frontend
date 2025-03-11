import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

const PulseOximeterBlog: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("spo2");
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

      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 gap-6">
        <p className="sm:w-2/3 mb-4 sm:mb-6 text-gray-700 text-justify leading-relaxed">
          {t("title_desc")}
        </p>

        {/* Image on the right side for larger screens */}
        <div className="sm:w-1/3 flex justify-center sm:justify-end">
          <Image
            src={"/digitalPrescription/oxymeter.jpeg"}
            alt="Pulse Oximeter"
            width={300} // Adjust width as needed
            height={300} // Adjust height as needed
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("what_is_spo2")}
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          {t("spo2_desc")}
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("test_preparation")}
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>{t("stay_still")}</li>
          <li>{t("warm_fingers")}</li>
          <li>{t("avoid_nail_polish")}</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("understanding_pulse_oximeter")}
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          {t("how_it_works")}
        </p>

        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
          {t("blood_oxygen_saturation")}
        </h3>
        <p className="text-gray-700 mb-4 leading-relaxed text-justify">
          {t("blood_oxygen_saturation_desc")}
        </p>

        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
          {t("pulse_rate")}
        </h3>
        <p className="text-gray-700 leading-relaxed text-justify">
          {t("pulse_rate_desc")}
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("uses_of_pulse_oximeter")}
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>{t("uses_list_1")}</li>
          <li>{t("uses_list_2")}</li>
          <li>{t("uses_list_3")}</li>
          <li>{t("uses_list_4")}</li>
          <li>{t("uses_list_5")}</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("what_does_pulse_oximeter_measure")}
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>{t("oxygen_saturation")}</li>
          <li>{t("pulse_rate_measure")}</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          {t("faq")}
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>{t("normal_spo2_level")}</li>
          <li>{t("accuracy_of_pulse_oximeter")}</li>
          <li>{t("use_pulse_oximeter_at_home")}</li>
          <li>{t("low_oxygen_level_action")}</li>
          <li>{t("replace_doctor_diagnosis")}</li>
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

export default PulseOximeterBlog;
