"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/button";
import InputField from "@/components/common/InputField";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  setSignUpData,
  setSignUpProcess2Step,
  setStep,
} from "@/redux/slices/digitalPrescription/auth.slice";
import { Select, SelectItem } from "@nextui-org/react";

const CollectSignUpData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      dob: "",
      gender: "",
      marital_status: "",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      dob: Yup.date()
        .required("Date of birth is required")
        .max(new Date(), "Date of birth cannot be in the future"),
      gender: Yup.string().required("Gender is required"),
      marital_status: Yup.string().required("Marital Status is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        dispatch(setSignUpData(values));
        toast.success("Data submitted successfully!");
        dispatch(setStep(3));
        dispatch(setSignUpProcess2Step(2));
      } catch (error) {
        toast.error("Error submitting data");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form
      autoComplete="off"
      className="flex flex-col justify-center gap-3 w-full max-w-md px-5 mt-3"
      onSubmit={formik.handleSubmit}
    >
      <InputField
        onChange={formik.handleChange}
        isLabel={true}
        value={formik.values.first_name}
        type="text"
        name="first_name"
        placeholder="First Name"
        error={
          formik.touched.first_name && formik.errors.first_name
            ? formik.errors.first_name
            : ""
        }
        onBlur={formik.handleBlur}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
      />

      <InputField
        onChange={formik.handleChange}
        isLabel={true}
        value={formik.values.last_name}
        type="text"
        name="last_name"
        placeholder="Last Name"
        error={
          formik.touched.last_name && formik.errors.last_name
            ? formik.errors.last_name
            : ""
        }
        onBlur={formik.handleBlur}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
      />

      <InputField
        onChange={formik.handleChange}
        isLabel={true}
        value={formik.values.email}
        type="email"
        name="email"
        placeholder="Email"
        error={
          formik.touched.email && formik.errors.email ? formik.errors.email : ""
        }
        onBlur={formik.handleBlur}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
      />

      <InputField
        onChange={formik.handleChange}
        isLabel={true}
        value={formik.values.dob}
        type="date"
        name="dob"
        placeholder="Date of Birth"
        error={formik.touched.dob && formik.errors.dob ? formik.errors.dob : ""}
        onBlur={formik.handleBlur}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
      />

      <div className="w-full flex gap-3">
        <Select
          name="gender"
          label="Gender"
          onChange={formik.handleChange}
          value={formik.values.gender}
          errorMessage={formik.touched.gender && formik.errors.gender ? formik.errors.gender : ""}
        >
          <SelectItem value={"male"} key={"male"}>Male</SelectItem>
          <SelectItem value={"female"} key={"female"}>Female</SelectItem>
          <SelectItem value={"other"} key={"other"}>Other</SelectItem>
        </Select>

        <Select
          name="marital_status"
          label="Marital Status"
          onChange={formik.handleChange}
          value={formik.values.marital_status}
          errorMessage={formik.touched.marital_status && formik.errors.marital_status ? formik.errors.marital_status : ""}
        >
          <SelectItem value={"single"} key={"single"}>Single</SelectItem>
          <SelectItem value={"married"} key={"married"}>Married</SelectItem>
          <SelectItem value={"separated"} key={"separated"}>Separated</SelectItem>
        </Select>
      </div>

      <Button type="submit" color="primary" isLoading={isLoading}>
        Submit
      </Button>
    </form>
  );
};

export default CollectSignUpData;
