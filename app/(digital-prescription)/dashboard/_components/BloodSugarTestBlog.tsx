"use client";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const BloodSugarTestBlog = () => {
  const router = useRouter();
  const t = useTranslations("Sugar");

  return (
    <div className="md:max-w-4xl xl:max-w-6xl mx-auto bg-white p-6 md:p-10 ">
      <div className="flex justify-between items-center mb-3 md:mb-6">
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center text-slate-600 mb-2 transition ease-in-out duration-200 hover:text-sky-700 hover:translate-x-1"
        >
          <ChevronLeftIcon className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
          Back
        </button>
        <LanguageSwitcher />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-sky-800 mb-6 text-center">
        {t("title")}
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("what_is_diabetes")}
        </h2>
        <p className="text-gray-600 leading-relaxed">{t("diabetes_desc")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("blood_sugar_tests")}
        </h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>
            <strong>{t("fbs_sugar")}</strong> {t("fbs_drsc")}
            <span className="text-green-500">{t("fbs_normal")}</span>
            <span className="text-red-500"> {t("fbs_dia")}</span>
          </li>
          <li>
            <strong>{t("bps_test")}</strong> {t("bps_desc")}
            <span className="text-green-500">{t("bps_normal")}</span>
            <span className="text-red-500"> {t("bps_dia")}</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("test_prep_tips")}
        </h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>{t("fbs_tip")}</li>
          <li>{t("ppbs_tip")}</li>
          <li>{t("avoid_caffeine")}</li>
          <li>{t("stay_relaxed")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("understanding_diabetes_types")}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="font-semibold text-blue-600">{t("types_1")}</h3>
            <p className="text-gray-600 text-sm">{t("type_1_diabetes")}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-md">
            <h3 className="font-semibold text-green-600">{t("types_2")}</h3>
            <p className="text-gray-600 text-sm">{t("type_2_diabetes")}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-md">
            <h3 className="font-semibold text-yellow-600">{t("types_3")}</h3>
            <p className="text-gray-600 text-sm">{t("type_3_diabetes")}</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("faq")}
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-gray-800">{t("faq_1")}</h3>
            <p className="text-gray-600">{t("faq_1_ans")}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-gray-800">{t("faq_2")}</h3>
            <p className="text-gray-600">{t("faq_2_ans")}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-gray-800">{t("faq_3")}</h3>
            <p className="text-gray-600">{t("faq_3_ans")}</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("conclusions")}
        </h2>
        <p className="text-gray-600">{t("conclusion_text")}</p>
      </section>
    </div>
  );
};

export default BloodSugarTestBlog;
