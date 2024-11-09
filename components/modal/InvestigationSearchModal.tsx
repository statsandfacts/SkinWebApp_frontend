import { setIsTestSearchModal } from "@/redux/slices/digitalPrescription/drug.slice";
import { RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import SearchMedicinePortal from "../Header/SearchMedicine";

export default function InvestigationSearchModal() {
  const dispatch = useDispatch();

  const { isSearchReportModalOpen } = useSelector(
    (state: RootState) => state.drugs
  );

  const onClose = () => {
    dispatch(setIsTestSearchModal(false));
  };

  return (
    <>
      <Modal isOpen={isSearchReportModalOpen} onOpenChange={onClose}>
        <ModalContent className="mb-20">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Search Lab Investigations 
              </ModalHeader>
              <ModalBody>
                <div className="min-h-[6rem] mb-4" >
                    <SearchMedicinePortal name={"investigation"} />
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
