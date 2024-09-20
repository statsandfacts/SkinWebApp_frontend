import React, { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Drawer from "@/components/Drawer";
import InputField from "@/components/common/InputField";
import { setLoginModal } from "@/redux/slices/loginModal.slice";
import { login } from "@/services/api.digitalPrescription.service";
import { setUser } from "@/redux/slices/digitalPrescription/auth.slice";

interface LoginModalProps {
  isCloseIcon?: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isCloseIcon }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email/PhoneNumber is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const payload = {
          user_role: "1", 
          email_or_phone_no: values.email,
          session_id: new Date().getTime().toString(),
          password: values.password
        };
        const data = await login(payload);

        if (data && data.status === 200) {
          toast.success("Logged in successfully!");
          const userId = data.user_id;
          dispatch(setUser({ userId, sessionId: payload.session_id }));
          router.push("/upload-prescription/prescriptions");
          dispatch(setLoginModal(false));
          resetForm();
        } else {
          toast.success('Login failed');
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        const status = error.response?.status;
        toast.error(
          status === 409 ? "Invalid credentials" : "Something went wrong"
        );
      }
    },
  });

  return (
    <Drawer title="Sign-in to nextcare.life" isCloseIcon={isCloseIcon}>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 mt-5 w-full mb-5 md:mb-0"
      >
        <InputField
          onChange={formik.handleChange}
          value={formik.values.email}
          type="text"
          name="email"
          placeholder="Email/PhoneNumber"
          onBlur={formik.handleBlur}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <InputField
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          name="password"
          placeholder="Password"
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <div className="flex justify-between items-center gap-5">
          <button
            className="text-sky-900"
            onClick={() => {
              router.push("/upload-prescription/sign-up");
              dispatch(setLoginModal(false));
            }}
          >
            Don&apos;t have an account?{" "}
            <span className="font-bold">Create Account</span>
          </button>
        </div>

        <div>
          <Button
            isLoading={isLoading}
            onClick={formik.handleSubmit as any}
            className="p-6 w-full text-white bg-sky-900 rounded-xl"
          >
            Login
          </Button>

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
        </div>
      </form>
    </Drawer>
  );
};

export default LoginModal;
