import ComingSoon from "@/components/ComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

const howWorks = () => {
  return <DigitalPrescriptionFAQ />;
};

export default howWorks;

const SkinCareFAQ = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px:10 md:px-40">
      <p className="text-lg font-semibold">Frequently Asked Questions</p>

      <p>
        Find answers to all your questions regarding NextCare app, products,
        services and more
      </p>

      <div className="w-full">
        {/* <h2 className='text-lg text-gray-800 font-bold text-left w-full mt-5'>
          How it works:
        </h2> */}
        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          What is Nextcare.life?
        </h2>
        <ul className="space-y-1 list-disc list-inside w-full">
          <li>
            Nextcare.life is an online skincare dermatologist application
            dedicated to revolutionizing skincare. We combine the expertise of
            board-certified dermatologists with cutting-edge technology to offer
            personalized, accessible and effective skincare solutions directly
            to you.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          How does Nextcare.life work?
        </h2>
        <ul className="space-y-1 list-disc list-inside w-full">
          <li>
            Simply answer some questions and upload your picture to connect with
            our board-certified dermatologists. You&apos;ll receive a proper
            skincare diagnosis, treatment recommendations, and even
            prescriptions, all without needing an in-person visit.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          What services does Nextcare.life offer?
        </h2>
        <ul className="space-y-1 list-disc list-inside w-full">
          <li>
            Nextcare.life provides expert dermatologist consultations,
            personalized skincare plans tailored to your skin type and concerns,
            convenient follow-up appointments to track progress, and a wealth of
            educational resources on skincare.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          Why should I choose Nextcare.life?
        </h2>
        <ul className="space-y-1 list-disc list-inside w-full">
          <li>
            We make professional skincare accessible to everyone, ensuring you
            receive expert guidance and effective treatment plans from the
            comfort of your home. Our platform is user-friendly, secure, and
            designed for your satisfaction and convenience.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          How can I get started with Nextcare.life?
        </h2>
        <ul className="space-y-1 list-disc list-inside w-full">
          <li>
            Visit Nextcare.life to begin your skincare journey. Connect with our
            experienced dermatologists, receive personalized treatment plans,
            and access educational resources to achieve healthy, radiant skin.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          Can I trust the dermatologists at Nextcare.life?
        </h2>
        <ul className="space-y-1 list-disc list-inside w-full">
          <li>
            Absolutely. Our dermatologists are board-certified experts committed
            to your skin health and satisfaction. They provide the highest
            quality care and utilize advanced skincare solutions to address your
            specific needs.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          Is my information secure with Nextcare.life?
        </h2>
        <ul className="space-y-1 list-disc list-inside w-full">
          <li>
            Yes. We prioritize the security and confidentiality of your
            information. Our platform adheres to stringent security protocols to
            ensure your data remains protected at all times.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          How often can I consult with dermatologists on Nextcare.life?
        </h2>
        <ul className="space-y-1 list-disc list-inside w-full">
          <li>
            You can schedule follow-up appointments as needed to track your
            progress and adjust your treatment plan. Our dermatologists are
            dedicated to supporting your skincare journey and are available
            whenever you need guidance.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          Join the Nextcare.life Community
        </h2>
        <ul className="space-y-1 list-disc list-inside w-full">
          <li>
            Join thousands of satisfied users who have transformed their skin
            with Nextcare.life. Whether you&apos;re dealing with specific skin
            concerns or aiming to enhance your natural beauty, our
            dermatologists are here to help you achieve your skincare goals.
          </li>
        </ul>

        <p className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          For further inquiries or assistance, please visit Nextcare.life or
          contact our customer support team. We&apos;re here to ensure you have
          a seamless and positive experience with our services.
        </p>
      </div>
    </div>
  );
};

const DigitalPrescriptionFAQ = () => {
  return (
    <>
      <div className="px-7 md:px-12">
        <ComingSoon />
      </div>
    </>
  );
};
