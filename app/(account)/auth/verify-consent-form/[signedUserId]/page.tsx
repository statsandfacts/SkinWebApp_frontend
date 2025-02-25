import { Metadata } from "next";
import VerifyConsentForm from "../_component/VerifyConsentForm";
export const metadata: Metadata = {
  title: "Verify Consent Form",
};

const signedUserId = () => {
  return (
    <>
      <VerifyConsentForm />
    </>
  );
};

export default signedUserId;
