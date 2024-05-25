import React from 'react';

const howWorks = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-5 px:10 md:px-40'>
      <h1 className='text-2xl font-bold'>How it works</h1>
      <p className='text-lg font-semibold'>
        Online Skincare Dermatologist Application
      </p>

      <p>
        Nextcare.life offers a convenient and efficient way to get expert
        skincare treatment and advice plans tailored to your unique needs.
      </p>

      <div className='w-full'>
        {/* <h2 className='text-lg text-gray-800 font-bold text-left w-full mt-5'>
          How it works:
        </h2> */}
        <h2 className='text-lg text-gray-800 font-bold text-left w-full mt-5'>
          Step 1: Create an Account
        </h2>
        <ul className='space-y-1  list-disc list-inside w-full'>
          <li>
            Sign Up: Start by creating a free account using your email address
            or Phone Number.
          </li>
          <li>
            Profile Setup: Fill in your personal details, including your age,
            gender and other details to help us customize your experience.
          </li>
        </ul>

        <h2 className='text-lg text-gray-800 font-bold text-left w-full mt-5'>
          Step 2: Complete a Skin Assessment
        </h2>
        <ul className='space-y-1  list-disc list-inside w-full'>
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

        <h2 className='text-lg text-gray-800 font-bold text-left w-full mt-5'>
          Step 3: Receive Your Personalized Skincare Plan
        </h2>
        <ul className='space-y-1  list-disc list-inside w-full'>
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

        <h2 className='text-lg text-gray-800 font-bold text-left w-full mt-5'>
          Step 4: Follow-Up and Progress
        </h2>
        <ul className='space-y-1  list-disc list-inside w-full'>
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

        <h2 className='text-lg text-gray-800 font-bold text-left w-full mt-5'>
          Step 5: Education and Resources
        </h2>
        <ul className='space-y-1  list-disc list-inside w-full'>
          <li>
            Skincare Tips: Access a wealth of articles, videos, and tutorials on
            skincare best practices, new products, and trends.
          </li>
          <li>
            Community Support: Join our community forums to share experiences,
            tips, and support with other users who have similar skin concerns.
          </li>
        </ul>

        <h2 className='text-lg text-gray-800 font-bold text-left w-full mt-5'>
          Why Choose Our Application?
        </h2>
        <ul className='space-y-1  list-disc list-inside w-full'>
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

        <p className='text-lg text-gray-800 font-bold text-left w-full mt-5'>
          Start your journey to healthier, clearer skin today with our
          Nextcare.life application!
        </p>
      </div>
    </div>
  );
};

export default howWorks;
