import React, { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import * as Yup from "yup";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { useFormik } from "formik";
import SearchMedicinePortal from "./SearchMedicinePortal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setRefillReminder,
  updateRefillReminder,
} from "@/services/api.digitalPrescription.service";
import { fetchRefillRemindersApi } from "@/redux/slices/digitalPrescription/refillReminder.slice";

const RefillReminderForm = ({ onClose }: any) => {
  const { refillReminderActionKey, refillReminderData } = useSelector(
    (state: RootState) => state.refillReminder
  );
  const { userId } = useAuthInfo();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      medicineName: "",
      user_id: userId,
      medicine_name: "",
      medicine_o_id: "",
      dosage: "",
      start_date: "",
      days: "",
    },
    validationSchema: Yup.object({
      medicine_name: Yup.string().required("Medicine Name is required"),
      medicine_o_id: Yup.string(),
      dosage: Yup.string().required("Dosage is required"),
      start_date: Yup.string().required("Start Date is required"),
      days: Yup.string().required("Number of days is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setSubmitError("");

      try {
        if (refillReminderActionKey === "create") {
          const response = await setRefillReminder(values);
          toast.success("Reminder set successfully!");
        } else if (refillReminderActionKey === "edit") {
          if (!refillReminderData?.id) {
            return toast.error("Invalid reminder data");
          }
          const response = await updateRefillReminder({
            ...values,
            id: refillReminderData.id,
          });
        }
        if (userId) {
          await dispatch(fetchRefillRemindersApi(userId));
        }
        onClose();
        formik.resetForm();
      } catch (err) {
        console.error("Failed to set reminder:", err);
        setSubmitError("Failed to submit. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (
      (refillReminderActionKey === "edit" ||
        refillReminderActionKey === "view") &&
      refillReminderData
    ) {
      formik.setValues({
        medicineName: refillReminderData?.medicine_name || "",
        medicine_name: refillReminderData?.medicine_name || "",
        medicine_o_id: refillReminderData?.medicine_o_id || "",
        dosage: refillReminderData?.dosage || "",
        start_date: refillReminderData?.start_date || "",
        days: refillReminderData?.days || "",
        user_id: userId,
      });
    } else if (refillReminderActionKey === "create") {
      formik.setFieldValue("user_id", userId);
    }
  }, [refillReminderActionKey, refillReminderData, userId]);

  const handleMedicineChange = (medicine: any) => {
    formik.setFieldValue("medicineName", medicine.name);
    formik.setFieldValue("medicine_name", medicine.name);
    formik.setFieldValue("medicine_o_id", medicine.Id);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Medicine Name */}
      <div className="w-full mb-4">
        <label
          htmlFor="medicineName"
          className="text-sm font-medium text-gray-900"
        >
          Medicine Name
        </label>
        {refillReminderActionKey === "view" ? (
          <div className="p-2 border rounded bg-gray-50 text-gray-700">
            {formik.values.medicineName}
          </div>
        ) : (
          <>
            <SearchMedicinePortal
              selectedName={formik.values.medicineName}
              handleOnChange={handleMedicineChange}
            />
            {formik.errors.medicineName && formik.touched.medicineName && (
              <p className="text-red-500 text-sm">
                {formik.errors.medicineName}
              </p>
            )}
          </>
        )}
      </div>

      {/* Dosage */}
      <div className="w-full mb-4">
        <label htmlFor="dosage" className="text-sm font-medium text-gray-900">
          Dosage
        </label>
        {refillReminderActionKey === "view" ? (
          <div className="p-2 border rounded bg-gray-50 text-gray-700">
            {formik.values.dosage}
          </div>
        ) : (
          <>
            <Input
              id="dosage"
              name="dosage"
              onChange={formik.handleChange}
              value={formik.values.dosage}
              placeholder="Enter dosage"
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-lg"
            />
            {formik.errors.dosage && formik.touched.dosage && (
              <p className="text-red-500 text-sm">{formik.errors.dosage}</p>
            )}
          </>
        )}
      </div>

      {/* Start Date */}
      <div className="w-full mb-4">
        <label
          htmlFor="start_date"
          className="text-sm font-medium text-gray-900"
        >
          Start Date
        </label>
        {refillReminderActionKey === "view" ? (
          <div className="p-2 border rounded bg-gray-50 text-gray-700">
            {formik.values.start_date}
          </div>
        ) : (
          <>
            <Input
              id="start_date"
              name="start_date"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.start_date}
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-lg"
            />
            {formik.errors.start_date && formik.touched.start_date && (
              <p className="text-red-500 text-sm">{formik.errors.start_date}</p>
            )}
          </>
        )}
      </div>
      {/* Days */}
      <div className="w-full mb-4">
        <label htmlFor="days" className="text-sm font-medium text-gray-900">
          Days
        </label>
        {refillReminderActionKey === "view" ? (
          <div className="p-2 border rounded bg-gray-50 text-gray-700">
            {formik.values.days}
          </div>
        ) : (
          <>
            <Input
              id="days"
              name="days"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.days}
              placeholder="Enter number of days"
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-lg"
            />
            {formik.errors.days && formik.touched.days && (
              <p className="text-red-500 text-sm">{formik.errors.days}</p>
            )}
          </>
        )}
      </div>

      {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

      {refillReminderActionKey !== "view" && (
        <Button
          type="submit"
          className="mt-5 p-6 w-full text-white bg-sky-900 rounded-xl"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Set Reminder"}
        </Button>
      )}
    </form>
  );
};

export default RefillReminderForm;
