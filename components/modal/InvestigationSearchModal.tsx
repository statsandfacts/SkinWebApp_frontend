import { setIsTestSearchModal } from "@/redux/slices/digitalPrescription/drug.slice";
import { RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import SearchMedicinePortal from "../Header/SearchMedicine";
import { useState } from "react";

export default function InvestigationSearchModal() {
  const dispatch = useDispatch();

  const { isSearchReportModalOpen } = useSelector(
    (state: RootState) => state.drugs
  );

  const [searchName, setSearchName] = useState<string>("medicine");

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
                Search Medicines/Lab-Investigations
              </ModalHeader>
              <ModalBody className="flex flex-col">
                <div className="h-72">
                  <div className="w-full flex justify-between rounded-md bg-gray-50 px-2 py-1">
                    <button
                      onClick={() => setSearchName("medicine")}
                      className={`${
                        searchName === "medicine"
                          ? "border-b-2 border-sky-700 hover:border-sky-600 text-sky-800 hover:text-sky-600"
                          : "text-slate-700 hover:text-slate-500"
                      } w-2/4 text-center  text-base font-medium`}
                    >
                      Medicines
                    </button>
                    <button
                      onClick={() => setSearchName("investigation")}
                      className={`${
                        searchName === "investigation"
                          ? "border-b-2 border-sky-700 hover:border-sky-600 text-sky-800 hover:text-sky-600"
                          : "text-slate-700 hover:text-slate-500"
                      } w-2/4 text-center  text-base font-medium`}
                    >
                      Lab Investigations
                    </button>
                  </div>

                  <div className="mt-2">
                    <SearchMedicinePortal
                      name={searchName}
                      boxStyle={{ maxHeight: "0" }}
                    />
                  </div>
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
