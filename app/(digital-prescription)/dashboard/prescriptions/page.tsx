import { Metadata } from "next";
import Prescriptions from "../_components/Prescriptions";

export const metadata: Metadata = {
  title: "Prescriptions",
};

const PrescriptionsPage = () => {
  return (
    <div>
      <Prescriptions />
    </div>
  );
};

export default PrescriptionsPage;
