import { Button } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InputField from "@/components/common/InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  setReminder,
  updateReminder,
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
  medicine: { medicineName: string } | null;
  onClose: () => void;
}

const MedicineRemFromDirPre = ({
  medicine,
  onClose,
}: MedicineReminderFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const { userId } = useAuthInfo();
  const [isLoading, setIsLoading] = useState(false);
  const { reminderActionKey, reminderMedicineDtls } = useSelector(
    (state: RootState) => state.drugs
  );

  const formik = useFormik<FormValues>({
    initialValues: {
     medicineName: medicine?.medicineName || reminderMedicineDtls?.medicineName || "",

      tillWhen: "",
      time: null,
      reminderDays: "",
    },
    validationSchema: Yup.object({
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
            medicine_name: medicine?.medicineName,
            reminder_start_date: values?.tillWhen,
            reminder_time: dayjs(values?.time).format("HH:mm:ss"),
            reminder_days: values?.reminderDays,
          });
          toast.success(
            `Reminder set successfully for ${medicine?.medicineName}!`
          );
        } else if (reminderActionKey === "edit") {
          await updateReminder({
            id: reminderMedicineDtls?.id,
            medicine_name: medicine?.medicineName,
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
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form
      autoComplete="off"
      className="flex flex-col gap-4 w-full max-w-md px-5"
      onSubmit={formik.handleSubmit}
    >
     <InputField
  value={selectedMedicine} // Show selected medicine name
  type="text"
  name="medicineName"
  placeholder="Medicine Name"
  isLabel={true}
  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
  onChange={(e) => setSelectedMedicine(e.target.value)}  
/>





      <InputField
        onChange={formik.handleChange}
        value={formik.values.tillWhen}
        type="date"
        name="tillWhen"
        placeholder="Reminder Start Date"
        isLabel={true}
        onBlur={formik.handleBlur}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex flex-col">
          <label htmlFor="time" className="text-sm font-medium text-gray-700">
            Time
          </label>
          <DatePicker
            selected={formik.values.time}
            onChange={(val) => formik.setFieldValue("time", val)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
            placeholderText="Select Time"
            onBlur={formik.handleBlur}
          />
        </div>

        <InputField
          onChange={formik.handleChange}
          value={formik.values.reminderDays}
          type="number"
          name="reminderDays"
          placeholder="Days"
          isLabel={true}
          onBlur={formik.handleBlur}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg p-4"
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
  );
};

export default MedicineRemFromDirPre;
