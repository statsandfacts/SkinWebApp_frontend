import { Metadata } from "next";
import OnlineConsultation from "../../_components/OnlineConsultation";

export const metadata: Metadata = {
  title: "Book Appoinments",
};

const page = () => {
  return (
    <div>
     <OnlineConsultation/>
    </div>
  );
};

export default page;
