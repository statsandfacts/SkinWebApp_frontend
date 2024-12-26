import CustomHeader from "@/components/Header/PublicLayoutHeader";
import { Metadata } from "next";
import ABHA from "../components/ABHA";
import Image from "next/image";
import { IdCardIcon, InfoIcon } from "lucide-react";
import AbhaInfoSection from "../components/AbhaInfoSection";
import StepsToCreateAbha from "../components/StepsToCreateAbha";
import DownloadAbhaCardSection from "../components/DownloadAbhaCardSection";

export const metadata: Metadata = {
  title: "Create Ayushman Bharat Health Account or Health ID",
};

const ABHAPage = () => {
  return (
    <div className="p-10 md:px-40">
      <CustomHeader
        header="Create Ayushman Bharat Health Account or Health ID"
        subHeader="Your gateway to access health services, benefits, and a unique digital identity under the Ayushman Bharat Digital Mission."
        imageURL="/vector/abha.png"
      />
      <ABHA />
      <AbhaInfoSection />
      <StepsToCreateAbha />
      <DownloadAbhaCardSection />
    </div>
  );
};

export default ABHAPage;
