import { Metadata } from "next";
import Reminders from "../_components/Reminders";

export const metadata: Metadata = {
  title: "Reminders",
};

const RemindersPage = () => {
  return (
    <div>
      <Reminders />
    </div>
  );
};

export default RemindersPage;
