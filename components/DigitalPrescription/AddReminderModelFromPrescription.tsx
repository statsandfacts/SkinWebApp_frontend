import ShowPopover from "@/components/common/Popover";
import {
  setIsReminderModal,
  setReminderDetails,
} from "@/redux/slices/digitalPrescription/drug.slice";
import { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MedicineReminderFormFormPrescription from "./MedicineReminderFromFormPrescription";

const AddReminderModalFromPrescription = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isReminderModalOpen } = useSelector(
    (state: RootState) => state.drugs
  );

  const onClose = () => {
    dispatch(setReminderDetails(null));
    dispatch(setIsReminderModal(false));
  };

  return (
    <div>
      <ShowPopover
        isOpen={isReminderModalOpen}
        modalTitle="Set Reminder"
        onOpenChange={onClose}
        isConfirmButton={false}
        isCloseButton={false}
      >
        <MedicineReminderFormFormPrescription onClose={onClose} />
      </ShowPopover>
    </div>
  );
};

export default AddReminderModalFromPrescription;
