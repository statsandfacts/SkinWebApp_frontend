import {
  AyushmanBharat,
  CareerPage,
  EmpoweringHealthcare,
  HealthFeed,
  HomeHeroSection,
  MobileApp,
  SupportedBySection,
  UploadPrescription,
  WhatUserSay,
  WhyChooseNextcare,
} from "@/components/DigitalPrescription/Home";
import LeftImageComponent from "@/components/DigitalPrescription/Home/LeftImageComponent";
import RightImageComponent from "@/components/DigitalPrescription/Home/RightImageComponent";

export default function Home() {
  const dp_features = [
    { title: "Eliminates handwriting errors", color: "#817F7F" },
    { title: "Instant access & storage", color: "#000000" },
    { title: "Prevents fraud & tampering", color: "#0480C9" },
  ];
  const lr_features = [
    { title: "Simplifies complex medical data", color: "#817F7F" },
    { title: "Tracks health trends over time", color: "#000000" },
    { title: "Offers personalized health recommendations", color: "#0480C9" },
  ];
  const sb_features = [
    { title: "Assesses symptoms in real-time", color: "#817F7F" },
    { title: "Suggests possible health conditions", color: "#000000" },
    { title: "Guides on the next steps for care", color: "#0480C9" },
  ];
  const cc_features = [
    { title: "Get expert medical advice in minutes.", color: "#817F7F" },
    { title: "Consult from home or on the go.", color: "#000000" },
    { title: "Your medical data stays confidential.", color: "#0480C9" },
  ];
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col items-center w-full max-md:max-w-full">
          <HomeHeroSection />
          <UploadPrescription />
          <EmpoweringHealthcare />
          <SupportedBySection />
          <LeftImageComponent
            action="digital_prescription"
            imageSrc="/homepage/digitalprescriptionimage.png"
            title="What is Digital Prescription?"
            description="A digital prescription is an electronic version of a traditional paper-based prescription. It enhances accuracy, reduces medication errors, and improves accessibility for patients and healthcare providers."
            features={dp_features}
          />
          <RightImageComponent
            action={"lab_report"}
            imageSrc="/homepage/smartlabreporthome.png"
            title="What is Smart Lab Report?"
            description="A smart lab report provides easy-to- understand insights from medical test results. It helps track health trends, offers recommendations, and improves patient awareness."
            features={lr_features}
          />
          <LeftImageComponent
            action="symptom_bot"
            imageSrc="/homepage/symptombot.png"
            title="What is Symptom Bot ?"
            description="The Symptom Bot is an AI-powered, clinically validated tool that provides fast and reliable health guidance 24/7. It helps assess symptoms, understand possible conditions, and decide the next steps within minutes."
            features={sb_features}
          />
          <RightImageComponent
            action="clinical_consult"
            imageSrc="/homepage/cinicalconsulthome.png"
            title="What is the 5-Minutes Clinical Consult?"
            description="The 5-Minute Clinical Consult at Nextcare.Life offers fast, expert-driven telemedicine services for quick medical advice, prescriptions, and follow-ups — all in just 5 minutes!"
            features={cc_features}
          />
          <WhyChooseNextcare />
          <AyushmanBharat />
          <CareerPage />
          <HealthFeed />
          <MobileApp />
          <WhatUserSay />
        </div>
      </div>
    </div>
  );
}
