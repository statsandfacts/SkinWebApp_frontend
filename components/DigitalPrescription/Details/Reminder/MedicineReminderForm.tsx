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
import { setReminder } from "@/services/api.digitalPrescription.service";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { setIsReminderModal } from "@/redux/slices/digitalPrescription/drug.slice";
import dayjs from "dayjs";

interface FormValues {
  medicineName: string;
  tillWhen: string;
  time: any;
  reminderDays: string;
}

const MedicineReminderForm = () => {
  const dispatch = useDispatch();
  const { userId } = useAuthInfo();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      medicineName: "",
      tillWhen: "",
      time: null,
      reminderDays: "",
    },
    validationSchema: Yup.object({
      medicineName: Yup.string()
        .required("Medicine name is required")
        .min(2, "Medicine name must be at least 2 characters"),
      tillWhen: Yup.date().required("Please provide a valid date"),
      time: Yup.string().required("Time is required"),
      reminderDays: Yup.string()
        .min(1, "Days between reminders must be at least 1")
        .optional(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const reminder = await setReminder({
          user_id: userId,
          medicine_name: values?.medicineName,
          reminder_start_date: values?.tillWhen,
          reminder_time: dayjs(values?.time).format("HH:mm:ss"),
          reminder_days: values?.reminderDays,
        });

        const formattedDate = dayjs(values.tillWhen).format("MMMM D, YYYY");
        const formattedTime = dayjs(values.time).format("h:mm:ss A");
        toast.success(
          `Reminder set successfully! You'll receive reminders for "${
            values.medicineName
          }" every ${
            values.reminderDays || "day"
          } starting from ${formattedDate} at ${formattedTime}.`
        );
        dispatch(setIsReminderModal(false));
        formik.resetForm();
      } catch (error: any) {
        const errorMsg =
          error?.response?.data?.error ||
          "Something went wrong. Please try again.";
        toast.error(errorMsg);
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
        className="flex flex-col gap-4 w-full max-w-md px-5"
        onSubmit={formik.handleSubmit}
      >
        {/* <div className="w-full">
          <label
            htmlFor="medicineName"
            className="text-sm font-medium text-gray-900"
          >
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
        </div> */}

        <InputField
          onChange={formik.handleChange}
          value={formik.values.medicineName}
          type="text"
          name="medicineName"
          placeholder="Medicine Name"
          isLabel={true}
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
          placeholder="Reminder Start Date"
          isLabel={true}
          onBlur={formik.handleBlur}
          error={
            formik.errors.tillWhen && formik.touched.tillWhen
              ? formik.errors.tillWhen
              : ""
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex flex-col">
            <label htmlFor="time" className="text-sm font-medium text-gray-700">
              Time (HH:MM AM/PM)
            </label>
            <DatePicker
              selected={formik.values.time}
              onChange={(val) => formik.setFieldValue("time", val)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={1}
              timeCaption="Time"
              dateFormat="h:mm:ss aa"
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

          <InputField
            onChange={formik.handleChange}
            value={formik.values.reminderDays}
            type="number"
            name="reminderDays"
            placeholder="Days between reminders"
            isLabel={true}
            onBlur={formik.handleBlur}
            error={
              formik.errors.reminderDays && formik.touched.reminderDays
                ? formik.errors.reminderDays
                : ""
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
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
