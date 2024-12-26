import type { Metadata } from "next";
import BotTestPage from "./components/BotTestPage";

export const metadata: Metadata = {
  title: "Test Bot",
};

const BotTest = () => {
  return (
    <>
      <BotTestPage />
    </>
  );
};

export default BotTest;
