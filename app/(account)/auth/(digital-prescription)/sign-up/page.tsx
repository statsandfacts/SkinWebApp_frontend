import StepManagement from "@/components/DigitalPrescription/Auth/StepManagementSignUp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp",
};

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center">
      <StepManagement />
    </div>
  );
};

export default SignUpPage;
