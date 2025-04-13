import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Input,
  Button,
} from "@nextui-org/react";
import * as Yup from "yup";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import axios from "axios";
import { useFormik } from "formik";

const RefillReminderModal = ({ isOpen, onClose }: any) => {
  const { userId } = useAuthInfo();

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: {
      user_id: userId,
      medicine_name: "",
      medicine_o_id: "",
      dosage: "",
      start_date: "",
      days: "",
    },
    validationSchema: Yup.object({
      medicine_name: Yup.string().required("Medicine Name is required"),
      medicine_o_id: Yup.string().required("Medicine ID is required"),
      dosage: Yup.string().required("Dosage is required"),
      start_date: Yup.string().required("Start Date is required"),
      days: Yup.string().required("Number of days is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setSubmitError("");

      try {
        // Proceed with API request if validation passes
        await axios.post("/api/refill-reminder", values);
        console.log("Reminder set successfully");
        onClose();
      } catch (err) {
        console.error("Failed to set reminder:", err);
        setSubmitError("Failed to submit. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Set Refill Reminder</ModalHeader>
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label className="text-sm font-medium mb-1 block">Medicine Name</label>
              <Input
                name="medicine_name"
                onChange={formik.handleChange}
                value={formik.values.medicine_name}
                isRequired
              />
              {formik.errors.medicine_name && formik.touched.medicine_name && (
                <p className="text-sm text-red-500">{formik.errors.medicine_name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Medicine Original ID</label>
              <Input
                name="medicine_o_id"
                onChange={formik.handleChange}
                value={formik.values.medicine_o_id}
                isRequired
              />
              {formik.errors.medicine_o_id && formik.touched.medicine_o_id && (
                <p className="text-sm text-red-500">{formik.errors.medicine_o_id}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Dosage</label>
              <Input
                name="dosage"
                onChange={formik.handleChange}
                value={formik.values.dosage}
                isRequired
              />
              {formik.errors.dosage && formik.touched.dosage && (
                <p className="text-sm text-red-500">{formik.errors.dosage}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Start Date</label>
              <Input
                name="start_date"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.start_date}
                isRequired
              />
              {formik.errors.start_date && formik.touched.start_date && (
                <p className="text-sm text-red-500">{formik.errors.start_date}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Days</label>
              <Input
                name="days"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.days}
                isRequired
              />
              {formik.errors.days && formik.touched.days && (
                <p className="text-sm text-red-500">{formik.errors.days}</p>
              )}
            </div>

            {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

            <Button color="primary" type="submit" isLoading={loading}>
              Submit
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RefillReminderModal;
  