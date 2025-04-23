"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
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
import { login, sendOtp } from "@/services/api.digitalPrescription.service";

export default function LoginDrawer() {
  const { isModalOpen } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null!);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOTPSent, setIsOTPSent] = useState<boolean>(false);
  const [responseOtp, setResponseOtp] = useState<string>("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      phone: "",
      otp: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
      otp: Yup.string().test("required", "OTP is required", function (value) {
        if (isOTPSent) {
          return !!value; // OTP is required only if isOTPSent is true
        }
        return true; // No OTP required if isOTPSent is false
      }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        if (!isOTPSent) {
          sendOtp({
            phone_number: values.phone,
          })
            .then((res) => {
              setResponseOtp(res.verification_code);
              toast.success("OTP sent successfully!");
              setIsOTPSent(true);
            })
            .catch((err) => {
              toast.error(err.response?.data?.detail || "Error sending OTP");
            })
            .finally(() => setIsLoading(false));
        } else {
          if (responseOtp === values.otp) {
            const session_id = new Date().getTime().toString();
            login({
              user_role: "1",
              email_or_phone_no: values.phone,
              session_id,
            })
              .then((data) => {
                toast.success("OTP verified successfully!");
                const userId = data.user_id;
                dispatch(setUser({ userId, sessionId: session_id }));
                // resetForm();
                router.push("/dashboard");
                // dispatch(setLoginModal(false));
                onClose();
              })
              .catch((error) => {
                toast.error(error.response?.data?.detail || "Login failed.");
              })
              .finally(() => setIsLoading(false));
          } else {
            toast.error("Invalid OTP");
            setIsLoading(false);
          }
        }
      } catch (error: any) {
        setIsLoading(false);
        const status = error.response?.status;
        toast.error(
          status === 409 ? "Invalid credentials" : "Something went wrong"
        );
      }
    },
  });

  const onClose = () => {
    dispatch(setLoginModal(false));
    formik.resetForm();
    setIsOTPSent(false);
    setResponseOtp("");
    setCanResend(false);
    setTimer(30);
  };

  const handleSendOtp = async (phone: string) => {
    try {
      formik.resetForm({
        values: { phone, otp: "" },
      });
      const res = await sendOtp({ phone_number: phone });
      setResponseOtp(res.verification_code);
      toast.success("OTP sent successfully!");
      setIsOTPSent(true);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Error sending OTP");
    } finally {
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        placement="bottom-center"
        hideCloseButton={true}
        backdrop={"blur"}
      >
        <ModalContent className="mb-16">
          <>
            <ModalHeader className="flex flex-col gap-1 relative bg-sky-100">
              <div className="flex w-full">
                <p>Sign-in to nextcare.life</p>
              </div>
              <button
                className="absolute right-4 top-4 w-7 h-7 rounded-full flex justify-center items-center hover:bg-gray-100"
                onClick={onClose}
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </ModalHeader>
            <ModalBody>
              <div>
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-3 mt-5 w-full mb-5 md:mb-0"
                >
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    onBlur={formik.handleBlur}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-500"
                        : ""
                    }`}
                    ref={inputRef}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.phone}
                    </p>
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
                          onClick={() => handleSendOtp(formik.values.phone)}
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
                    Reset Phone Number ?
                  </button>
                </div>

                <div>
                  <div className="flex justify-center items-center w-full mt-6">
                    <div className="border-t-2 flex-grow"></div>
                    <p className="whitespace-nowrap mx-2 font-semibold text-sm text-sky-700">
                      New to Nextcare.life ?
                    </p>
                    <div className="border-t-2 flex-grow"></div>
                  </div>

                  <Button
                    variant="bordered"
                    className="p-4 w-full border font-semibold text-sky-900 text-sm rounded-md shadow-md mt-2 transform transition-transform duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
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
            <ModalFooter></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
