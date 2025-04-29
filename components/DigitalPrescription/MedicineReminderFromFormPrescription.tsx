import {Button} from "@heroui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InputField from "@/components/common/InputField";

import SearchMedicinePortal from "./Details/Reminder/SearchMedicinePortal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  setReminder,
  updateReminder,
  updateMedicineDetails ,
} from "@/services/api.digitalPrescription.service";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { setIsReminderModal } from "@/redux/slices/digitalPrescription/drug.slice";
import dayjs from "dayjs";
import { fetchPatientDashboard } from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { AppDispatch, RootState } from "@/redux/store";

interface FormValues {
  medicineName: string;
  tillWhen: any;
  time: any;
  reminderDays: string;
}

interface MedicineReminderFormProps {
  onClose?: any;
}

const MedicineReminderFormFormPrescription = ({
  onClose,
}: MedicineReminderFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();
  const [isLoading, setIsLoading] = useState(false);

  const { reminderActionKey, reminderMedicineDtls } = useSelector(
    (state: RootState) => state.drugs
  );

  const formik = useFormik<FormValues>({
    initialValues: {
      medicineName: "",
      tillWhen: "",
      time: null,
      reminderDays: "",
    },
    validationSchema: Yup.object({
      medicineName: Yup.string().min(
        2,
        "Medicine name must be at least 2 characters"
      ),
      tillWhen: Yup.date().required("Please provide a valid date"),
      time: Yup.string().required("Time is required"),
      reminderDays: Yup.string()
        .min(1, "Days between reminders must be at least 1")
        .optional(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        if (reminderActionKey === "create") {
          await setReminder({
            user_id: userId,
            medicine_name: values?.medicineName,
            reminder_start_date: values?.tillWhen,
            reminder_time: dayjs(values?.time).format("HH:mm:ss"),
            reminder_days: values?.reminderDays,
          });
          const formattedDate = dayjs(values.tillWhen).format("MMMM D, YYYY");
          const formattedTime = dayjs(values.time).format("h:mm:ss A");
          toast.success(
            `Reminder set successfully!`
          );
        } else if (reminderActionKey === "edit") {
          await updateReminder({
            id: reminderMedicineDtls?.id,
            medicine_name: values?.medicineName,
            reminder_start_date: values?.tillWhen,
            reminder_time: dayjs(values?.time).format("HH:mm:ss"),
            reminder_days: values?.reminderDays,
          });
          toast.success("Reminder updated successfully.");
        }

        dispatch(fetchPatientDashboard(userId));
        onClose();
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

  useEffect(() => {
    if (
      (reminderActionKey === "edit" || reminderActionKey === "view") &&
      reminderMedicineDtls
    ) {
      const todayDate = dayjs().format("YYYY-MM-DD");
      const reminderTime = dayjs(
        `${todayDate} ${reminderMedicineDtls.reminder_time}`,
        "YYYY-MM-DD HH:mm:ss"
      ).toDate();
      formik.setValues({
        medicineName: reminderMedicineDtls.medicine_name || "",
        tillWhen: reminderMedicineDtls.reminder_start_date,
        time: reminderTime,
        reminderDays: reminderMedicineDtls.reminder_days || "",
      });
    }
  }, [reminderActionKey, reminderMedicineDtls]);

  const handleMedicineChange = async (medicine: any) => {
    formik.setFieldValue("medicineName", medicine.name);
  
    
  };
  
  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col gap-4 w-full max-w-md px-5"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full relative">
          <label
            htmlFor="medicineName"
            className="text-sm font-medium text-gray-900"
          >
            Medicine Name
          </label>

          {/* Disable interaction if Redux already has medicine_name */}
          <div
            className={
              reminderMedicineDtls?.medicine_name
                ? "pointer-events-none opacity-50"
                : ""
            }
          >
            <SearchMedicinePortal
              selectedName={
                reminderMedicineDtls?.medicine_name
                  ? reminderMedicineDtls.medicine_name
                  : formik.values.medicineName
              }
              handleOnChange={handleMedicineChange}
            />
          </div>

          {formik.errors.medicineName && formik.touched.medicineName && (
            <div className="text-red-500 text-sm">
              {formik.errors.medicineName}
            </div>
          )}
        </div>

        {/* <InputField
          disabled={reminderActionKey === "view"}
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
        /> */}

        <InputField
          disabled={reminderActionKey === "view"}
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
              disabled={reminderActionKey === "view"}
              selected={formik.values.time}
              onChange={(val) => formik.setFieldValue("time", val)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
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
            disabled={reminderActionKey === "view"}
            onChange={formik.handleChange}
            value={formik.values.reminderDays}
            type="number"
            name="reminderDays"
            placeholder="Days"
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
        {reminderActionKey !== "view" && (
          <Button
            isLoading={isLoading}
            type="submit"
            className="p-6 w-full text-white bg-sky-900 rounded-xl"
          >
            Set Reminder
          </Button>
        )}
      </form>
    </>
  );
};

export default MedicineReminderFormFormPrescription;
