"use client";
import { Button } from "@heroui/button";
import Link from "next/link";

const VerifyConsentForm = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 p-10">
      {/* Main Content */}
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-gray-800">
          Hi [User’s Name],
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          <strong>[Name]</strong> has added you as a family member on NextCare
          to manage health-related information and services. Before proceeding,
          we need your consent.
        </p>
        <p className="text-gray-600 mt-3">
          By accepting, <strong>[Name]</strong> may have access to your health
          data, appointment scheduling, and other relevant services within the
          app.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between items-center mt-10 w-full max-w-3xl">
        {/* Accept Button - Left */}
        <div className="flex flex-col items-center">
          <Button className="rounded-lg transition" color="primary">
            Accept
          </Button>
          <p className="text-gray-600 mt-2 text-sm">
            Accept the request and share relevant information
          </p>
        </div>

        {/* Decline Button - Right */}
        <div className="flex flex-col items-center">
          <Button className=" rounded-lg transition " color="danger">
            Decline
          </Button>
          <p className="text-gray-600 mt-2 text-sm">
            Decline the request if you prefer not to share access
          </p>
        </div>
      </div>

      {/* Policy Section */}
      <div className="mt-6">
        <p className="text-gray-600 inline">
          For more details, visit{" "}
          <span>
            <Link
              href="/policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 font-medium no-underline hover:text-sky-900 transition"
            >
              NextCare Policy
            </Link>
          </span>
        </p>
      </div>

      {/* Footer - Left-aligned "Best Regards" */}
      <div className="w-full max-w-3xl mt-10">
        <p className="text-gray-500 font-semibold no-underline text-left">
          Best, <br /> NextCare Team
        </p>
      </div>
    </div>
  );
};

export default VerifyConsentForm;
