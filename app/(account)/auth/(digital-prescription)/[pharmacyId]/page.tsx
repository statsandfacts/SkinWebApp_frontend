import type { Metadata } from "next";
import SignUpThroughPharmacy from "./_component/SignUpThroughPharmacy";

export const metadata: Metadata = {
  title: "Signup",
};

const SuginupThroughPharmacyPage = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <SignUpThroughPharmacy />
    </div>
  );
};

export default SuginupThroughPharmacyPage;
