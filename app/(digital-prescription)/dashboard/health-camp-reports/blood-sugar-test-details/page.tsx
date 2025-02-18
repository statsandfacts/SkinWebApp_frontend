import { Metadata } from "next";
import BloodSugarTestBlog from "../../_components/BloodSugarTestBlog";

export const metadata: Metadata = {
  title: "Blood Sugar Test Details",
};

const BloodSugarTestDetailPage = () => {
  return (
    <div>
      <BloodSugarTestBlog />
    </div>
  );
};

export default BloodSugarTestDetailPage;
