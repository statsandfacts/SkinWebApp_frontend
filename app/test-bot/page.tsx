import type { Metadata } from "next";
import BotTestPage from "../../components/SymptomBot/BotTestPage";
import HealthBot from "../../components/SymptomBot/HealthBot";

export const metadata: Metadata = {
  title: "Symptom Bot",
};

const BotTest = () => {
  return (
    <>
      {/* <HealthBot /> */}
      <BotTestPage />
    </>
  );
};

export default BotTest;
