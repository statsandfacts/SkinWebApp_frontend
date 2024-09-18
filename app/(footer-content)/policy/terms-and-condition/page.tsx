import type { Metadata } from 'next'
import TermAndCondition from "@/components/Policy/TermAndCondition";

export const metadata: Metadata = {
  title: "Terms and Conditions"
};

const Terms = () => {
  return (
    <TermAndCondition />
  )
};
export default Terms;