import StepManagementSignUpProcess2 from "@/components/DigitalPrescription/Auth/StepManagementSignUpProcess2";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp",
};

const SignUp = () => {
  return (
    <div className="flex justify-center items-center">
      <StepManagementSignUpProcess2 />
    </div>
  );
};

export default SignUp;
