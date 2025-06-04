"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@heroui/button";
import InputField from "@/components/common/InputField";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignUpData,
  setSignUpProcess2Step,
  setStep,
  setUser,
} from "@/redux/slices/digitalPrescription/auth.slice";
import { Select, SelectItem } from "@heroui/select";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  createCase,
  CreateUser,
  login,
} from "@/services/api.digitalPrescription.service";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { RootState } from "@/redux/store";

const CollectSignUpData = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { signUpData } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const genderOptions = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "other", name: "Other" },
  ];

  const maritalStatusOptions = [
    { id: "single", name: "Single" },
    { id: "married", name: "Married" },
    { id: "separated", name: "Separated" },
  ];

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: signUpData?.email || "",
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
        console.log(values);

        const payload = {
          name: `${values.first_name} ${values.last_name}`,
          email: values.email,
          phone_no: signUpData?.phone_number,
          user_type: "patient",
          dob: dayjs(values?.dob).format("DD/MM/YYYY"),
          gender: values?.gender,
          marital_status: values?.marital_status,
        };

        const response = await CreateUser(payload);
        toast.success("User Signup successful!");

        // const patient_user_id = response.user_id;
        // await CreateCase(patient_user_id); // Commented out as requested

        // Optional: login directly after signup
        const session_id = new Date().getTime().toString();
        const loginPayload = {
          user_role: "1",
          email_or_phone_no: signUpData.phone_number || signUpData.email,
          session_id,
        };

        const loginResponse = await login(loginPayload);
        dispatch(
          setUser({ userId: loginResponse.user_id, sessionId: session_id })
        );
        router.replace("/dashboard");
        cleanUp();
      } catch (error: any) {
        toast.error(error?.response?.data?.details || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const cleanUp = () => {
    dispatch(setStep(0));
    dispatch(setSignUpProcess2Step(2));
  };

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
        disabled={!!signUpData?.email} // disable if already filled
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
          value={formik.values.gender}
          errorMessage={
            formik.touched.gender && formik.errors.gender
              ? formik.errors.gender
              : ""
          }
          onSelectionChange={(key) => {
            const selected = Array.from(key)[0];
            formik.setFieldValue("gender", selected);
          }}
        >
          {genderOptions.map((option) => (
            <SelectItem key={option.id}>{option.name}</SelectItem>
          ))}
        </Select>

        <Select
          name="marital_status"
          label="Marital Status"
          value={formik.values.marital_status}
          errorMessage={
            formik.touched.marital_status && formik.errors.marital_status
              ? formik.errors.marital_status
              : ""
          }
          onSelectionChange={(key) => {
            const selected = Array.from(key)[0];
            formik.setFieldValue("marital_status", selected);
          }}
        >
          {maritalStatusOptions.map((option) => (
            <SelectItem key={option.id}>{option.name}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="w-full flex justify-between max-w-lg mt-3">
        <Button
          variant="flat"
          onClick={() => {
            dispatch(setStep(3));
            dispatch(setSignUpProcess2Step(0));
          }}
          startContent={<ArrowLeftIcon className="w-4 h-4" />}
        >
          Go Back
        </Button>
        <Button
          color="primary"
          variant="solid"
          type="submit"
          isLoading={isLoading}
          endContent={<ArrowRightIcon className="w-4 h-4" />}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default CollectSignUpData;
