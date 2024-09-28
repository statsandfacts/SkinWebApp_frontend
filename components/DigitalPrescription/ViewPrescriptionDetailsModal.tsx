"use client";
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
import { useRouter } from "next/navigation";

export default function ViewPrescriptionDetailsModal() {
  const router = useRouter();
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
        <ModalContent className="mb-20">
          {() => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center gap-1">
                <p>Prescription Details</p>
              </ModalHeader>
              <ModalBody>
                <div className="overflow-y-auto max-h-[35rem]">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold capitalize text-slate-600">
                      {singlePrescriptionDetails?.doctor_name}
                    </p>
                    <p className="text-xs font-light text-slate-400">
                      {singlePrescriptionDetails?.provider_contact}
                    </p>
                    <p className="text-xs font-light text-slate-400">
                      {singlePrescriptionDetails?.provider_dtls}
                    </p>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-600 capitalize">
                        {singlePrescriptionDetails?.name}
                      </p>
                      <p className="text-xs font-normal text-slate-400">
                        Patient Name: {singlePrescriptionDetails?.provider_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 capitalize">
                        {singlePrescriptionDetails?.prescription_date}
                      </p>
                      <p className="text-xs font-normal text-slate-400">
                        Prescription Id: {singlePrescriptionDetails?.rx_id}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h1>MEDICINE</h1>
                    <Table
                      removeWrapper
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn>MEDICINE NAME</TableColumn>
                        <TableColumn>Composition</TableColumn>
                        <TableColumn>How To Use</TableColumn>
                        <TableColumn>Days</TableColumn>
                        <TableColumn>Dosage</TableColumn>
                        <TableColumn>Description</TableColumn>
                        <TableColumn>Comments</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {singlePrescriptionDetails?.medicine_dtls.length > 0 &&
                          singlePrescriptionDetails?.medicine_dtls.map(
                            (medicineDetail: any, mx: number) => (
                              <TableRow key={mx}>
                                <TableCell
                                  className="cursor-pointer"
                                  onClick={() => {
                                    router.push(`/prescription/${medicineDetail?.o_id}`);
                                  }}
                                >
                                  {medicineDetail?.medicine_name}
                                </TableCell>
                                <TableCell>
                                  {medicineDetail?.composition}
                                </TableCell>
                                <TableCell>
                                  {medicineDetail?.usage_instructions}
                                </TableCell>
                                <TableCell>{medicineDetail?.days}</TableCell>
                                <TableCell>{medicineDetail?.dosage}</TableCell>
                                <TableCell>
                                  {medicineDetail?.description}
                                </TableCell>
                                <TableCell>
                                  {medicineDetail?.comments}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h1>INVESTIGATION</h1>
                    <Table
                      removeWrapper
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>Description</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {singlePrescriptionDetails?.reports.length > 0 &&
                          singlePrescriptionDetails?.reports.map(
                            (report: any, mx: number) => (
                              <TableRow key={mx}>
                                <TableCell>{report?.name}</TableCell>
                                <TableCell>{report?.desc}</TableCell>
                              </TableRow>
                            )
                          )}
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <div>
                      <h1>DIAGNOSIS</h1>
                      <p className="text-xs font-light text-slate-400">
                        {singlePrescriptionDetails?.diagnosis}
                      </p>
                    </div>
                    <div>
                      <h1>SYMPTOMS</h1>
                      <p className="text-xs font-light text-slate-400">
                        {singlePrescriptionDetails?.symptoms}
                      </p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <p className="text-sky-800 font-bold text-sm">
                  {" "}
                  NextCare.life{" "}
                </p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
