import FiveMinuteCCDetails from "@/components/DigitalPrescription/HomeDtls/FiveMinuteCCDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Five Minute Clinical Consult",
};

const howWorks = () => {
  return <FiveMinuteCCDetails />;
};

export default howWorks;
