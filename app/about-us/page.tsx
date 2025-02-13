import type { Metadata } from "next";
import Image from "next/image";
import {
  Calendar,
  CheckCircle,
  Droplet,
  FileText,
  FireExtinguisher,
  Heart,
  HeartPulse,
  Pill,
  Scale,
  Search,
  Smartphone,
} from "lucide-react"; // Import icons from lucide-react
import CustomHeader from "@/components/Header/PublicLayoutHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
};

const AboutUs = () => {
  return <DigitalPrescriptionAboutUs />;
};

export default AboutUs;

const DigitalPrescriptionAboutUs = () => {
  const calculators = [
    {
      icon: <Scale className="text-sky-500 text-4xl mb-2" />,
      title: "BMI Calculator",
      description:
        "Calculate your Body Mass Index (BMI) to understand your ideal weight range.",
      link: "/calculator/bmi",
    },
    {
      icon: <FireExtinguisher className="text-sky-500 text-4xl mb-2" />,
      title: "BMR Calculator",
      description:
        "Estimate your Basal Metabolic Rate (BMR) to know your daily calorie needs.",
      link: "/calculator/bmr",
    },
    {
      icon: <HeartPulse className="text-sky-500 text-4xl mb-2" />,
      title: "Blood Pressure Risk",
      description:
        "Assess your blood pressure risk and get recommendations for a healthy lifestyle.",
      link: "/calculator/blood-pressure-risk-calculator",
    },
    {
      icon: <Calendar className="text-sky-500 text-4xl mb-2" />,
      title: "Pregnancy Due Date",
      description:
        "Determine your estimated due date based on your last menstrual period.",
      link: "/calculator/pregnancy-due-date",
    },
    {
      icon: <Droplet className="text-sky-500 text-4xl mb-2" />,
      title: "Diabetes Risk Calculator",
      description:
        "Evaluate your risk of developing diabetes based on various health factors.",
      link: "/calculator/diabetes-risk-calculator",
    },
  ];

  const features = [
    {
      icon: <Pill className="text-sky-500 text-4xl mb-4" />,
      title: "Prescription Digitization",
      description:
        "Effortlessly convert handwritten prescriptions to digital prescriptions accurately in a secured way.",
    },
    {
      icon: <FileText className="text-sky-500 text-4xl mb-4" />,
      title: "Smart Lab Report",
      description:
        "Our tool interprets lab reports and generates smart summaries based on medical conditions, empowering healthcare providers.",
    },
    {
      icon: <Search className="text-sky-500 text-4xl mb-4" />,
      title: "Symptom Bot",
      description:
        "The Symptom Bot helps users identify potential health concerns and suggests the need for medical attention.",
    },
    // {
    //   icon: <Heart className="text-sky-500 text-4xl mb-4" />,
    //   title: "Preventive Care",
    //   description:
    //     "Take proactive steps for your well-being by identifying early signs of health conditions with our digital tools.",
    // },
    // {
    //   icon: <Smartphone className="text-sky-500 text-4xl mb-4" />,
    //   title: "Mobile-Friendly Interface",
    //   description:
    //     "Access your healthcare information from anywhere, on any device, with our user-friendly mobile platform.",
    // },
  ];

  return (
    <div>
      <div className="p-10 md:px-40">
        {/* Header Section */}
        <CustomHeader
          header="About Us"
          subHeader="Welcome to Nextcare.Life: Innovating Healthcare Technology"
          imageURL="/vector/about_us.png"
        />

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
          <p className="text-sm md:text-base text-gray-700 mt-2">
            Explore these new features and experience firsthand how{" "}
            <span className="font-semibold text-gray-800">Nextcare.Life</span>{" "}
            is revolutionizing digital healthcare, one innovation at a time!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
              >
                {item.icon}
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 text-center mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Explore Our Health{" "}
              <Link
                href={"/calculator"}
                className="text-sky-900 hover:text-sky-600"
              >
                {" "}
                Calculators{" "}
              </Link>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((calculator, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
                >
                  {calculator.icon}
                  <h3 className="text-xl font-semibold text-gray-800">
                    {calculator.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center ">
                    {calculator.description}
                  </p>
                  <Link
                    href={calculator.link}
                    className="text-sky-800 font-semibold hover:text-sky-600 hover:underline mt-2"
                  >
                    Calculate Now
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Mission Section */}
          <section className="flex flex-col md:flex-row items-center gap-6 my-12">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              <p className="text-sm md:text-base text-gray-700 mt-4">
                Our mission is to revolutionize healthcare with innovative,
                user-friendly technology that addresses the real-world needs of
                patients, doctors, and pharmacists. By leveraging our Clinical
                Decision Support System (CDSS), we transform handwritten
                prescriptions into precise digital formats, empower users with
                tools like smart lab reports and symptom bots, and provide
                predictive health alerts.
              </p>
              <p className="text-sm md:text-base text-gray-700 mt-2">
                Committed to quality, accuracy, and accessibility, Nextcare.Life
                enhances patient engagement, simplifies medical workflows, and
                ensures timely care. With a focus on serving both urban and
                rural populations, we aim to make healthcare smarter, proactive,
                and impactful for all.
              </p>
            </div>
            <div className="flex-1">
              <Image
                src="/images/digitalPrescription/about_mission.png"
                alt="Mission Image"
                width={500}
                height={300}
                className="object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </section>

          {/* Vision Section */}
          <section className="flex flex-col md:flex-row-reverse items-center gap-6 my-12">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
              <p className="text-sm md:text-base text-gray-700 mt-4">
                Nextcare.Life envisions a future where healthcare is not just
                digitized but transformed into a seamless, accessible, and
                intelligent system that empowers patients, supports healthcare
                providers, and revolutionizes the way medical information is
                managed. By leveraging Clinical Decision Support Systems (CDSS)
                and advanced analytics, we aim to reduce errors, provide
                real-time insights, and ensure effective healthcare
                interactions.
              </p>
              <p className="text-sm md:text-base text-gray-700 mt-2">
                We aspire to bridge healthcare gaps and create a proactive,
                predictive, and patient-centered system that transforms lives.
              </p>
            </div>
            <div className="flex-1">
              <Image
                src="/images/digitalPrescription/about_vision.png"
                alt="Vision Image"
                width={500}
                height={300}
                className="object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </section>

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
