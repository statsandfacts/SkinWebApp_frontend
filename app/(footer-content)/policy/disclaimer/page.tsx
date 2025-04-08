import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
};

const Terms = () => {
  return (
    <div className=" bg-white shadow-md rounded-lg p-10 w-full">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
        Disclaimer Policy
      </h2>

      <h1 className="text-base font-bold mb-4">
        Disclaimer – Upload Prescriptions & Lab Reports for Smart Insights at
        Nextcare.Life
      </h1>

      <p className=" text-xs text-gray-800 mb-4">
        At Nextcare.Life, we strive to enhance healthcare accessibility and
        safety by digitizing handwritten prescriptions, analyzing lab reports,
        and providing AI-assisted Clinical Decision Support System (CDSS)
        insights. However, users must acknowledge and agree to the following
        terms, limitations, and responsibilities when using this service.
      </p>

      <div className=" text-xs space-y-6 text-gray-800">
        <div>
          <h2 className="text-base font-semibold mb-2">
            1. Not a Replacement for Professional Medical Advice
          </h2>
          <p>
            The services offered by Nextcare.Life, including prescription
            digitization, Smart Lab Reports, and CDSS insights, are intended to
            assist in healthcare decision-making but are not a substitute for
            professional medical advice, diagnosis, or treatment.
          </p>
          <p>
            Always consult a qualified healthcare provider before making any
            health decisions or starting, stopping, or changing medications
            based on AI-generated insights.
          </p>
        </div>

        <div>
          <h2 className=" text-base font-semibold mb-2">
            2. Accuracy & Limitations of AI-Powered Services
          </h2>
          <p>
            Our AI-driven OCR (Optical Character Recognition) technology
            attempts to accurately interpret illegible handwritten prescriptions
            and extract relevant data from lab reports. However:
          </p>
          <ul className="list-disc list-inside ml-5">
            <li>
              While we strive for high accuracy, errors in text conversion or
              medical interpretation may occur.
            </li>
            <li>
              Handwritten prescriptions vary in clarity and format, potentially
              leading to misinterpretation.
            </li>
            <li>
              Lab report analysis is based on standard reference values and may
              not account for individual patient conditions or medical history.
            </li>
          </ul>
          <p>
            Always verify the accuracy of your digitized prescriptions and lab
            report insights before making health-related decisions.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-2">
            3. AI-Generated Recommendations & CDSS Alerts
          </h2>
          <p>
            The Clinical Decision Support System (CDSS) provides alerts and
            insights on:
          </p>
          <ul className="list-disc list-inside ml-5">
            <li>Drug interactions</li>
            <li>Dosage adjustments</li>
            <li>Contraindications</li>
            <li>Allergy risks</li>
            <li>Alternative medication suggestions</li>
          </ul>
          <p>Limitations:</p>
          <ul className="list-disc list-inside ml-5">
            <li>CDSS does not replace a doctor’s clinical judgment.</li>
            <li>
              AI-generated suggestions do not consider your full medical
              history.
            </li>
            <li>
              Some medications and conditions require a doctor’s assessment
              beyond AI analysis.
            </li>
          </ul>
          <p>
            Users must confirm all CDSS recommendations with a licensed medical
            professional.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-2">
            4. User Responsibility & Proper Document Uploads
          </h2>
          <p>Users are responsible for ensuring the following:</p>
          <ul className="list-disc list-inside ml-5">
            <li>Uploaded documents are clear, legible, and accurate.</li>
            <li>
              Personal and medical details match official medical records.
            </li>
            <li>
              Reports and prescriptions are from verified medical sources.
            </li>
          </ul>
          <p>
            Uploading fraudulent, modified, or incorrect medical documents is
            strictly prohibited.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-2">
            5. Data Privacy & Security
          </h2>
          <p>
            Nextcare.Life prioritizes user confidentiality and follows strict
            security measures:
          </p>
          <ul className="list-disc list-inside ml-5">
            <li>
              All uploaded prescriptions, reports, and medical data are
              encrypted and securely stored.
            </li>
            <li>
              We do not share health information with third parties without
              explicit user consent.
            </li>
            <li>
              Users have the right to delete their uploaded documents at any
              time.
            </li>
          </ul>
          <p>Read our Privacy Policy for more details on data protection.</p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-2">
            6. Limited Liability for Misuse & Errors
          </h2>
          <p>
            Nextcare.Life, its AI systems, healthcare providers, and affiliates
            are not liable for:
          </p>
          <ul className="list-disc list-inside ml-5">
            <li>
              Misinterpretation or misdiagnosis based on AI-generated data.
            </li>
            <li>
              Errors in prescription conversion due to illegible handwriting.
            </li>
            <li>Incorrect or outdated lab report references.</li>
            <li>
              Any adverse health consequences from actions taken solely based on
              AI recommendations.
            </li>
          </ul>
          <p>
            All medical decisions must be confirmed by a licensed healthcare
            professional.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-2">
            7. Service Availability & Technical Issues
          </h2>
          <p>
            While we aim for 24/7 service availability, technical disruptions
            may occur.
          </p>
          <p>
            Users should not solely rely on Nextcare.Life for urgent or
            emergency healthcare needs.
          </p>
          <p>
            For life-threatening conditions, seek immediate medical attention at
            a hospital or emergency service.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-2">
            8. Compliance with Legal & Regulatory Guidelines
          </h2>
          <p>
            Nextcare.Life adheres to healthcare regulations and ethical AI
            guidelines but does not guarantee:
          </p>
          <ul className="list-disc list-inside ml-5">
            <li>
              Compliance with international telemedicine laws (services are
              region-specific).
            </li>
            <li>
              Recognition of AI-digitized prescriptions in all jurisdictions
              (varies by local regulations).
            </li>
          </ul>
          <p>
            Check local laws regarding digital prescriptions and telehealth
            services before use.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-2">
            9. Consent & Agreement to Terms
          </h2>
          <p>
            By using Nextcare.Lifes prescription upload, Smart Lab Reports, and
            CDSS features, you acknowledge and agree to this disclaimer.
          </p>
          <p>
            If you do not agree with these terms, please refrain from using the
            service or consult a licensed medical professional for manual
            verification.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-2">
            Start Uploading & Get Smarter Healthcare Insights with
            Nextcare.Life!
          </h2>
          <p>
            Upload your handwritten prescriptions & lab reports today and
            experience fast, AI-powered healthcare insights – but always consult
            your doctor for final decisions.
          </p>
        </div>
      </div>

      <div className="mt-10 pt-10 border-t border-gray-300">
        <h1 className="text-base font-bold mb-6">
          Disclaimer – Interactive Symptoms Bot at Nextcare.Life
        </h1>

        <div className=" text-xs space-y-6 text-gray-800">
          <div>
            <h2 className="text-base font-semibold mb-2">
              1. General Information Only
            </h2>
            <p>
              The Interactive Symptoms Bot at Nextcare.Life is designed to
              provide preliminary symptom assessment and general health guidance
              based on the information entered by users. It does not provide a
              definitive diagnosis, medical advice, or treatment
              recommendations. The bot is not a substitute for professional
              medical consultation, diagnosis, or treatment.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">
              2. Not a Medical Diagnosis Tool
            </h2>
            <p>
              The bot analyzes symptoms using a database of medical conditions
              and best practices, but it cannot replace a doctor’s expertise.
              The results generated by the bot are informational only and should
              not be considered medical advice.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">
              3. Not for Emergency Use
            </h2>
            <p>
              If you experience severe or life-threatening symptoms such as
              chest pain, breathing difficulty, loss of consciousness, seizures,
              or severe bleeding, seek immediate medical attention by visiting
              the nearest hospital or calling emergency services. The Symptoms
              Bot is not designed for emergency decision-making and should never
              be used in urgent medical situations.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">
              4. Consultation with a Medical Professional is Advised
            </h2>
            <p>
              While the bot may suggest possible causes for your symptoms, you
              should always follow up with a qualified doctor for a professional
              evaluation. If you are unsure about your symptoms, we recommend
              proceeding to our 5-Minute Clinical Consult (Telemedicine) Service
              to speak with a licensed doctor.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">
              5. Accuracy and Limitations
            </h2>
            <p>
              The bot’s responses are based on a structured question-answer
              system and medical databases. However, the following factors may
              affect accuracy:
            </p>
            <ul className="list-disc list-inside ml-5">
              <li>
                Incomplete or incorrect symptom entries may lead to misleading
                results.
              </li>
              <li>
                Individual medical history, allergies, and risk factors are not
                always fully accounted for.
              </li>
              <li>
                Certain rare or complex conditions may not be identified
                accurately.
              </li>
            </ul>
            <p>
              For a precise diagnosis and treatment, a physical examination, lab
              tests, or imaging may be required, which the bot cannot provide.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">
              6. No Prescriptions or Medication Recommendations
            </h2>
            <p>
              The Symptoms Bot does not prescribe medications, dosages, or
              treatments. If medical treatment is required, please consult a
              licensed healthcare provider.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">
              7. Privacy and Data Security
            </h2>
            <p>
              At Nextcare.Life, we prioritize your privacy and security. When
              using the Symptoms Bot:
            </p>
            <ul className="list-disc list-inside ml-5">
              <li>Your data is securely encrypted and protected.</li>
              <li>
                We do not sell or share your personal health information with
                third parties.
              </li>
              <li>
                Users may choose to delete their health assessments at any time.
              </li>
            </ul>
            <p>
              For detailed information on how we protect your data, please refer
              to our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">
              8. Not for Legal or Insurance Use
            </h2>
            <p>
              The information provided by the Symptoms Bot cannot be used for
              legal, insurance, or medical certification purposes. It is for
              personal reference only and does not serve as official medical
              documentation.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">
              9. User Responsibility
            </h2>
            <p>By using the Interactive Symptoms Bot, you acknowledge that:</p>
            <ul className="list-disc list-inside ml-5">
              <li>
                You are responsible for verifying the information with a medical
                professional.
              </li>
              <li>
                Nextcare.Life is not liable for any decisions made based on the
                bot’s results.
              </li>
              <li>
                You understand that the bot is a support tool and not a
                replacement for a doctor.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">Need More Help?</h2>
            <p>
              If you have any doubts after using the Symptoms Bot, we highly
              recommend booking a consultation with one of our expert doctors
              via the 5-Minute Clinical Consult (Telemedicine) Service.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">Important Notice</h2>
            <p>
              By proceeding to use the Symptoms Bot, you acknowledge that you
              have read, understood, and agree to this disclaimer.
            </p>
          </div>
        </div>
      </div>

      <div className="text-xs mt-10 pt-10 border-t border-gray-300">
        <h2 className="text-base font-bold text-left text-gray-800 mb-4">
          Important Disclaimer – ABDM Integration in Nextcare.Life
        </h2>

        <p className="mb-4 text-gray-700">
          At Nextcare.Life, we prioritize secure and seamless digital health
          management in collaboration with Ayushman Bharat Digital Mission
          (ABDM). However, users must be aware of the following important points
          before using ABDM integration:
        </p>

        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="font-semibold text-base mb-1">
              1. Digital Health, Not a Substitute for Medical Care
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                ABDM integration in Nextcare.Life is only for managing your
                digital health records.
              </li>
              <li>
                It does not replace in-person medical consultations, emergency
                treatments, or professional medical advice.
              </li>
              <li>
                Always consult a qualified healthcare provider for diagnosis and
                treatment decisions.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              2. Your Privacy & Security Are Our Priority
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Your ABHA ID (Ayushman Bharat Health Account) and medical
                records are stored securely.
              </li>
              <li>
                Nextcare.Life does NOT access your health data without your
                explicit consent.
              </li>
              <li>
                All transactions are encrypted, ensuring that your personal
                health data remains confidential and protected.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              3. Responsibility for Data Accuracy
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Users are responsible for ensuring that all uploaded medical
                records are accurate and up to date.
              </li>
              <li>
                Always verify your reports, prescriptions, and health records
                before sharing them with doctors, hospitals, or insurers.
              </li>
              <li>
                Any errors in the uploaded data may impact your medical care.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              4. Digital Convenience, But Treatment by Experts
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                ABDM facilitates the digital sharing of prescriptions, lab
                reports, and health records.
              </li>
              <li>
                Treatment plans, medication choices, and medical advice should
                always be determined by a qualified doctor.
              </li>
              <li>
                Digital health tools support but do not replace clinical
                judgment and professional medical expertise.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              5. Technical & Data Synchronization Limitations
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                ABDM is a nationwide platform, and data synchronization between
                different hospitals, labs, and clinics may take time.
              </li>
              <li>
                Delays or temporary unavailability of data due to network issues
                or server downtimes are possible.
              </li>
              <li>
                Nextcare.Life is not responsible for any technical issues
                arising from ABDM’s national database.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              Final Note – Stay Informed & Stay Secure
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Use ABDM integration responsibly.</li>
              <li>Double-check your health data before sharing.</li>
              <li>Seek professional medical advice for any health concerns.</li>
              <li>
                Report technical issues to ABDM Support (help@ndhm.gov.in).
              </li>
            </ul>
          </div>

          <p className="font-semibold">
            Your Health, Your Data, Your Control – Nextcare.Life & ABDM Together
            for a Healthier Future.
          </p>
        </div>
      </div>
      <div className="text-xs mt-20 pt-10 border-t border-gray-300">
        <h2 className="text-base font-bold text-left  text-gray-800 mb-8">
          Legal Disclaimer for 5-Minute Clinical Consult (Telemedicine) at
          Nextcare.Life
        </h2>

        <div className="space-y-6 text-gray-700">
          <p>
            <strong>Effective Date:</strong> [Insert Date]
          </p>
          <p>
            <strong>Applicable Jurisdiction:</strong> India
          </p>

          <div>
            <h3 className="font-semibold text-base mb-1">
              1. Nature & Scope of Consultation
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                This is a brief virtual consultation for general advice, initial
                assessment, and health education.
              </li>
              <li>
                It does not replace in-person exams, emergency care, or ongoing
                treatment plans.
              </li>
              <li>
                It follows Telemedicine Practice Guidelines (2020) under the
                Indian Medical Council Act, 1956.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              2. Eligibility & Patient Consent
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Patients must consent and provide complete, accurate health
                information.
              </li>
              <li>Service is only for residents of India.</li>
              <li>Misrepresentation may impact the quality of advice.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              3. Emergency Care Disclaimer
            </h3>
            <p>
              This service is NOT for emergencies. Contact 108 or visit the
              nearest hospital if experiencing chest pain, allergic reactions,
              stroke symptoms, or severe injury.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              4. Use of AI-Based Pre-Evaluation & Health Records
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Use the Interactive Symptoms Bot and upload relevant health
                documents for better service.
              </li>
              <li>AI tools assist but do not replace doctor judgment.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              5. Prescription Policy
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Doctors may or may not prescribe medications after evaluation.
              </li>
              <li>
                Only OTC and permitted medicines (List O/A) can be prescribed
                via teleconsultation.
              </li>
              <li>Restricted drugs cannot be prescribed remotely.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              6. Confidentiality & Data Protection
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                We comply with the IT Act, Telemedicine Guidelines, and the
                Personal Data Protection Bill.
              </li>
              <li>No data is shared or sold without consent.</li>
              <li>
                Users are responsible for maintaining privacy during sessions.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              7. Limitations & Liability
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                We are not liable for misinterpretation due to virtual
                limitations.
              </li>
              <li>
                Accuracy of patient-provided information is the patients
                responsibility.
              </li>
              <li>Follow-up is essential if symptoms persist.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              8. Follow-Up & Referrals
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Doctors may recommend follow-up consults, specialist referrals,
                or in-person visits.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              9. Governing Law & Dispute Resolution
            </h3>
            <p>
              This service is governed by Indian laws. Disputes shall be under
              jurisdiction of courts in [Insert Location, India].
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              10. Acknowledgment & Agreement
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                You acknowledge and agree to the terms above before using this
                service.
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-600">
            By proceeding, you agree to the Terms & Conditions. Please contact
            [Insert Contact Information] for any concerns.
          </p>
        </div>
      </div>
      <div className="text-xs mt-10 pt-10 border-t border-gray-300">
        <h2 className="text-base font-bold text-left text-gray-800 mb-8">
          Comprehensive Disclaimer – Nextcare.Life Services
        </h2>

        <p className="mb-6 text-gray-700">
          At Nextcare.Life, we aim to revolutionize healthcare with AI-assisted
          clinical solutions, including:
        </p>

        <ul className="list-disc list-inside mb-6 text-gray-700 space-y-1">
          <li>
            Uploading illegible handwritten prescriptions & lab reports for
            smart insights
          </li>
          <li>
            5-Minute Clinical Consult (Telemedicine) for quick doctor access
          </li>
          <li>Interactive Symptoms Bot for AI-powered pre-evaluation</li>
        </ul>

        <p className="mb-6 text-gray-700">
          While we strive to provide fast, accurate, and expert-guided medical
          support, users must acknowledge the scope, limitations, and
          responsibilities associated with these services.
        </p>

        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="font-semibold text-base mb-1">
              1. General Disclaimer: Not a Replacement for Professional Medical
              Care
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Nextcare.Life services are intended to assist in healthcare
                decision-making but do not replace direct medical diagnosis,
                treatment, or emergency care.
              </li>
              <li>
                Always consult a licensed healthcare professional before making
                health-related decisions based on our AI-powered insights or
                telemedicine consultations.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              2. Uploading Illegible Handwritten Prescriptions & Lab Reports for
              Smart Insights
            </h3>
            <p className="mb-2">How It Works:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Our AI digitizes illegible handwritten prescriptions and
                extracts relevant medical data from lab reports.
              </li>
              <li>
                We provide Smart Lab Reports with clinical insights and
                reference values.
              </li>
              <li>
                Our Clinical Decision Support System (CDSS) offers drug
                interaction alerts, contraindications, and dosage suggestions.
              </li>
            </ul>
            <p className="mt-2 mb-2">Limitations & User Responsibilities:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                AI may misinterpret unclear or complex handwriting. Always
                verify digital prescriptions with your doctor.
              </li>
              <li>CDSS does not replace a doctors professional judgment.</li>
              <li>
                Users must upload genuine, unaltered medical documents.
                Fraudulent uploads are strictly prohibited.
              </li>
            </ul>
            <p className="mt-2 mb-2">Privacy & Security:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Your medical records are encrypted and confidential. We do not
                share data with third parties without your consent.
              </li>
              <li>Users can delete uploaded records at any time.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              3. 5-Minute Clinical Consult (Telemedicine) – Fast, Expert-Guided
              Healthcare
            </h3>
            <p className="mb-2">How It Works:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Get instant access to a qualified doctor within 5 minutes.
              </li>
              <li>Consult via video, audio, or text chat.</li>
              <li>
                Receive a diagnosis, treatment plan, and digital prescription if
                needed.
              </li>
            </ul>
            <p className="mt-2 mb-2">Limitations & User Responsibilities:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Not for medical emergencies. Seek immediate hospital care for
                life-threatening conditions.
              </li>
              <li>
                Doctors provide general medical advice but may recommend
                in-person follow-ups or additional tests.
              </li>
              <li>
                Service availability depends on doctor availability and internet
                connectivity.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              4. Interactive Symptoms Bot – AI-Powered Pre-Evaluation
            </h3>
            <p className="mb-2">How It Works:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Users input symptoms, and the bot provides preliminary health
                insights.
              </li>
              <li>
                The bot assists in triaging cases before a doctor consultation.
              </li>
              <li>
                AI-generated insights improve diagnostic accuracy and reduce
                consultation time.
              </li>
            </ul>
            <p className="mt-2 mb-2">Limitations & User Responsibilities:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Not a substitute for a doctor – The bot provides general
                guidance, not a medical diagnosis.
              </li>
              <li>
                AI cannot assess complex cases, chronic conditions, or
                emergencies.
              </li>
              <li>
                Accuracy depends on user-provided inputs. Always be truthful
                when entering symptoms.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              5. Data Privacy & Security
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Nextcare.Life is committed to protecting your personal and
                medical data.
              </li>
              <li>All data is securely encrypted and stored confidentially.</li>
              <li>
                User consent is required before sharing records with healthcare
                providers.
              </li>
              <li>You can delete your medical records anytime.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              6. Limited Liability for Misuse & Errors
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Nextcare.Life, its AI systems, and associated healthcare
                providers are NOT liable for:
              </li>
              <li>
                Misinterpretation or misdiagnosis due to AI limitations or
                user-provided data errors.
              </li>
              <li>
                Adverse effects caused by self-medication based on AI insights.
              </li>
              <li>Technical disruptions affecting service availability.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              7. Service Availability & Compliance
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Nextcare.Life follows healthcare regulations, but service
                availability may depend on:
              </li>
              <li>Regional telemedicine laws.</li>
              <li>Internet and platform connectivity.</li>
              <li>
                For medical emergencies, always visit a hospital or call
                emergency services.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-1">
              8. Consent & Agreement to Terms
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                By using Nextcare.Life services, you acknowledge and agree to
                this disclaimer and terms of use.
              </li>
              <li>
                If you do not agree, please refrain from using the service and
                consult a licensed medical professional.
              </li>
            </ul>
          </div>

          <p className="font-semibold">
            Get smart, fast & reliable healthcare with Nextcare.Life today.
            Upload your prescriptions, consult a doctor in 5 minutes, or use the
            AI Symptoms Bot – but always confirm with your doctor before making
            critical health decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
