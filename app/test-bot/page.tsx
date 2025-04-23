import type { Metadata } from "next";
import BotTestPage from "./components/BotTestPage";
import HealthBot from "./components/HealthBot";

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
