import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works",
};

const howWorks = () => {
  return <HowItWork />;
};

export default howWorks;

const HowItWork = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 p-10 md:px-40 rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          How It Works
        </h1>

        <div className="flex flex-col gap-6 md:gap-8">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-sky-700 text-white rounded-full text-xl font-bold">
              1
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
                Upload Your Prescription or Test Report
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Easily upload your prescription or test results with just a few
                clicks. Our platform supports a wide range of file types for
                your convenience.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-sky-700 text-white rounded-full text-xl font-bold">
              2
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
                We Analyze Your Information
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Our system processes your documents, providing detailed insights
                based on the latest medical guidelines, helping streamline your
                healthcare needs.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-sky-700 text-white rounded-full text-xl font-bold">
              3
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
                Receive Your Digital Prescription
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Once processed, you’ll receive a clear, digital version of your
                prescription or test report, accessible from any device, ready
                for your next steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SCHowWorks = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px:10 md:px-40">
      <h1 className="text-2xl font-bold">How it works</h1>
      <p className="text-lg font-semibold">
        Online Skincare Dermatologist Application
      </p>

      <p>
        Nextcare.life offers a convenient and efficient way to get expert
        skincare treatment and advice plans tailored to your unique needs.
      </p>

      <div className="w-full">
        {/* <h2 className='text-lg text-gray-800 font-bold text-left w-full mt-5'>
          How it works:
        </h2> */}
        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          Step 1: Create an Account
        </h2>
        <ul className="space-y-1  list-disc list-inside w-full">
          <li>
            Sign Up: Start by creating a free account using your email address
            or Phone Number.
          </li>
          <li>
            Profile Setup: Fill in your personal details, including your age,
            gender and other details to help us customize your experience.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          Step 2: Complete a Skin Assessment
        </h2>
        <ul className="space-y-1  list-disc list-inside w-full">
          <li>
            Skin Quiz: Take our comprehensive skin assessment quiz. This will
            include questions about your skin concerns, daily skincare routine,
            lifestyle, and medical history.
          </li>
          <li>
            Upload Photos: For a more accurate diagnosis, upload clear photos of
            your face from different angles. Our app ensures your photos are
            secure and private.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          Step 3: Receive Your Personalized Skincare Plan
        </h2>
        <ul className="space-y-1  list-disc list-inside w-full">
          <li>
            Diagnosis: Based on your Photos, the dermatologist will provide a
            detailed diagnosis of your skin condition.
          </li>
          <li>
            Customized Treatment Plan: Receive a personalized skincare regimen,
            including product recommendations tailored to your skin type and
            concerns.
          </li>
          <li>
            Prescription Services: The dermatologist can prescribe medications,
            which can be sent directly to your profile.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          Step 4: Follow-Up and Progress
        </h2>
        <ul className="space-y-1  list-disc list-inside w-full">
          <li>
            Progress Updates: When you do consultation again, you can update
            your new photo and give some notes. This helps your dermatologist
            adjust your treatment plan as needed.
          </li>
          <li>
            Follow-Up Appointments: Schedule follow-up consultations to discuss
            your progress and make any necessary adjustments to your skincare
            routine.
          </li>
          <li>
            In-App Messaging: Use our secure messaging feature to ask questions
            or seek advice between appointments.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          Step 5: Education and Resources
        </h2>
        <ul className="space-y-1  list-disc list-inside w-full">
          <li>
            Skincare Tips: Access a wealth of articles, videos, and tutorials on
            skincare best practices, new products, and trends.
          </li>
          <li>
            Community Support: Join our community forums to share experiences,
            tips, and support with other users who have similar skin concerns.
          </li>
        </ul>

        <h2 className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          Why Choose Our Application?
        </h2>
        <ul className="space-y-1  list-disc list-inside w-full">
          <li>
            Expert Advice: Get reliable and professional skincare advice from
            board-certified dermatologists.
          </li>
          <li>
            Convenience: Access quality skincare consultations from the comfort
            of your home, at a time that suits you.
          </li>
          <li>
            Personalization: Receive tailored skincare plans that address your
            unique skin needs and goals.
          </li>
          <li>
            Privacy and Security: We prioritize your privacy and ensure all your
            data is securely handled.
          </li>
        </ul>

        <p className="text-lg text-gray-800 font-bold text-left w-full mt-5">
          Start your journey to healthier, clearer skin today with our
          Nextcare.life application!
        </p>
      </div>
    </div>
  );
};
