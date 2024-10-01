import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
};

const AboutUs = () => {
  return <DigitalPrescriptionAboutUs />;
};

export default AboutUs;

const DigitalPrescriptionAboutUs = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-8 p-10 md:px-40 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          About Us
        </h1>

        <div className="flex flex-col gap-4">
          <p className="text-sm md:text-base text-gray-600">
            Welcome to{" "}
            <span className="font-semibold text-blue-600">Nextcare.Life</span>,
            where cutting-edge technology transforms healthcare innovation.
          </p>

          <p className="text-sm md:text-base text-gray-600">
            We are redefining prescription management through our
            state-of-the-art
            <span className="font-semibold text-gray-600">
              {" "}
              Clinical Decision Support System (CDSS)
            </span>
            , a powerful solution that converts handwritten and often illegible
            prescriptions into accurate, digital formats.
          </p>

          <p className="text-sm md:text-base text-gray-600">
            Our mission is to prioritize patient safety, improve healthcare
            efficiency, and drastically reduce medication errors by leveraging
            the latest in AI technology.
          </p>

          <p className="text-sm md:text-base text-gray-600">
            On our homepage, you’ll discover a wealth of resources that explain
            how our system works, the advantages it brings to patients and
            healthcare providers alike, and the story behind our unwavering
            commitment to advancing the Healthtech landscape.
          </p>

          <p className="text-sm md:text-base text-gray-600">
            Our CDSS is designed not just to streamline prescription management
            but to set a new standard for digital health solutions.
          </p>

          <p className="text-sm md:text-base text-gray-600">
            Be sure to visit our{" "}
            <span className="font-semibold text-gray-600"> FAQs</span> section,
            where we address common questions about the security, accuracy, and
            practical implementation of our platform.{" "}
          </p>

          <p className="text-sm md:text-base text-gray-600">
            Whether you are a healthcare professional, a patient, or simply
            curious, we’ve ensured that our site is intuitive, visually
            engaging, and packed with valuable content tailored to your needs
          </p>

          <div>
            <p className="text-sm md:text-base font-semibold text-gray-600">
              Ready to embrace the future of healthcare?
            </p>
            <p className="text-sm md:text-base text-gray-600">
              You can log in to unlock personalized features or browse the
              platform to discover how we’re shaping the future of digital
              healthcare.
            </p>
          </div>

          <div>
            <p className="text-sm md:text-base font-semibold text-gray-600">
              New Features for Enhanced Healthcare
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-600">
              <li>
                At{" "}
                <span className="font-semibold text-gray-600">
                  Nextcare.Life
                </span>
                , we are constantly evolving to meet the demands of modern
                healthcare. In addition to our prescription management system,
                we’ve introduced a feature that interprets{" "}
                <span className="font-semibold text-gray-600">
                  lab reports{" "}
                </span>
                and generates{" "}
                <span className="font-semibold text-gray-600">
                  smart lab summaries
                </span>{" "}
                across various medical conditions.
              </li>
              <li>
                This tool empowers healthcare providers with swift, detailed
                insights based on the latest medical guidelines, enabling
                informed clinical decisions.
              </li>
              <li>
                Patients also benefit by receiving simplified versions of their
                lab reports, making it easier to understand their health status
                and the recommended next steps.
              </li>
              <li>
                We are also proud to present our{" "}
                <span className="font-semibold text-gray-600">Symptom Bot</span>
                , an intuitive tool designed to help users identify potential
                health concerns based on their symptoms.
              </li>
              <li>
                By simply inputting your symptoms, the bot suggests possible
                conditions and provides guidance on whether medical attention is
                needed.
              </li>
              <li>
                This feature is particularly valuable for early detection and
                preventive care, helping users take timely and proactive steps
                toward their well-being.
              </li>
            </ul>
          </div>

          <p className="text-sm md:text-base text-gray-600">
            Explore these new features and experience firsthand how
            <span className="font-semibold text-gray-600">
              {" "}
              Nextcare.Life
            </span>{" "}
            is revolutionizing digital healthcare, one innovation at a time!
          </p>
        </div>

        {/* Incubated and Supported Section */}
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <p className="text-sm md:text-base font-semibold text-gray-600">
            Incubated at KIIT and Supported by DST NIDHI PRAYAS
          </p>
          <Image
            src="/digitalPrescription/dst-logo.jpg"
            alt="DST NIDHI PRAYAS Logo"
            width={150}
            height={100}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

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
