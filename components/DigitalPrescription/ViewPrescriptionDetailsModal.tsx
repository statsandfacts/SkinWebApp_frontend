import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setViewPrescriptionDetailsModal } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";

export default function ViewPrescriptionDetailsModal() {
  const dispatch = useDispatch();
  const { isViewPrescriptionDetailsModal, singlePrescriptionDetails } =
    useSelector((state: any) => state.digitalPrescription);

  const onClose = () => {
    dispatch(setViewPrescriptionDetailsModal(false));
  };

  return (
    <>
      <Modal
        size={"5xl"}
        isOpen={isViewPrescriptionDetailsModal}
        onClose={onClose}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center gap-1">
                <p>Prescription Details</p>
                <Button className="bg-sky-900 hover:bg-sky-800 text-white mr-2" variant="solid" >Download</Button>
              </ModalHeader>
              <ModalBody>
                <div className="overflow-y-auto">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-slate-600">
                      DR. Arnab swain
                    </p>
                    <p className="text-xs font-light text-slate-400">
                      M.B.B.S., M.D., (Chest)
                    </p>
                    <p className="text-xs font-light text-slate-400">
                      Tamil Nadu Medical Council REGD No: 99999
                    </p>
                    <p className="text-xs font-light text-slate-400">
                      Consultant Pulmonologist, ZZZ Hospitals, Any City
                    </p>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-600 capitalize">
                        {singlePrescriptionDetails?.name}
                      </p>
                      <p className="text-xs font-normal text-slate-400">
                        Patient Id: 16507
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 capitalize">
                        23 July 2024
                      </p>
                      <p className="text-xs font-normal text-slate-400">
                        Prescription Id: RX12345
                      </p>
                    </div>
                  </div>

                  {singlePrescriptionDetails?.prescriptionDetails.map(
                    (prescription: any, index: number) => (
                      <div key={index}>
                        <h1> {prescription?.label} </h1>
                        {["Sympotoms", "Vital Signs"].includes(
                          prescription?.label
                        ) && (
                          <p className="text-xs font-light text-slate-400">
                            {prescription?.data}
                          </p>
                        )}
                        {prescription?.label === "Tests" &&
                          prescription?.data.map((testR: any, ir: number) => (
                            <div key={ir}>
                              <h1> {testR?.testName} </h1>
                              {testR?.testData.map((tData: any, tx: number) => (
                                <div key={tx}>
                                  <p className="text-xs font-light text-slate-400 ml-2">
                                    {" "}
                                    {tData}{" "}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ))}
                        {prescription?.label === "Rx" && (
                          <Table
                            removeWrapper
                            aria-label="Example static collection table"
                          >
                            <TableHeader>
                              <TableColumn>MEDICINE NAME</TableColumn>
                              <TableColumn>How To Use</TableColumn>
                              <TableColumn>Frequency</TableColumn>
                              <TableColumn>Side Effects</TableColumn>
                              <TableColumn>Brands</TableColumn>
                              {/* <TableColumn>Safety Advice</TableColumn>
                              <TableColumn>If Missed Dose</TableColumn> */}
                            </TableHeader>
                            <TableBody>
                              {prescription?.data.map(
                                (testR: any, ir: number) => (
                                  <TableRow key={ir}>
                                    <TableCell>{testR?.medicine}</TableCell>
                                    <TableCell>
                                      {testR?.how_to_use}
                                    </TableCell>
                                    <TableCell>
                                      {testR?.frequency}
                                    </TableCell>
                                    <TableCell>
                                      {testR?.side_effects}
                                    </TableCell>
                                    <TableCell>
                                      {testR?.brands}
                                    </TableCell>
                                    {/* <TableCell>
                                      {testR?.safety_advice}
                                    </TableCell>
                                    <TableCell>
                                      {testR?.if_missed_dose}
                                    </TableCell> */}
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        )}
                      </div>
                    )
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <p className="text-sky-800 font-bold text-sm" > NextCare.life </p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
