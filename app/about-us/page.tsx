import type { Metadata } from "next";
import {
  MeetTheTeam,
  OurValuesSection,
  UniqueAboutNextCare,
  WhoWeAreSection,
  GlimpsesofNextcare,
  StepIntoHealthCare,
  ExploreOueHealthCare,
} from "@/components/About";
import CommonHeroSection from "@/components/common/CommonHeroSection";

export const metadata: Metadata = {
  title: "About Us",
};

const AboutUs = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col items-center w-full max-md:max-w-full">
          <CommonHeroSection
            key={"about-us-hero"}
            title="Revolutionizing digital healthcare in India using AI"
            subtitle="Empowering healthcare with smarter solutions for improved health
          outcomes"
          />
          <OurValuesSection />
          <WhoWeAreSection />
          <UniqueAboutNextCare />
          <StepIntoHealthCare />
          <ExploreOueHealthCare />
          <MeetTheTeam />
          <GlimpsesofNextcare />
        </div>
      </div>
    </>
  );
};

export default AboutUs;

const SkinCareAboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-10 md:px-40 ">
      <h1 className="text-2xl font-bold">About Us</h1>

      <p>
        Welcome to Nextcare.life, your trusted online skincare dermatologist
        application. At Nextcare.life, we are dedicated to revolutionizing the
        way you care for your skin. We combine the expertise of board-certified
        dermatologists with cutting-edge technology to provide personalized,
        accessible, and effective skincare solutions right at your fingertips.
      </p>

      <h2 className="text-lg text-gray-800 font-bold  text-left w-full">
        Our Mission
      </h2>

      <p>
        Our mission is to make professional skincare accessible to everyone,
        everywhere . We believe that everyone deserves healthy, radiant skin and
        expert guidance to achieve it. With Nextcare.life, you can consult with
        experienced dermatologists, receive personalized treatment plans,
        tailored to your unique needs—all from the comfort of your home.
      </p>

      <h2 className="text-lg text-gray-800 font-bold text-left w-full">
        What We Offer
      </h2>
      <ul className="space-y-1  list-disc list-inside w-full">
        <li>
          Expert Dermatologist Consultations: Connect with board-certified
          dermatologists just by answering some questions and uploading your
          picture. Get proper skincare diagnosis and treatment recommendations
          along with a prescription without an in-person visit.
        </li>
        <li>
          Personalized Skincare Plans: Receive customized skincare routines and
          treatment plans based on your skin type, concerns, and goals. Our
          dermatologists create personalized regimens to address issues like
          acne, aging, hyperpigmentation, and more.
        </li>
        <li>
          Convenient Follow-Ups: Schedule follow-up appointments to track your
          progress and adjust your treatment plan as needed. Our dermatologists
          are committed to your ongoing skincare journey and are here to support
          you every step of the way.
        </li>
        <li>
          Educational Resources: Stay informed with our extensive library of
          skincare articles, tips, and tutorials. Learn about the latest trends,
          treatments, and best practices from trusted experts.
        </li>
      </ul>

      <h2 className="text-lg text-gray-800 font-bold text-left w-full">
        Our Commitment to You
      </h2>
      <p>
        At Nextcare.life, your skin health and satisfaction are our top
        priorities. We are committed to providing you with the highest quality
        care and the most advanced skincare solutions available. Our platform is
        designed to be user-friendly, secure, and accessible, ensuring that you
        have a seamless and positive experience every time you use our services.
      </p>
      <p>
        Join the{" "}
        <a className="text-blue-700" href="www.https://nextcare.life">
          Nextcare.life
        </a>{" "}
        Community Join thousands of satisfied users who have transformed their
        skin with the help of{" "}
        <a className="text-blue-700" href="www.https://nextcare.life">
          Nextcare.life
        </a>
        . Whether you&apos;re dealing with a specific skin concern or simply
        want to enhance your natural beauty, our team of dermatologists is here
        to help you achieve your skincare goals.
      </p>
      <p>
        Experience the future of skincare with
        <a className="text-blue-700 px-2" href="www.https://nextcare.life">
          Nextcare.life
        </a>
        — your skin will thank you!
      </p>
    </div>
  );
};
