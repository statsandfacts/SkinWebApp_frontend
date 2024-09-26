"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/button";
import InputField from "@/components/common/InputField";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignUpData,
  setStep,
  setTermConditionModal,
  setUser,
} from "@/redux/slices/digitalPrescription/auth.slice";
import { CreateUser, login } from "@/services/api.digitalPrescription.service";
import dayjs from "dayjs";
import { RootState } from "@/redux/store";
import { setLoginModal } from "@/redux/slices/loginModal.slice";
import { useRouter } from "next/navigation";
import { Checkbox, Link } from "@nextui-org/react";
import TermsAndConditionsModal from "../TermsAndConditionsModal";

const CollectPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { signUpData } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password") as any, ""], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        dispatch(setSignUpData({ password_hash: values.confirm_password }));
        const payload = {
          name: `${signUpData.first_name} ${signUpData.last_name}`,
          password_hash: values.confirm_password,
          email: signUpData.email,
          phone_no: signUpData?.phone_number,
          user_type: "patient",
          dob: dayjs(signUpData?.dob).format("DD/MM/YYYY"),
          gender: signUpData?.gender,
          marital_status: signUpData?.marital_status,
        };

        CreateUser(payload)
          .then((response: any) => {
            toast.success("User Signup successful!");
            router.push("/");
            const patient_user_id = response.user_id;
            // dispatch(setLoginModal(true));

            //!Login Process
            const payloadLogin = {
              user_role: "1",
              email_or_phone_no: signUpData.email,
              session_id: new Date().getTime().toString(),
              password: values.confirm_password,
            };
            login(payloadLogin)
              .then((data) => {
                const userId = data.user_id;
                dispatch(setUser({ userId, sessionId: payloadLogin.session_id }));
                router.push("/upload-prescription/prescriptions");
              })
              .catch((error) => {
                toast.success("Login failed");
              });
          })
          .catch((error: any) => {
            toast.error(
              error.response?.data?.details || "Something went wrong"
            );
          })
          .finally(() => setIsLoading(false));

        dispatch(setStep(3));
      } catch (error) {
        toast.error("Error updating password");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col justify-center gap-3 w-full max-w-md px-5 mt-3"
        onSubmit={formik.handleSubmit}
      >
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
        />

        <div className="flex justify-center items-center">
          <Checkbox defaultSelected />
          <div className="text-sm">
            By Creating an account I agree to the{" "}
            <span
              className="font-semibold hover:underline text-sky-900"
              onClick={() => dispatch(setTermConditionModal(true))}
            >
              Terms and Conditions
            </span>{" "}
            and{" "}
            <Link
              href="/policy/privacy-policy"
              className="font-semibold text-sm hover:underline text-sky-900"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <Button type="submit" color="primary" isLoading={isLoading}>
          Submit
        </Button>
      </form>

      <TermsAndConditionsModal />
    </>
  );
};

export default CollectPassword;
