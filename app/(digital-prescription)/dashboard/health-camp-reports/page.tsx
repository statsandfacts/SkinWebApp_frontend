import { Metadata } from "next";
import HealthCampReports from "../_components/HealthCampReports";

export const metadata: Metadata = {
  title: "Health Camp Reports",
};

const HCRPage = () => {
  return (
    <div>
      <HealthCampReports />
    </div>
  );
};

export default HCRPage;
