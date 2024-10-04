import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BMIInfo: React.FC = () => {
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
       <button
        onClick={() => router.back()}
        className="flex items-center mb-4 text-blue-600 focus:outline-none"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
        Back
      </button>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">
        Understanding BMI
      </h1>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          What is BMI?
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 gap-6">
          <div className="sm:w-2/3 mb-4 sm:mb-6 text-gray-700 text-justify leading-relaxed">
            <p>
              BMI or Body Mass Index is a numerical value calculated from your
              height and weight. It provides a quick and easy way to estimate
              whether a person falls into categories like underweight, normal
              weight, overweight, or obese.
            </p>
            <p className="mt-2">
              <strong>Formula:</strong> BMI ={" "}
              <code>Weight (kg) / Height (m)^2</code>
            </p>
          </div>

          {/* Image on the right side for larger screens */}
          <div className="sm:w-1/3 flex justify-center sm:justify-end">
            <Image
              src="/digitalPrescription/bmi.jpeg"
              alt="BMI Calculation"
              width={300} // Adjust width as needed
              height={300} // Adjust height as needed
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Test Preparation: How to Prepare for a BMI Test
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>
            Ensure accurate measurements with light clothing and barefoot for
            height.
          </li>
          <li>
            Use reliable equipment like a calibrated scale and stadiometer.
          </li>
          <li>Maintain consistent timing when taking your measurements.</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Understanding the BMI Score
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          The BMI score categorizes individuals into different weight classes,
          helping to understand where they stand in terms of body weight and
          potential health risks.
        </p>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>
            <strong>Underweight:</strong> BMI less than 18.5
          </li>
          <li>
            <strong>Normal weight:</strong> BMI between 18.5 and 24.9
          </li>
          <li>
            <strong>Overweight:</strong> BMI between 25 and 29.9
          </li>
          <li>
            <strong>Obese:</strong> BMI 30 and above
          </li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          What is BMI Used For?
        </h2>
        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-justify">
          BMI is primarily used as a screening tool to assess general health,
          monitor weight management, evaluate health risks, and conduct public
          health assessments.
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          FAQs About BMI
        </h2>
        <ul className="list-disc pl-4 sm:pl-6 text-gray-700 space-y-2 leading-relaxed">
          <li>
            <strong>Is BMI the best way to measure health?</strong>
            <p>
              A: While BMI is a useful tool, it doesn’t account for muscle mass,
              bone density, or fat distribution.
            </p>
          </li>
          <li>
            <strong>What is considered a healthy BMI?</strong>
            <p>
              A: A BMI between 18.5 and 24.9 is generally considered healthy for
              most adults.
            </p>
          </li>
          <li>
            <strong>Can my BMI be inaccurate?</strong>
            <p>
              A: Yes, BMI might overestimate body fat in muscular individuals
              and underestimate it in sedentary people.
            </p>
          </li>
          <li>
            <strong>Can BMI be used for children?</strong>
            <p>
              A: Yes, but children&apos;s BMI is interpreted differently using growth
              charts that consider age and sex.
            </p>
          </li>
          <li>
            <strong>How can I lower my BMI?</strong>
            <p>
              A: Focus on adopting healthier lifestyle choices such as balanced
              nutrition and regular exercise.
            </p>
          </li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Conclusion
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          BMI is a convenient, non-invasive tool that provides valuable insights
          into your overall health by evaluating your body weight relative to
          your height. While it may not provide the full picture of your health
          status, understanding your BMI can empower you to take control of your
          health.
        </p>
      </section>
    </div>
  );
};

export default BMIInfo;
