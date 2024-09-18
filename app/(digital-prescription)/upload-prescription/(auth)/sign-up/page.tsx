import SignUpForm from "@/components/DigitalPrescription/Auth/SignUpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp",
};

const SignUp = () => {
  return (
    <div className="flex justify-center items-center">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
