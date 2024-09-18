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
  setStep,
} from "@/redux/slices/digitalPrescription/auth.slice";
import {
  sendOtp,
  verifyExistingUser,
} from "@/services/api.digitalPrescription.service";
import { setLoginModal } from "@/redux/slices/loginModal.slice";
import LoginModal from "../LoginModal";

const CollectPhone = () => {
  const dispatch = useDispatch();
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseOtp, setResponseOtp] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      phone_number: "",
      otp: "",
    },
    validationSchema: Yup.object().shape({
      phone_number: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
      otp: Yup.string().test(
        "required-otp",
        "OTP is required",
        function (value) {
          return otpSent ? !!value : true;
        }
      ),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      if (!otpSent) {
        verifyExistingUser(values.phone_number)
          .then((response) => {
            sendOtp({
              phone_number: values.phone_number,
            })
              .then((res) => {
                setResponseOtp(res.verification_code);
                setOtpSent(true);
                toast.success("OTP sent successfully!");
              })
              .catch((err) => {
                toast.error("Error sending OTP");
              });
          })
          .catch((error) => {
            if (error.response.data?.message === "User Exists.") {
              toast.warning("Phone number already registered!");
            } else {
              toast.error("Error to check user already exist or not!");
            }
          })
          .finally(() => setIsLoading(false));
      } else {
        try {
          if (responseOtp === values.otp) {
            toast.success("OTP verified successfully!");
            dispatch(setSignUpData({ phone_number: values.phone_number }));
            dispatch(setStep(1));
          } else {
            toast.error("Invalid OTP");
          }
        } catch (error) {
          toast.error("Error verifying OTP");
        } finally {
          setIsLoading(false);
        }
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
          disabled={otpSent}
        />

        {otpSent && (
          <InputField
            onChange={formik.handleChange}
            isLabel={true}
            value={formik.values.otp}
            type="text"
            name="otp"
            placeholder="Enter OTP"
            error={
              formik.touched.otp && formik.errors.otp ? formik.errors.otp : ""
            }
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
          />
        )}

        <Button type="submit" color="primary" isLoading={isLoading}>
          {otpSent ? "Verify OTP" : "Send OTP"}
        </Button>

        <div className="mt-3 text-center">
          <p className="text-gray-700 text-sm">
            Already have an account?{" "}
            <span
              className="text-sky-800 font-semibold cursor-pointer"
              onClick={() => dispatch(setLoginModal(true))}
            >
              Please login
            </span>
          </p>
        </div>
      </form>

      <LoginModal isCloseIcon={false} />
    </>
  );
};

export default CollectPhone;
