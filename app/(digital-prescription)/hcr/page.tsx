import type { Metadata } from "next";
import HCR from "./_components/HCR";

export const metadata: Metadata = {
  title: "HCR",
};

const HCRPage = () => {
  return (
    <div>
      <HCR />
    </div>
  );
};

export default HCRPage;
