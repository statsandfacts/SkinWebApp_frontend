import SearchComponent from "./_component/SearchComponent";
import type { Metadata } from "next";
import CommonHeroSection from "@/components/common/CommonHeroSection";

export const metadata: Metadata = {
  title: "Search Medicine/Lab-Investigations",
};

const HomePage = () => {
  return (
    <div className="flex flex-col items-center w-full max-md:max-w-full">
      <CommonHeroSection
        key={"med-lab-hero"}
        title="Browse Medicines & Lab Investigations"
        subtitle="With our Browse Medicines & Investigations tool, searching for essential medicines and diagnostic tests has never been easier or faster."
      />
      <SearchComponent />
    </div>
  );
};

export default HomePage;
