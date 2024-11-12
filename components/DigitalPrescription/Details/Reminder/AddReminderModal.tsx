import ShowPopover from "@/components/common/Popover";
import {
  setIsReminderModal,
  setReminderActionKey,
  setReminderDetails,
} from "@/redux/slices/digitalPrescription/drug.slice";
import { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MedicineReminderForm from "./MedicineReminderForm";

const AddReminderModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isReminderModalOpen } = useSelector(
    (state: RootState) => state.drugs
  );

  const onClose = () => {
    dispatch(setReminderActionKey(null));
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
        <div>
          <MedicineReminderForm onClose={onClose} />
        </div>
      </ShowPopover>
    </div>
  );
};

export default AddReminderModal;
