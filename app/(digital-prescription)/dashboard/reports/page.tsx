import { Metadata } from "next";
import Reports from "../_components/Reports";

export const metadata: Metadata = {
  title: "Reports",
};

const ReportsPage = () => {
  return (
    <div>
      <Reports />
    </div>
  );
};

export default ReportsPage;
