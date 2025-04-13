import SymptomBotDtls from "@/components/DigitalPrescription/HomeDtls/SymptomBotDtls";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Symptom Bot",
};

const howWorks = () => {
  return <SymptomBotDtls />;
};

export default howWorks;
