import { Metadata } from "next";
import Appoiments from "../_components/Appoinments";

export const metadata: Metadata = {
  title: "Book Appoinments",
};

const RemindersPage = () => {
  return (
    <div>
      <Appoiments />
    </div>
  );
};

export default RemindersPage;
