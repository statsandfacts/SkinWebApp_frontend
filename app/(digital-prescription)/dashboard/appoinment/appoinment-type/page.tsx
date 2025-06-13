import { Metadata } from "next";
import AppoinmentsType from "../../_components/AppoinmentType";

export const metadata: Metadata = {
  title: "Book Appoinments",
};

const page = () => {
  return (
    <div>
      <AppoinmentsType/>
    </div>
  );
};

export default page;
