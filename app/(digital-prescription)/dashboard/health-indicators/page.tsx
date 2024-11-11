import { Metadata } from "next";
import GeneralHealthIndicator from "../_components/GeneralHealthIndicator";

export const metadata: Metadata = {
  title: "General Health Indicators",
};

const HealthIndicatorPage = () => {
  return (
    <div>
      <GeneralHealthIndicator />
    </div>
  );
};

export default HealthIndicatorPage;
