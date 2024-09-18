import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import ChoosePrescriptionType from "./Steps/ChoosePrescriptionType";
import ChoosePrescSubType from "./Steps/ChoosePrescSubType";
import UploadDocumentImage from "./Steps/UploadPrescriptionImage";
import UploadDocumentsSamePrescription from "./Steps/UploadDocumentsSamePrescription";

const UploadPrescriptionStep = () => {
  const { step } = useSelector((state: RootState) => state.stepManagement);

  const returnSteps = (step: number) => {
    switch (step) {
      case 0:
        return <ChoosePrescriptionType />;
      case 1:
        return <ChoosePrescSubType />;
      case 2:
        return <UploadDocumentImage />;
      case 3:
        return <UploadDocumentsSamePrescription />;
      default:
        return <></>;
    }
  };

  return <>{returnSteps(step)}</>;
};

export default UploadPrescriptionStep;