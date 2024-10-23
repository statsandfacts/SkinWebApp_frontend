import ShowPopover from "@/components/common/Popover";
import { setIsReminderModal } from "@/redux/slices/digitalPrescription/drug.slice";
import { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MedicineReminderForm from "./MedicineReminderForm";

const AddReminderModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isReminderModalOpen } = useSelector(
    (state: RootState) => state.drugs
  );
  return (
    <div>
      <ShowPopover
        isOpen={isReminderModalOpen}
        modalTitle="Set Reminder"
        onOpenChange={() => {
          dispatch(setIsReminderModal(false));
        }}
        isConfirmButton={false}
        isCloseButton={false}
      >
        <div>
          <MedicineReminderForm />
        </div>
      </ShowPopover>
    </div>
  );
};

export default AddReminderModal;
