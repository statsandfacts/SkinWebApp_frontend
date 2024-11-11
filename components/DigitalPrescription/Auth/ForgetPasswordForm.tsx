"use client";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState } from "react";
import InputField from "@/components/common/InputField";
import { setLoginModal } from "@/redux/slices/loginModal.slice";
import LoginModal from "./LoginModal";

interface FormValues {
  email: string;
}

const ForgetPasswordForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // API call or dispatch action here
        toast.success("Password reset link sent successfully");
      } catch (error: any) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col gap-5 w-full max-w-md px-5"
        onSubmit={formik.handleSubmit}
      >
        <InputField
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          name="email"
          placeholder="Email"
          onBlur={formik.handleBlur}
          error={
            formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <Button
          isLoading={isLoading}
          type="submit"
          className="p-6 w-full text-white bg-sky-900 rounded-xl"
        >
          Reset
        </Button>
      </form>

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

      <LoginModal isCloseIcon={false} />
    </>
  );
};

export default ForgetPasswordForm;
