import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, FileText, Heart, Search, Smartphone } from "lucide-react"; // Import icons from lucide-react

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
      <div className="p-10 md:px-40">
        {/* Header Section */}
        <header className="relative mb-6 w-full p-8 rounded-lg shadow-lg bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-600 animate-fade-in">
          <div className="absolute inset-0 bg-opacity-30 bg-white rounded-lg pointer-events-none"></div>
          <div className="relative text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              About Us
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-2xl text-white/90 font-medium mx-auto max-w-3xl leading-relaxed">
              Welcome to{" "}
              <span className="font-semibold text-sky-700">Nextcare.Life</span>,
              where cutting-edge technology transforms healthcare innovation.
            </p>
          </div>
        </header>

        {/* Main Content Section */}
        <section className="flex flex-col gap-6 animate-slide-up">
          <p className="text-sm md:text-base text-gray-700">
            We are redefining prescription management through our
            state-of-the-art
            <span className="font-semibold text-gray-800">
              {" "}
              Clinical Decision Support System (CDSS)
            </span>
            , a powerful solution that converts handwritten and often illegible
            prescriptions into accurate, digital formats.
          </p>

          <p className="text-sm md:text-base text-gray-700">
            Our mission is to prioritize patient safety, improve healthcare
            efficiency, and drastically reduce medication errors by leveraging
            the latest in AI technology.
          </p>

          <p className="text-sm md:text-base text-gray-700">
            On our homepage, you’ll discover a wealth of resources that explain
            how our system works, the advantages it brings to patients and
            healthcare providers alike, and the story behind our unwavering
            commitment to advancing the Healthtech landscape.
          </p>

          <p className="text-sm md:text-base text-gray-700">
            Our CDSS is designed not just to streamline prescription management
            but to set a new standard for digital health solutions.
          </p>

          <p className="text-sm md:text-base text-gray-700">
            Be sure to visit our{" "}
            <span className="font-semibold text-gray-800">FAQs</span> section,
            where we address common questions about the security, accuracy, and
            practical implementation of our platform.
          </p>

          <p className="text-sm md:text-base text-gray-700">
            Whether you are a healthcare professional, a patient, or simply
            curious, we’ve ensured that our site is intuitive, visually
            engaging, and packed with valuable content tailored to your needs.
          </p>

          <div>
            <p className="text-sm md:text-base font-semibold text-gray-800">
              Ready to embrace the future of healthcare?
            </p>
            <p className="text-sm md:text-base text-gray-700">
              You can log in to unlock personalized features or browse the
              platform to discover how we’re shaping the future of digital
              healthcare.
            </p>
          </div>

          {/* New Features Section - Cards with Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <FileText className="text-sky-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Smart Lab Summaries
              </h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                Our tool interprets lab reports and generates smart summaries
                based on medical conditions, empowering healthcare providers.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Search className="text-sky-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Symptom Bot
              </h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                The Symptom Bot helps users identify potential health concerns
                and suggests the need for medical attention.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Heart className="text-sky-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Preventive Care
              </h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                Take proactive steps for your well-being by identifying early
                signs of health conditions with our digital tools.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Smartphone className="text-sky-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Mobile-Friendly Interface
              </h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                Access your healthcare information from anywhere, on any device,
                with our user-friendly mobile platform.
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-700 mt-6">
            Explore these new features and experience firsthand how{" "}
            <span className="font-semibold text-gray-800">Nextcare.Life</span>{" "}
            is revolutionizing digital healthcare, one innovation at a time!
          </p>

          {/* Footer Section */}
          <div className="flex flex-col items-center justify-center gap-3 mt-6">
            <p className="text-sm md:text-base font-semibold text-gray-800">
              Incubated at KIIT and Supported by DST NIDHI PRAYAS
            </p>
            <div className="flex gap-5">
              <Image
                src="/digitalPrescription/dst-logo.png"
                alt="DST NIDHI PRAYAS Logo"
                width={150}
                height={100}
                className="object-contain hover:scale-105 transition-all duration-300"
              />
              <Image
                src="/digitalPrescription/dst-nidhi.png"
                alt="DST NIDHI PRAYAS Logo"
                width={80}
                height={80}
                className="object-contain hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </section>
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
