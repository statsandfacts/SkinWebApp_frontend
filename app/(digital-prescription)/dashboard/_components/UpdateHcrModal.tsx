import React, { useState } from "react";
import { Button, ButtonGroup } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatientDashboard,
  setIsUpdateHCRModal,
} from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateHcr } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import { useAuthInfo } from "@/hooks/useAuthInfo";

export default function UpdateHcrModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();
  const { singlePrescriptionDetails } = useSelector(
    (state: any) => state.digitalPrescription
  );
  const { isUpdateHcrModal } = useSelector((state: any) => state.userDashboard);
  const [loading, setIsLoading] = useState<boolean>(false);

  const onClose = () => {
    dispatch(setIsUpdateHCRModal(false));
  };

  const defaultValues = {
    Name: "",
    Phone: "",
    Email: "",
    Gender: "",
    Age: "",
    Height: "",
    Weight: "",
    DOB: "",
    Marital_Status: "",
    Time: "",
    Dia: "",
    Sys: "",
    Pulse_Rate: "",
    fbs: "",
    ppbs: "",
    Drinking: "",
    Smoking: "",
    Date: "",
    bmi: "",
    PULSE_OXIMETER: "",
    weight_between: "",
    result: "",
    bp_category: "",
    spo2: "",
    bp_color_cat: "",
    spo2_color_cat: "",
    sugar_value: "",
    // Chronic_Disease: "",
  };

  const formik = useFormik({
    initialValues: singlePrescriptionDetails?.ocr_op || defaultValues,
    validationSchema: Yup.object({
      Name: Yup.string().required("Name is required"),
      Phone: Yup.string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("Phone is required"),
      //Email: Yup.string().email("Invalid email").required("Email is required"),
      Email: Yup.string().nullable().optional(),
      Gender: Yup.string().required("Gender is required"),
      Age: Yup.string().required("Age is required"),
      Height: Yup.string().required("Height is required"),
      Weight: Yup.string().required("Weight is required"),
      DOB: Yup.string().required("Date of Birth is required"),
      Marital_Status: Yup.string().required("Marital status is required"),
      PULSE_OXIMETER: Yup.string().required("Pulse Oximeter value is required"),
      Dia: Yup.string().required("Diastolic pressure is required"),
      Sys: Yup.string().required("Systolic pressure is required"),
      Pulse_Rate: Yup.string().required("Pulse rate is required"),
      bmi: Yup.string().required("BMI is required"),
      bp_category: Yup.string().required("BP Category is required"),
      spo2: Yup.string().required("SPO2 value is required"),
      Drinking: Yup.string().required("Drinking status is required"),
      Smoking: Yup.string().required("Smoking status is required"),
      fbs: Yup.string().nullable().optional(),
      ppbs: Yup.string().nullable().optional(),
      // Chronic_Disease: Yup.string(),
      Date: Yup.string(),
      weight_between: Yup.string(),
      result: Yup.string(),
      bp_color_cat: Yup.string(),
      spo2_color_cat: Yup.string(),
      sugar_value: Yup.string().nullable().optional(),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      setIsLoading(true);
      updateHcr({
        report_id: singlePrescriptionDetails?.report_id,
        ocr_op: values,
      })
        .then((response) => {
          dispatch(fetchPatientDashboard(userId));
          toast.success("Health Camp Report updated successfully");
          onClose();
        })
        .catch((error) => {
          toast.error("Error updating Health Camp Report");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <Modal
      scrollBehavior="inside"
      size="4xl"
      isOpen={isUpdateHcrModal}
      onClose={onClose}
    >
      <ModalContent className="mb-20">
        {() => (
          <>
            <ModalHeader className="flex justify-between items-center capitalize">
              Update Health Camp Report
            </ModalHeader>

            <ModalBody>
              <form
                onSubmit={formik.handleSubmit}
                className="grid grid-cols-2 gap-2 sm:gap-4 sm:p-4"
              >
                {Object.keys(defaultValues).map((field) => (
                  <React.Fragment key={field}>
                    {["bp_color_cat", "spo2_color_cat"].includes(field) ? (
                      <></>
                    ) : (
                      <div
                        key={field}
                        className={
                          [
                            "Name",
                            "Email",
                            "Phone",
                            "spo2",
                            "sugar_value",
                            // "Chronic_Disease",
                            "result",
                            "weight_between",
                            "bp_category",
                            "PULSE_OXIMETER",
                          ].includes(field)
                            ? "col-span-2 sm:col-span-1"
                            : ""
                        }
                      >
                        <label className="text-gray-700 capitalize">
                          {field === "weight_between"
                            ? "BMI Weight Between"
                            : field === "bp_category"
                            ? "Blood Pressure Category"
                            : field === "result"
                            ? "Weight category"
                            : field.replace(/_/g, " ")}
                        </label>
                        <Input
                          {...formik.getFieldProps(field)}
                          type={"text"}
                          fullWidth
                          isInvalid={
                            !!(formik.touched[field] && formik.errors[field])
                          }
                          errorMessage={
                            formik.touched[field] &&
                            formik.errors[field] &&
                            typeof formik.errors[field] === "string"
                              ? (formik.errors[field] as string)
                              : ""
                          }
                          isDisabled={[
                            "weight_between",
                            "result",
                            "bp_category",
                            "spo2",
                            "sugar_value",
                            "bmi",
                          ].includes(field)}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </form>
            </ModalBody>

            <ModalFooter className="flex justify-end">
              <Button color="danger" onClick={onClose} className="rounded-lg">
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                onClick={() => formik.handleSubmit()}
                isLoading={loading}
                disabled={loading}
                className="rounded-lg"
              >
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
