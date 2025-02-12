import CustomHeader from "@/components/Header/PublicLayoutHeader";
import SearchComponent from "./_component/SearchComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Medicine/Lab-Investigations",
};

const HomePage = () => {
  return (
    <div className="p-10 md:px-40">
      <CustomHeader
        header="Find Medicines & Investigations"
        subHeader="Search for medicines and lab investigations easily."
        imageURL="/vector/health_feed.png"
      />
      <SearchComponent />
    </div>
  );
};

export default HomePage;
