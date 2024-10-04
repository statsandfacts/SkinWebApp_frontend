"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOTPSent, setIsOTPSent] = useState<boolean>(false);
  const [responseOtp, setResponseOtp] = useState<string>("");

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
                router.push("/upload-prescription/prescriptions");
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
                  <InputField
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    onBlur={formik.handleBlur}
                    disableCopyPaste={true}
                    error={
                      formik.touched.phone && formik.errors.phone
                        ? formik.errors.phone
                        : ""
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

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

                  <div>
                    <Button
                      isLoading={isLoading}
                      onClick={formik.handleSubmit as any}
                      className="p-4 w-full text-white bg-sky-900 rounded-lg font-semibold"
                    >
                      {!isOTPSent ? "Send OTP" : "Verify OTP & Login"}
                    </Button>

                    {!isOTPSent && (
                      <div className="w-full mt-2 flex justify-end">
                        <button
                          className="text-sky-900 text-right text-sm font-semibold"
                          onClick={() => {
                            router.push("/upload-prescription/forget-password");
                            dispatch(setLoginModal(false));
                          }}
                        >
                          Forget Password?
                        </button>
                      </div>
                    )}
                  </div>
                </form>

                <div>
                  <div className="flex justify-center items-center w-full mt-2">
                    <div className="border-t-2 flex-grow"></div>
                    <p className="whitespace-nowrap mx-2 text-xs text-gray-500">
                      New to Nextcare.life
                    </p>
                    <div className="border-t-2 flex-grow"></div>
                  </div>

                  <Button
                    variant="bordered"
                    className="p-4 w-full border font-semibold text-slate-500 rounded-lg mt-4"
                    onClick={() => {
                      router.push("/auth/signup-user");
                      dispatch(setLoginModal(false));
                    }}
                  >
                    Create your Nextcare.life account
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
