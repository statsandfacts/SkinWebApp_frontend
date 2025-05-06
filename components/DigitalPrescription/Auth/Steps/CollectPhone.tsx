"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@heroui/button";
import InputField from "@/components/common/InputField";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  setLoginModal,
  setSignUpData,
  setSignUpProcess2Step,
  setStep,
} from "@/redux/slices/digitalPrescription/auth.slice";
import {
  sendOtp,
  verifyExistingUser,
  getCountryData,
} from "@/services/api.digitalPrescription.service";

import LoginModal from "../LoginModal";
import LoginDrawer from "../LoginDrawer";

type Country = {
  id: number;
  name: string;
  sortname: string;
  phonecode: string;
};

const CollectPhone = () => {
  const dispatch = useDispatch();
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseOtp, setResponseOtp] = useState<string>("");
  const [country, setCountry] = useState<string>("India");
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [originalPhone, setOriginalPhone] = useState<string>("");
  const [originalEmail, setOriginalEmail] = useState<string>("");
  // Handle phone number change and reset OTP if it changes after OTP is sent
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    formik.handleChange(e); // Handle formik change
    if (otpSent && newPhone !== originalPhone) {
      // If OTP is sent and phone number is changed, reset OTP-related states
      setOtpSent(false);
      setResponseOtp("");
      setResendTimer(0);
      formik.setFieldValue("otp", "");
    }
    setOriginalPhone(newPhone);
  };

  // Handle email change and reset OTP if it changes after OTP is sent
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    formik.handleChange(e); // Handle formik change
    if (otpSent && newEmail !== originalEmail) {
      // If OTP is sent and email is changed, reset OTP-related states
      setOtpSent(false);
      setResponseOtp("");
      setResendTimer(0);
      formik.setFieldValue("otp", "");
    }
    setOriginalEmail(newEmail);
  };
  React.useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    // Fetch dynamic country list
    const fetchCountries = async () => {
      try {
        const res = await getCountryData();
        if (Array.isArray(res)) {
          setCountryList(res);
        } else {
          toast.error("Failed to fetch countries.");
        }
      } catch (error) {
        toast.error("Error fetching country data");
      }
    };

    fetchCountries();

    // Resend timer logic
    if (resendTimer > 0) {
      timerInterval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [resendTimer]);

  const formik = useFormik({
    initialValues: {
      phone_number: "",
      email: "",
      otp: "",
    },
    validationSchema: Yup.object().shape({
      phone_number:
        country === "India"
          ? Yup.string()
              .required("Phone number is required")
              .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
          : Yup.string(),
      email:
        country !== "India"
          ? Yup.string()
              .required("Email is required")
              .email("Invalid email address")
          : Yup.string(),
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
        try {
          await verifyExistingUser({
            phone_number: country === "India" ? values.phone_number : undefined,
            email: country !== "India" ? values.email : undefined,
          });
          
          const res = await sendOtp({
            phone_number: country === "India" ? values.phone_number : null,
            email_id: country !== "India" ? values.email : null,
          });

          if (res.status === 200) {
            setResponseOtp(res.verification_code);
            setOtpSent(true);
            setResendTimer(30);
            toast.success(res.message || "OTP sent successfully!");
          } else {
            toast.error("Something went wrong!");
          }
        } catch (error: any) {
          if (error?.response?.data?.message === "User Exists.") {
            toast.warning("User already registered!");
          } else {
            toast.error(error?.response?.data?.message || "Error sending OTP!");
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        if (values.otp === responseOtp) {
          toast.success("OTP verified successfully!");
          dispatch(
            setSignUpData(
              country === "India"
                ? { phone_number: values.phone_number }
                : { email: values.email }
            )
          );
          dispatch(setStep(1));
          dispatch(setSignUpProcess2Step(1));
        } else {
          toast.error("Invalid OTP");
        }
        setIsLoading(false);
      }
    },
  });
  const resendOtp = async () => {
    try {
      const res = await sendOtp({
        phone_number: country === "India" ? formik.values.phone_number : null,
        email_id: country !== "India" ? formik.values.email : null,
      });

      if (res.status === 200) {
        setResponseOtp(res.verification_code);
        toast.success(res.message || "OTP resent successfully!");
        setResendTimer(30); // Start 30 seconds countdown
      } else {
        toast.error("Failed to resend OTP");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error resending OTP");
    }
  };

  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col justify-center gap-3 w-full px-5 mt-3"
        onSubmit={formik.handleSubmit}
      >
        <label className="text-sm font-medium text-gray-700">
          Select your country
        </label>
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setOtpSent(false);
            formik.setFieldValue("otp", "");
            setResendTimer(0);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {countryList.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}(+{c.phonecode})
            </option>
          ))}
        </select>

        {country === "India" && (
          <InputField
            onChange={handlePhoneChange}
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl p-2 h-10 w-[350px]"
          />
        )}

        {country !== "India" && (
          <InputField
            onChange={handleEmailChange}
            isLabel={true}
            value={formik.values.email}
            type="email_id"
            name="email"
            placeholder="Email Address"
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl p-2 h-10 w-[350px]"
          />
        )}

        {otpSent && (
          <>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl p-2 h-10 w-[350px]"
            />
            <div className="text-right text-sm mt-1">
              {resendTimer > 0 ? (
                <span className="text-gray-500">
                  Resend OTP in {resendTimer}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-blue-600 hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </>
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
      <LoginDrawer />
    </>
  );
};

export default CollectPhone;
