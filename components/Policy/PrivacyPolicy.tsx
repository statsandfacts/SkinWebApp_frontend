"use client";
import React from "react";
import CustomHeader from "../Header/PublicLayoutHeader";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen">
      <CustomHeader
        header="Privacy Policy"
        subHeader="Your data's safety and privacy are our priority at Nextcare.Life"
        imageURL="/vector/privacy_policy.png"
      />

      <section className="mx-auto px-6 py-4 shadow-md rounded-lg mt-6 animate-slide-up">
        <p className="text-slate-600 leading-relaxed">
          At Nextcare.Life, we are committed to safeguarding your privacy and
          ensuring that your personal information is protected. This Privacy
          Policy explains how we collect, use, share, and protect your
          information when you use our website, mobile applications, products,
          and services. By accessing Nextcare.Life, you agree to the practices
          described in this Privacy Policy.
        </p>
      </section>

      <section className="px-6 py-4 space-y-4 animate-slide-up">
        <div className="p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>
              <strong>Personal Information:</strong> Information that identifies
              you as an individual, such as name, email address, phone number,
              age, and gender.
            </li>
            <li>
              <strong>Health Information:</strong> Health data you voluntarily
              provide, including medical records, prescriptions, lab results,
              symptoms, and health metrics (e.g., blood pressure, heart rate).
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              services, including IP addresses, browser type, device
              information, pages visited, and time spent on our platform.
            </li>
            <li>
              <strong>Location Data:</strong> With your consent, we may collect
              location information to provide location-specific health
              recommendations.
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We use your information to provide, maintain, and improve our
            services, including:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>
              <strong>Personalized Health Services:</strong> Tailoring your
              experience and providing relevant health recommendations through
              our Clinical Decision Support System (CDSS).
            </li>
            <li>
              <strong>Communication:</strong> Sending you important information
              about your account, services, updates, or notifications relevant
              to your health.
            </li>
            <li>
              <strong>Research and Development:</strong> Analyzing trends and
              usage to improve our offerings and develop new features.
            </li>
            <li>
              <strong>Security and Compliance:</strong> Ensuring the safety and
              integrity of our platform and complying with legal obligations.
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            3. How We Share Your Information
          </h2>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>
              <strong>With Healthcare Providers:</strong> Sharing relevant
              information with doctors or pharmacists, with your consent.
            </li>
            <li>
              <strong>With Third-Party Service Providers:</strong> Engaging
              trusted third-party vendors for data storage, analytics, and other
              services.
            </li>
            <li>
              <strong>Legal Requirements:</strong> Sharing information if
              required by law, legal process, or to protect our rights, users,
              or public safety.
            </li>
            <li>
              We do not sell your personal information to any third parties.
            </li>
          </ul>
        </div>

        {[
          {
            title: "4. Data Security",
            content:
              "We implement a variety of security measures to protect your information, including encryption, access controls, and secure servers. While we strive to protect your data, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
          },
          {
            title: "5. Data Retention",
            content:
              "We retain your personal information as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes. Upon request, we will delete your personal data if it is no longer required.",
          },
          {
            title: "6. Your Rights",
            content: `
              You have the right to:
              - Access: Request a copy of the personal data we hold about you.
              - Correction: Request corrections to any inaccurate or incomplete data.
              - Deletion: Request deletion of your personal data, subject to legal and contractual limitations.
              - Withdraw Consent: Withdraw your consent to data processing at any time, which may impact your ability to use certain services.
            `,
          },
        ].map((section, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {section.title}
            </h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-slate-600 leading-relaxed">
            If you have any questions or concerns about this Privacy Policy or
            your data, please contact us at:
          </p>
          <p className="mt-2 text-slate-600">
            <strong>Email:</strong> support@nextcare.life
            <br />
            <strong>Phone:</strong> +91 91244 26966
            <br />
            <strong>Address:</strong> Nextcare.Life, Stats and Facts
            Technologies Pvt. Ltd., KIIT-TBI, Campus 11, KIIT University, Patia,
            Bhubaneswar, Odisha 751024, India
          </p>
        </div>

        <div className="px-6 py-4 mt-8 bg-white rounded-lg shadow-md border-l-4 border-cyan-700">
          <p className="text-slate-600 leading-relaxed">
            By using our services, you acknowledge that
            you have read, understood, and agree to our data practices as
            described in this policy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
