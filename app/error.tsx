"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-center mt-4">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">
          We are under maintenance
        </h1>
        <p className="mb-4 text-lg text-gray-600">we wil up soon</p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>

        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="text-xl font-semibold">Error Details:</h2>
          <p className="whitespace-pre-wrap mt-2 text-sm">
            {error?.message}
          </p>
        </div>
        <div className="mt-4 text-gray-600">
          <button onClick={reset} className="text-blue-500">
            Refresh
          </button>
          <div>
            Let&apos;s get you back{" "}
            <a href="/" className="text-blue-500">
              home
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
