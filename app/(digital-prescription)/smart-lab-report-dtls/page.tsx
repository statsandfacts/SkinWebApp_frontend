import { SLRDtls } from "@/components/DigitalPrescription/HomeDtls/SLRDtls";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Lab Report",
};

const howWorks = () => {
  return <SLRDtls />;
};

export default howWorks;
