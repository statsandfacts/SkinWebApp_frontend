"use client";
import { usePathname } from "next/navigation";
import { COMMON } from "@/config/const";

const TermAndCondition = () => {
  const pathname = usePathname();

  return (
    <>
      <TermsDP />
      {/* {COMMON.DIGITAL_PRESCRIPTION_ROUTES.includes(pathname) ? (
        <TermsDP />
      ) : (
        <TermsSkinCare />
      )} */}
    </>
  );
};

export default TermAndCondition;

const TermsSkinCare = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">
        Terms and Conditions for Online Dermatology Consulting Provider Platform
      </h1>
      <div className="  rounded-md text-justify">
        <ul className=" p-2 mt-5">
          <li>
            This Privacy Policy (&ldquo;Policy&ldquo;) describes how
            Nextcare.life (A product of Stats and Facts Technology)
            (&ldquo;Nextcare.life,&ldquo; &ldquo;we,&ldquo; &ldquo;us,&ldquo; or
            &ldquo;our&ldquo;) collects, uses, and discloses personal
            information collected from users (&ldquo;Users&ldquo;) of the online
            dermatology consulting provider platform (&ldquo;Platform&ldquo;).
            By accessing or using the Platform, you agree to the terms of this
            Policy.
          </li>
        </ul>

        <ol className="space-y-4 list-decimal list-inside mt-5 p-2">
          <li>
            {" "}
            <span className="text-lg font-bold">Information We Collect</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                The Platform facilitates online dermatology consultations
                between users (&quot;Users&quot;) and licensed dermatologists
                (&quot;Providers&quot;).
              </li>
              <li>
                Providers are independent contractors responsible for providing
                professional medical services and are solely responsible for the
                diagnoses, treatments, and prescriptions they provide.
              </li>
            </ul>
          </li>
          <li>
            {" "}
            <span className="text-lg font-bold"> Eligibility</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                Users must be at least 18 years old to use the Platform. By
                accessing or using the Platform, you represent and warrant that
                you are at least 18 years old.
              </li>
              <li>
                Providers must hold valid licenses to practice dermatology in
                their respective jurisdictions and comply with all applicable
                laws and regulations.
              </li>
            </ul>
          </li>
          <li>
            {" "}
            <span className="text-lg font-bold"> User Responsibilities</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                Users are responsible for providing accurate and complete
                medical information to Providers.
              </li>
              <li>
                Users must not use the Platform for emergency medical
                situations. In case of a medical emergency, users should seek
                immediate medical attention.
              </li>
              <li>
                Users are responsible for maintaining the confidentiality of
                their login credentials and for all activities that occur under
                their accounts.
              </li>
            </ul>
          </li>
          <li>
            {" "}
            <span className="text-lg font-bold">
              {" "}
              Provider Responsibilities
            </span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                Providers must provide medical services with reasonable care and
                skill, in accordance with applicable professional standards.
              </li>
              <li>
                Providers must comply with all applicable laws and regulations,
                including those related to patient privacy and confidentiality.
              </li>
            </ul>
          </li>
          <li>
            {" "}
            <span className="text-lg font-bold"> Fees and Payments</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                Users agree to pay all fees associated with consultations and
                services provided through the Platform.
              </li>
              <li>
                Fees are disclosed to Users prior to requesting a consultation,
                and Users must provide valid payment information to complete
                transactions.
              </li>
              <li>
                Fees may vary depending on the nature of the consultation and
                the Provider selected.
              </li>
            </ul>
          </li>
          <li>
            {" "}
            <span className="text-lg font-bold">Privacy Policy</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                Our Privacy Policy governs the collection, use, and disclosure
                of personal information provided by Users. By using the
                Platform, you consent to the terms of our Privacy Policy.
              </li>
              <li>
                Fees are disclosed to Users prior to requesting a consultation,
                and Users must provide valid payment information to complete
                transactions.
              </li>
              <li>
                Fees may vary depending on the nature of the consultation and
                the Provider selected.
              </li>
            </ul>
          </li>
          <li>
            <span className="text-lg font-bold">Intellectual Property</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                The Platform and its contents are owned by the Company and are
                protected by intellectual property laws. Users may not use,
                reproduce, or distribute the Platform or its contents without
                our prior written consent.
              </li>
            </ul>
          </li>
          <li>
            <span className="text-lg font-bold">Disclaimer of Warranties</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                THE PLATFORM IS PROVIDED&quot;AS IS&quot; AND &quot;AS
                AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS
                OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT
                LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </li>
            </ul>
          </li>
          <li>
            <span className="text-lg font-bold">Limitation of Liability</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                IN NO EVENT SHALL THE COMPANY BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, ARISING
                OUT OF OR IN CONNECTION WITH THE USE OF THE PLATFORM.
              </li>
            </ul>
          </li>
          <li>
            <span className="text-lg font-bold"> Governing Law</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                These Terms shall be governed by and construed in accordance
                with the laws of [Jurisdiction], without regard to its conflicts
                of law provisions.
              </li>
            </ul>
          </li>
          <li>
            <span className="text-lg font-bold"> Modifications to Terms</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                We reserve the right to modify these Terms at any time, without
                prior notice. Updated Terms will be posted on the Platform, and
                your continued use of the Platform constitutes acceptance of the
                modified Terms.
              </li>
            </ul>
          </li>
          <li>
            <span className="text-lg font-bold"> Termination</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                We reserve the right to terminate or suspend your access to the
                Platform, without prior notice or liability, for any reason
                whatsoever, including, without limitation, breach of these
                Terms.
              </li>
            </ul>
          </li>
          <li>
            <span className="text-lg font-bold"> Contact Us</span>
            <ul className="space-y-1  list-disc list-inside w-full">
              <li>
                If you have any questions or concerns about these Terms, please
                contact us at [Contact Information].
              </li>
            </ul>
          </li>
        </ol>

        <p>
          By accessing or using the Platform, you acknowledge that you have
          read, understood, and agree to be bound by these Terms.
        </p>
      </div>
    </div>
  );
};

export const TermsDP = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-2">
        Terms and Conditions
      </h1>
      {COMMON.TERN_AND_CONDITION_DP.map((item, index) => (
        <div key={index}>
          {item?.appDescription && (
            <h1 className="mb-2">{item.appDescription}</h1>
          )}
          {item?.heading && (
            <p className="text-lg font-bold">{item?.heading}</p>
          )}
          {item?.description &&
            item?.description.map((desc, dx) => (
              <div key={dx} className="ml-4">
                <li className="font-normal text-slate-600">{desc}</li>
              </div>
            ))}
        </div>
      ))}
      <div className="mt-3">
        <p className="text-lg font-bold">Disclaimer: </p>
        <p className="ml-4">
          By using Nextcare.Life services, you agree to these terms and
          conditions. For any concerns or questions regarding your health or
          treatment plan, always seek the advice of a healthcare professional.
        </p>
        <p className="ml-4">
          This disclaimer ensures that Nextcare.Life is clear about the
          limitations of its services, reducing liability risks while
          encouraging users to consult with licensed professionals. It also
          complies with Indian legal standards relevant to health tech services.
        </p>
      </div>
    </div>
  );
};
