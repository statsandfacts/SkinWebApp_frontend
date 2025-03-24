import { Metadata } from "next";
import UpdateEmergency from "../../_components/UpdateEmergencyContact";
import SecurityQuestion from "../../_components/SecurityQuestions";

export const metadata: Metadata = {
  title: "Security Questions",
  
};

const SecurityQuestionsPage = () => {
  return (
    <div>
      <SecurityQuestion/>
    </div>
  );
};

export default SecurityQuestionsPage;
