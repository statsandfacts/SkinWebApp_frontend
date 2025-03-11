import CustomHeader from "@/components/Header/PublicLayoutHeader";
import SearchJob from "./_component/SearchJob";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job  Search",
};

const HomePage = () => {
  return (
    <div className="p-10 md:px-40">
      <CustomHeader
        header="We are hiring!"
        subHeader="Explore exciting career opportunities and grow with us."
        imageURL="/vector/careerpage_image.png"
      />
      <SearchJob/>
     
    </div>
  );
};

export default HomePage;
