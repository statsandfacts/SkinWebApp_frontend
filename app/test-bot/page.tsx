import type { Metadata } from "next";
import BotTestPage from "./components/BotTestPage";
import HealthBot from "./components/HealthBot";

export const metadata: Metadata = {
  title: "Test Bot",
};

const BotTest = () => {
  return (
    <>
      <HealthBot />
    </>
  );
};

export default BotTest;
