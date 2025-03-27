import CustomHeader from "@/components/Header/PublicLayoutHeader";
import SearchJob from "@/components/Career/SearchJob";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career",
};

const CareerPage = () => {
  return (
    <div className="p-10 md:px-40">
      <CustomHeader
        header="We are hiring!"
        subHeader="Explore exciting career opportunities and grow with us."
        imageURL="/vector/careerpage_image.png"
      />
      <SearchJob />
    </div>
  );
};

export default CareerPage;
