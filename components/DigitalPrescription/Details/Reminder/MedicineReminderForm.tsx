import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState } from "react";
import InputField from "@/components/common/InputField";
import SearchMedicinePortal from "./SearchMedicinePortal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormValues {
  medicineName: string;
  tillWhen: string;
  time: any;
}

const MedicineReminderForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      medicineName: "",
      tillWhen: "",
      time: null,
    },
    validationSchema: Yup.object({
      medicineName: Yup.string()
        .required("Medicine name is required")
        .min(2, "Medicine name must be at least 2 characters"),
      tillWhen: Yup.date()
        .required("Please provide a valid date")
        .min(new Date(), "The date must be in the future"),
      time: Yup.string().required("Time is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        console.log("values=======", values);
        toast.success(`Reminder set for ${values.medicineName}`);
      } catch (error: any) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleMedicineChange = (medicine: any) => {
    formik.setFieldValue("medicineName", medicine.name);
  };

  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col gap-5 w-full max-w-md px-5"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full">
          <label htmlFor="medicineName" className="text-sm font-medium text-gray-900">
            Medicine Name
          </label>
          <SearchMedicinePortal
            selectedName={formik.values.medicineName}
            handleOnChange={handleMedicineChange}
          />
          {formik.errors.medicineName && formik.touched.medicineName && (
            <div className="text-red-500 text-sm">
              {formik.errors.medicineName}
            </div>
          )}
        </div>

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

        <div className="relative flex flex-col">
          <label htmlFor="time" className="text-sm font-medium text-gray-900">
            Time (HH:MM AM/PM)
          </label>
          <DatePicker
            selected={formik.values.time}
            onChange={(val) => formik.setFieldValue("time", val)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholderText="Select Time"
            onBlur={formik.handleBlur}
          />
          {typeof formik.errors.time === "string" && formik.touched.time && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.time}
            </div>
          )}
        </div>

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
