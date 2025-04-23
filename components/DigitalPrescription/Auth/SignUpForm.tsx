"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@heroui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Checkbox, Select, SelectItem } from "@heroui/react";
import { useDispatch } from "react-redux";
import InputField from "@/components/common/InputField";
import { setLoginModal } from "@/redux/slices/loginModal.slice";
import { CreateUser } from "@/services/api.digitalPrescription.service";
import dayjs from "dayjs";

interface SignupFormValues {
  name: string;
  email: string;
  phone_number: string;
  zip_code: string;
  dob: string;
  password: string;
  confirm_password: string;
  gender: string;
}

const SignupForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: SignupFormValues = {
    name: "",
    email: "",
    phone_number: "",
    zip_code: "",
    dob: "",
    password: "",
    confirm_password: "",
    gender: "Male",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone_number: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    zip_code: Yup.string().required("Zip code is required"),
    dob: Yup.date().required("Date of Birth is required").nullable(),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    gender: Yup.string().required("Gender is required"), // Add validation for gender
  });

  const formik = useFormik<SignupFormValues>({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const payload = {
        name: values?.name,
        password_hash: values?.confirm_password,
        gender: values?.gender,
        email: values?.email,
        phone_no: values?.phone_number,
        zipcode: values?.zip_code,
        preferred_language: "eng",
        user_type: "patient",
        dob: dayjs(values?.dob).format("DD/MM/YYYY"), //"08/09/1994",
      };
      setIsLoading(true);
      CreateUser(payload)
        .then((response: any) => {
          toast.success("Signup successful!");
          // router.push("/auth/login");
          dispatch(setLoginModal(true));
        })
        .catch((error: any) => {
          toast.error(error.response?.data?.details || "Something went wrong");
        })
        .finally(() => setIsLoading(false));
    },
  });

  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col justify-center gap-3 w-full h-full max-w-md px-5 mt-3"
        onSubmit={formik.handleSubmit}
      >
        <InputField
          onChange={formik.handleChange}
          isLabel={true}
          value={formik.values.name}
          type="text"
          name="name"
          placeholder="Name"
          error={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <InputField
          onChange={formik.handleChange}
          isLabel={true}
          value={formik.values.email}
          type="email"
          name="email"
          placeholder="Email"
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <InputField
          onChange={formik.handleChange}
          isLabel={true}
          value={formik.values.phone_number}
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          error={
            formik.touched.phone_number && formik.errors.phone_number
              ? formik.errors.phone_number
              : ""
          }
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <InputField
          onChange={formik.handleChange}
          isLabel={true}
          value={formik.values.password}
          type="password"
          name="password"
          placeholder="Password"
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <InputField
          onChange={formik.handleChange}
          isLabel={true}
          value={formik.values.confirm_password}
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          error={
            formik.touched.confirm_password && formik.errors.confirm_password
              ? formik.errors.confirm_password
              : ""
          }
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <div className="flex gap-2 justify-between w-full">
          <InputField
            onChange={formik.handleChange}
            isLabel={true}
            value={formik.values.dob}
            type="date"
            name="dob"
            placeholder="Date of Birth"
            error={
              formik.touched.dob && formik.errors.dob ? formik.errors.dob : ""
            }
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <InputField
            onChange={formik.handleChange}
            isLabel={true}
            value={formik.values.zip_code}
            type="text"
            name="zip_code"
            placeholder="Zip Code"
            error={
              formik.touched.zip_code && formik.errors.zip_code
                ? formik.errors.zip_code
                : ""
            }
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="w-full">
          <Select
            name="gender"
            label="Select Your Gender"
            onChange={(e) => formik.handleChange}
            value={formik.values.gender}
          >
            <SelectItem key={"Male"} >
              Male
            </SelectItem>
            <SelectItem key={"Female"}>
              Female
            </SelectItem>
          </Select>
        </div>

        <Checkbox defaultSelected>
          <div className="text-sm">
            By Creating an account I agree to the{" "}
            <Link
              href="/policy/terms-and-condition"
              className="font-semibold hover:underline text-sky-900"
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/policy/privacy-policy"
              className="font-semibold hover:underline text-sky-900"
            >
              Privacy Policy
            </Link>
          </div>
        </Checkbox>
        <Button type="submit" color="primary" isLoading={isLoading}>
          Create account
        </Button>
        <span className="text-center">
          Already have an account?{" "}
          <Button
            className="p-0 m-0"
            variant="light"
            onClick={() => dispatch(setLoginModal(true))}
          >
            Log in here
          </Button>
        </span>
      </form>
    </>
  );
};

export default SignupForm;
