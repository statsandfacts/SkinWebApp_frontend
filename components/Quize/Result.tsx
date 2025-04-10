"use client";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

export default function QuizResult() {
  const searchParams = useSearchParams();
  const correct = searchParams.get("correct");
  const incorrect = searchParams.get("incorrect");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-4xl font-bold text-green-700 mb-6">🎉 Quiz Result</h1>
      <div className="bg-white p-6 rounded-lg shadow-md text-lg space-y-4 w-full max-w-md text-center">
        <p>
          ✅ Correct Answers:{" "}
          <span className="font-bold text-green-600">{correct}</span>
        </p>
        <p>
          ❌ Incorrect Answers:{" "}
          <span className="font-bold text-red-600">{incorrect}</span>
        </p>
        <Link
          href="/quize"
          className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
