import { Metadata } from "next";
import FamilyMember from "../_components/FamilyMember";

export const metadata: Metadata = {
  title: "Family Member",
};

const FamilyMemberPage = () => {
  return (
    <>
      <FamilyMember />
    </>
  );
};

export default FamilyMemberPage;
