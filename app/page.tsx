import {
  HeroSection,
  HowToUseSection,
  PrescriptionComparisonSection,
  ReviewsSection,
} from "@/components/DigitalPrescription";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col items-center w-full max-md:max-w-full">
          <HeroSection />
          <HowToUseSection />
          <PrescriptionComparisonSection />
          <ReviewsSection />
        </div>
      </div>
    </>
  );
}
