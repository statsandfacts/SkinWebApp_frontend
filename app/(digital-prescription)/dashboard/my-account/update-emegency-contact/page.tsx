import { Metadata } from "next";
import UpdateEmergency from "../../_components/UpdateEmergencyContact";

export const metadata: Metadata = {
  title: "Update Emergency Contact",
  
};

const UpdateEmergencyPage = () => {
  return (
    <div>
      <UpdateEmergency/>
    </div>
  );
};

export default UpdateEmergencyPage;
