import {
  HealthCalculatorSection,
  HeroSection,
  HowToUseSection,
  PrescriptionComparisonSection,
  ReviewsSection,
  SupportSection,
} from "@/components/DigitalPrescription";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col items-center w-full max-md:max-w-full">
          <HeroSection />
          <SupportSection />
          <HowToUseSection />
          <PrescriptionComparisonSection />
          <HealthCalculatorSection />
          <ReviewsSection />
        </div>
      </div>
    </div>
  );
}
