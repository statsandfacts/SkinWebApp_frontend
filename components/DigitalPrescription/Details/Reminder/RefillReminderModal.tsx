import ShowPopover from "@/components/common/Popover";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsRefillReminderOpen,
  setRefillReminderActionKey,
  setRefillReminderData,
} from "@/redux/slices/digitalPrescription/refillReminder.slice";
import RefillReminderForm from "./RefillReminderForm";
import { RootState } from "@/redux/store";

const RefillReminderModal = () => {
  const dispatch = useDispatch();
  const { isRefillReminderOpen } = useSelector(
    (state: RootState) => state.refillReminder
  );

  const handleClose = () => {
    dispatch(setIsRefillReminderOpen(false));
    dispatch(setRefillReminderActionKey(null));
    dispatch(setRefillReminderData(null));
  };

  return (
    <ShowPopover
      isOpen={isRefillReminderOpen}
      modalTitle="Refill Reminder"
      onOpenChange={handleClose}
      isConfirmButton={false}
      isCloseButton={false}
    >
      <RefillReminderForm onClose={handleClose} />
    </ShowPopover>
  );
};

export default RefillReminderModal;
