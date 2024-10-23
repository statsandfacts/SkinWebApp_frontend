"use client";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState } from "react";
import InputField from "@/components/common/InputField";

interface FormValues {
  medicineName: string;
  tillWhen: string;
  time: string;
}

const MedicineReminderForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      medicineName: "",
      tillWhen: "",
      time: "",
    },
    validationSchema: Yup.object({
      medicineName: Yup.string()
        .required("Medicine name is required")
        .min(2, "Medicine name must be at least 2 characters"),
      tillWhen: Yup.date()
        .required("Please provide a valid date")
        .min(new Date(), "The date must be in the future"),
      time: Yup.string()
        .matches(
          /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
          "Time must be in HH:MM AM/PM format"
        )
        .required("Time is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        toast.success(`Reminder set for ${values.medicineName}`);
      } catch (error: any) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col gap-5 w-full max-w-md px-5"
        onSubmit={formik.handleSubmit}
      >
        <InputField
          onChange={formik.handleChange}
          value={formik.values.medicineName}
          type="text"
          isLabel={true}
          name="medicineName"
          placeholder="Medicine Name"
          onBlur={formik.handleBlur}
          error={
            formik.errors.medicineName && formik.touched.medicineName
              ? formik.errors.medicineName
              : ""
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <InputField
          onChange={formik.handleChange}
          value={formik.values.tillWhen}
          type="date"
          name="tillWhen"
          placeholder="Till When"
          isLabel={true}
          onBlur={formik.handleBlur}
          error={
            formik.errors.tillWhen && formik.touched.tillWhen
              ? formik.errors.tillWhen
              : ""
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <InputField
          onChange={formik.handleChange}
          value={formik.values.time}
          type="text"
          name="time"
          isLabel={true}
          placeholder="Time (HH:MM AM/PM)"
          onBlur={formik.handleBlur}
          error={
            formik.errors.time && formik.touched.time ? formik.errors.time : ""
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        {/* Submit Button */}
        <Button
          isLoading={isLoading}
          type="submit"
          className="p-6 w-full text-white bg-sky-900 rounded-xl"
        >
          Set Reminder
        </Button>
      </form>
    </>
  );
};

export default MedicineReminderForm;
