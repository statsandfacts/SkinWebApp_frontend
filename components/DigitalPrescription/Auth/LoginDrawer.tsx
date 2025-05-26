"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  setLoginModal,
  setUser,
} from "@/redux/slices/digitalPrescription/auth.slice";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputField from "@/components/common/InputField";
import {
  login,
  sendOtp,
  getCountryData,
} from "@/services/api.digitalPrescription.service";

export default function LoginDrawer() {
  type Country = {
    id: number;
    sortname: string;
    name: string;
    phonecode: number;
  };

  const { isModalOpen } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [responseOtp, setResponseOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [countries, setCountries] = useState<Country[]>([]);

  const isIndia = selectedCountry === "IN";

  // Reset form fields and OTP state when country changes
  useEffect(() => {
    formik.setFieldValue("phone", "");
    formik.setFieldValue("email", "");
    setIsOTPSent(false);
    setResponseOtp("");
    setTimer(30);
    setCanResend(false);
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch countries data when component mounts
    const fetchCountries = async () => {
      try {
        const data = await getCountryData(); // Fetch countries from API
        setCountries(data); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (isOTPSent) {
      setCanResend(false);
      setTimer(30);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setCanResend(true);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOTPSent]);

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  const validationSchema = Yup.object().shape({
    phone: Yup.string().when([], {
      is: () => isIndia,
      then: () =>
        Yup.string()
          .required("Phone number is required")
          .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
      otherwise: () => Yup.string().notRequired(),
    }),
    email: Yup.string()
      .email("Invalid email address")
      .when([], {
        is: () => !isIndia,
        then: () => Yup.string().required("Email is required"),
        otherwise: () => Yup.string().notRequired(),
      }),
    otp: Yup.string().when([], {
      is: () => isOTPSent,
      then: () => Yup.string().required("OTP is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
      otp: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const identifier = isIndia ? values.phone : values.email;

        if (!isOTPSent) {
          const payload = isIndia
            ? { phone_number: values.phone }
            : { email_id: values.email };

          const res = await sendOtp(payload);
          setResponseOtp(res.verification_code);
          toast.success("OTP sent successfully!");
          setIsOTPSent(true);
          return;
        }

        if (isOTPSent) {
          if (values.otp === responseOtp) {
            const session_id = new Date().getTime().toString();
            const data = await login({
              user_role: "1",
              email_or_phone_no: identifier,
              session_id,
            });
            dispatch(setUser({ userId: data.user_id, sessionId: session_id }));
            toast.success("Logged in successfully!");
            onClose();
            router.push("/dashboard");
          } else {
            toast.error("Invalid OTP");
          }
        }
      } catch (err: any) {
        toast.error(err.response?.data?.detail || "Login failed");
      } finally {
        setIsLoading(false);
      }
    },
  });
  // Reset OTP if user edits phone/email manually
useEffect(() => {
  if (isOTPSent) {
    setIsOTPSent(false);
    setResponseOtp("");
    setTimer(30);
    setCanResend(false);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [formik.values.phone, formik.values.email]);

  const onClose = () => {
    dispatch(setLoginModal(false));
    formik.resetForm();
    setIsOTPSent(false);
    setResponseOtp("");
    setCanResend(false);
    setTimer(30);
  };

  const handleSendOtp = async () => {
    try {
      const value = isIndia ? formik.values.phone : formik.values.email;
      const payload = isIndia ? { phone_number: value } : { email_id: value };

      const res = await sendOtp(payload);
      setResponseOtp(res.verification_code);
      toast.success("OTP sent successfully!");

      // Restart the timer
      setIsOTPSent(false); // Reset it first
      setTimeout(() => {
        setIsOTPSent(true); // This will trigger useEffect again
      }, 100); // Small delay ensures useEffect catches the change
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || "Error sending OTP";
      if (
        errorMessage.includes("not registered") ||
        errorMessage.includes("not exist")
      ) {
        toast.error("User not found. Please register first.");
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const startResendTimer = () => {
    setCanResend(false);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCanResend(true);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOtp = async () => {
    try {
      const value = isIndia ? formik.values.phone : formik.values.email;
      const payload = isIndia ? { phone_number: value } : { email_id: value };

      const res = await sendOtp(payload);
      setResponseOtp(res.verification_code);
      toast.success("OTP resent successfully!");

      formik.setFieldTouched("otp", false); // Optional: prevent showing 'required'
      startResendTimer(); // Restart timer manually
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Error resending OTP");
    }
  };
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        placement="bottom-center"
        hideCloseButton
        backdrop="blur"
      >
        <ModalContent className="mb-16">
          <>
            <ModalHeader className="flex flex-col gap-1 relative bg-sky-100">
              <div className="flex w-full justify-between">
                <p>Sign-in to nextcare.life</p>
                <div />
                <button
                  type="button"
                  className="w-7 h-7 rounded-full flex justify-center items-center hover:bg-gray-100"
                  onClick={onClose}
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </ModalHeader>
            <ModalBody>
              <div>
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-3 mt-5 w-full mb-5"
                >
                  <label htmlFor="country">Select Your Country</label>
                  <select
                    id="country"
                    name="country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-4"
                  >
                    {countries.length > 0 ? (
                      countries.map((country) => (
                        <option key={country.id} value={country.sortname}>
                          {country.name} (+{country.phonecode})
                        </option>
                      ))
                    ) : (
                      <option>Loading countries...</option>
                    )}
                  </select>

                  {isIndia ? (
                    <>
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border border-gray-300 text-sm rounded-lg p-4 ${
                          formik.touched.phone && formik.errors.phone
                            ? "border-red-500"
                            : ""
                        }`}
                        ref={inputRef}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.phone}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border border-gray-300 text-sm rounded-lg p-4 ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.email}
                        </p>
                      )}
                    </>
                  )}

                  {isOTPSent && (
                    <InputField
                      onChange={formik.handleChange}
                      value={formik.values.otp}
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.otp && formik.errors.otp
                          ? formik.errors.otp
                          : ""
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  )}

                  {isOTPSent && (
                    <div className="text-end mr-2 text-sm text-gray-500">
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="text-sky-700 font-semibold"
                        >
                          Resend OTP
                        </button>
                      ) : (
                        `Resend OTP in ${timer}s`
                      )}
                    </div>
                  )}

                  <div>
                    <Button
                      isLoading={isLoading}
                      onClick={formik.handleSubmit as any}
                      className="p-4 w-full text-white bg-sky-900 rounded-lg shadow-md font-semibold"
                    >
                      {!isOTPSent ? "Send OTP" : "Verify OTP & Login"}
                    </Button>
                  </div>
                </form>

                <div className="w-full mt-2 flex justify-end">
                  <button
                    className="text-sky-900 text-right text-sm font-semibold"
                    onClick={() => {
                      router.push("/auth/reset-password/email-phone");
                      dispatch(setLoginModal(false));
                    }}
                  >
                    Reset Phone or Email?
                  </button>
                </div>
                <div>
                  <div className="flex justify-center items-center w-full mt-6">
                    <div className="border-t-2 flex-grow"></div>
                    <p className="whitespace-nowrap mx-2 font-semibold text-sm text-sky-700">
                      New to Nextcare.life?
                    </p>
                    <div className="border-t-2 flex-grow"></div>
                  </div>

                  <Button
                    variant="bordered"
                    className="p-4 w-full border font-semibold text-sky-900 text-sm rounded-md shadow-md mt-2 hover:shadow-lg"
                    onClick={() => {
                      router.push("/auth/signup-user");
                      dispatch(setLoginModal(false));
                    }}
                  >
                    Create your account
                  </Button>
                </div>
              </div>
            </ModalBody>
            <ModalFooter />
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
