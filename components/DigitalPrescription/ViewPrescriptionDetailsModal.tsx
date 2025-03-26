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
import {
  setIsReminderModal,
  setIsReminderPrescModal,
  setReminderActionKey,
  setReminderDetails,
  setReminderMedicineDtlsPresc,
} from "@/redux/slices/digitalPrescription/drug.slice";
import { Timer } from "lucide-react";

import AddReminderModalFromPrescription from "./Details/Reminder/AddReminderModelFromPrescription";

export default function ViewPrescriptionDetailsModal() {
  const router = useRouter();
  const [selectedMedicine, setSelectedMedicine] = React.useState("");

  const dispatch = useDispatch();
  const {
    isViewPrescriptionDetailsModal,
    singlePrescriptionDetails,
    singleCaseDetails,
  } = useSelector((state: any) => state.digitalPrescription);

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
                      <p className="text-xs font-semibold text-slate-600">
                        Hospital/Clinic Details
                      </p>
                      <p className="text-xs font-normal text-slate-400 capitalize">
                        Name: {singlePrescriptionDetails?.provider_name}
                      </p>
                      <p className="text-xs font-normal text-slate-400 capitalize">
                        Address: {singlePrescriptionDetails?.provider_dtls}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-xs font-normal text-slate-400 capitalize">
                        Pharmacist Name: {singleCaseDetails?.pharmacist_name}
                      </p>
                      <p className="text-xs font-normal text-slate-400">
                        Pharmacist License:{" "}
                        {singleCaseDetails?.pharmacist_certificate_no}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-normal text-slate-400">
                        Date: {singlePrescriptionDetails?.prescription_date}
                      </p>
                      <p className="text-xs font-normal text-slate-400">
                        Prescription Id:{" "}
                        {singlePrescriptionDetails?.prescription_id}
                      </p>
                    </div>
                  </div>

                  {singlePrescriptionDetails?.remarks && (
                    <p className="mt-2 text-orange-600 rounded-sm bg-orange-50 text-xs font-semibold w-fit py-1 px-2">
                      {" "}
                      Remark: {singlePrescriptionDetails?.remarks}{" "}
                    </p>
                  )}

                  <div className="mt-2">
                    <h1>MEDICINE</h1>
                    <Table
                      removeWrapper
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn>Sl No</TableColumn>
                        <TableColumn>Medicine Name</TableColumn>
                        <TableColumn>Composition</TableColumn>
                        <TableColumn>How To Use</TableColumn>
                        <TableColumn>Days</TableColumn>
                        <TableColumn>Dosage</TableColumn>
                        {/* <TableColumn>Description</TableColumn> */}
                        <TableColumn>Comments</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {singlePrescriptionDetails?.medicine_dtls.length > 0 &&
                          singlePrescriptionDetails?.medicine_dtls.map(
                            (medicineDetail: any, mx: number) => (
                              <TableRow key={mx}>
                                <TableCell className="text-center">
                                  {mx + 1}
                                </TableCell>
                                <TableCell className="flex justify-between items-center">
                                  <button
                                    className={`${
                                      medicineDetail?.o_id
                                        ? "border-b-2 border-sky-600 cursor-pointer uppercase text-sky-800"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      if (medicineDetail?.o_id) {
                                        router.push(
                                          `/prescription/${medicineDetail?.o_id}`
                                        );
                                      }
                                    }}
                                  >
                                    <b>{medicineDetail?.medicine_name}</b>
                                  </button>
                                  <button
                                    className="text-orange-400"
                                    onClick={(e) => {
                                      dispatch(
                                        setReminderMedicineDtlsPresc(
                                          medicineDetail
                                        )
                                      );
                                      dispatch(setIsReminderPrescModal(true));
                                    }}
                                  >
                                    <Timer />
                                  </button>
                                </TableCell>

                                <TableCell className="uppercase">
                                  {medicineDetail?.composition}
                                </TableCell>
                                <TableCell className="uppercase">
                                  {medicineDetail?.usage_instructions}
                                </TableCell>
                                <TableCell className="uppercase">
                                  {medicineDetail?.days}
                                </TableCell>
                                <TableCell className="uppercase">
                                  {medicineDetail?.dosage}
                                </TableCell>
                                {/* <TableCell className="uppercase">
                                  {medicineDetail?.description}
                                </TableCell> */}
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
                        <TableColumn className="w-12">Sl No</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>Description</TableColumn>
                        <TableColumn>COMMENTS</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {singlePrescriptionDetails?.reports.length > 0 &&
                          singlePrescriptionDetails?.reports.map(
                            (report: any, mx: number) => (
                              <TableRow key={mx}>
                                <TableCell className="text-center">
                                  {mx + 1}
                                </TableCell>
                                <TableCell
                                  className="uppercase"
                                  onClick={() => {
                                    if (report?.o_id) {
                                      router.push(
                                        `/investigation/${report?.o_id}`
                                      );
                                    }
                                  }}
                                >
                                  <span
                                    className={`${
                                      report?.o_id
                                        ? "border-b-2 border-sky-600 cursor-pointer uppercase text-sky-800"
                                        : ""
                                    }`}
                                  >
                                    {report?.name}
                                  </span>
                                </TableCell>
                                <TableCell className="uppercase">
                                  {report?.desc}
                                </TableCell>
                                <TableCell className="uppercase">
                                  {report?.comments}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4">
                    <div>
                      <h1>DIAGNOSIS</h1>
                      <p className="text-xs font-light text-slate-400 uppercase">
                        {singlePrescriptionDetails?.diagnosis}
                      </p>
                    </div>
                    <div>
                      <h1>SYMPTOMS</h1>
                      <p className="text-xs font-light text-slate-400 uppercase">
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

      <AddReminderModalFromPrescription />
    </>
  );
}
