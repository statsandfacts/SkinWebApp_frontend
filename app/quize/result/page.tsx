import type { Metadata } from "next";
import QuizResult from "@/components/Quize/Result";

export const metadata: Metadata = {
  title: "Quiz",
};

export default function QuizePage() {
  return <QuizResult />;
}
