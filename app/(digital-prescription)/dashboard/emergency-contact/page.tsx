import { Metadata } from "next";
import EmergencyContact from "../_components/EmergencyContact";

export const metadata: Metadata = {
  title: "Emergency Contact",
};

const EmergencyContactPage = () => {
  return (
    <div>
      <EmergencyContact />
    </div>
  );
};

export default EmergencyContactPage;
