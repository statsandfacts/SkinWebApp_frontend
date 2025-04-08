import type { Metadata } from "next";
import QuizClient from "@/components/Quize/QuizClient";

export const metadata: Metadata = {
  title: "Quiz",
};

export default function QuizePage() {
  return <QuizClient />;
}
