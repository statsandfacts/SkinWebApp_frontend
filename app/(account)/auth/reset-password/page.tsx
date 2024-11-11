import ForgetPasswordForm from "@/components/DigitalPrescription/Auth/ForgetPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
};

const ForgetPassword = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h1 className="text-slate-900 text-xl font-bold mt-3">Reset Password</h1>
      <ForgetPasswordForm />
    </div>
  );
};

export default ForgetPassword;
