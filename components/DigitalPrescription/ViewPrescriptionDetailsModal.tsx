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
        <ModalContent className="mb-[4.5rem]">
          {() => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center gap-1">
                <p>Prescription Details</p>
              </ModalHeader>
              <ModalBody>
                <div className="overflow-y-auto max-h-[35rem]">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold capitalize text-slate-600">
                        Doctor Name: {singlePrescriptionDetails?.doctor_name}
                      </p>
                      <p className="text-xs font-normal text-slate-400">
                        Doctor Redg. No.:{" "}
                        {singlePrescriptionDetails?.doctor_redg_number}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs font-semibold text-slate-600">Hospital/Clinic Details</p>
                      <p className="text-xs font-normal text-slate-400">
                        Name:{" "}
                        {singlePrescriptionDetails?.provider_name}
                      </p>
                      <p className="text-xs font-normal text-slate-400">
                        Address:{" "}
                        {singlePrescriptionDetails?.provider_dtls}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-xs font-normal text-slate-400">
                        Pharmacist Name:{" "}
                        {singlePrescriptionDetails?.pharmacist_name}
                      </p>
                      <p className="text-xs font-normal text-slate-400">
                        Pharmacist License:{" "}
                        {singlePrescriptionDetails?.pharmacist_certificate_no}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-normal text-slate-400">
                        Date: {singlePrescriptionDetails?.prescription_date}
                      </p>
                      <p className="text-xs font-normal text-slate-400">
                        Prescription Id: {singlePrescriptionDetails?.rx_id}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h1>MEDICINE</h1>
                    <Table
                      removeWrapper
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn>Basic Information</TableColumn>
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
                                  onClick={() => {
                                    router.push(
                                      `/prescription/${medicineDetail?.o_id}`
                                    );
                                  }}
                                >
                                  <span
                                    className={`${
                                      medicineDetail?.o_id
                                        ? "border-b-2 border-sky-600 cursor-pointer text-sky-800"
                                        : ""
                                    }`}
                                  >
                                    {medicineDetail?.medicine_name}
                                  </span>
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

                  <div className="mt-4">
                    <h1>INVESTIGATION</h1>
                    <Table
                      removeWrapper
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>Description</TableColumn>
                        <TableColumn>COMMENTS</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {singlePrescriptionDetails?.reports.length > 0 &&
                          singlePrescriptionDetails?.reports.map(
                            (report: any, mx: number) => (
                              <TableRow key={mx}>
                                <TableCell>{report?.name}</TableCell>
                                <TableCell>{report?.desc}</TableCell>
                                <TableCell>{report?.comments}</TableCell>
                              </TableRow>
                            )
                          )}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4">
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
