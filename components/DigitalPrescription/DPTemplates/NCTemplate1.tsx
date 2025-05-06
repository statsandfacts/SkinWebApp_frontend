"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import {
  setIsReminderModal,
  setReminderActionKey,
  setReminderDetails,
} from "@/redux/slices/digitalPrescription/drug.slice";
import { Timer } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

interface NCtemplateProps {
  DpKeys: any;
  dpData: any;
}

const NCTemplate1 = ({ DpKeys, dpData }: NCtemplateProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { singlePrescriptionDetails, singleCaseDetails } = useSelector(
    (state: any) => state.digitalPrescription
  );

  return (
    <>
      <div className="overflow-y-auto max-h-[35rem]">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold capitalize text-slate-600">
              {DpKeys.doctor_name}: {dpData?.dr_name}
            </p>
            <p className="text-xs font-normal text-slate-400">
              {DpKeys.doctor_redg_number}:{" "}
              {singlePrescriptionDetails?.doctor_redg_number}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-slate-600">
              {DpKeys.provider_heading}
            </p>
            <p className="text-xs font-normal text-slate-400 capitalize">
              {DpKeys.provider_name}: {dpData?.prv_name}
            </p>
            <p className="text-xs font-normal text-slate-400 capitalize">
              {DpKeys.provider_dtls}: {dpData?.prv_dtls}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs font-normal text-slate-400 capitalize">
              {DpKeys.pharmacist_name}: {dpData?.ph_name}
            </p>
            <p className="text-xs font-normal text-slate-400">
              {DpKeys.pharmacist_certificate_no}:{" "}
              {singleCaseDetails?.pharmacist_certificate_no}
            </p>
          </div>
          <div>
            <p className="text-xs font-normal text-slate-400">
              {DpKeys.prescription_date}: {dpData?.prsc_date}
            </p>
            <p className="text-xs font-normal text-slate-400">
              {DpKeys.prescription_id}:{" "}
              {singlePrescriptionDetails?.prescription_id}
            </p>
          </div>
        </div>

        {dpData?.remarks && (
          <p className="mt-2 text-orange-600 rounded-sm bg-orange-50 text-xs font-semibold w-fit py-1 px-2">
            {" "}
            {DpKeys.remarks}: {dpData.remarks}{" "}
          </p>
        )}

        <div className="mt-2">
          <h1>{DpKeys.medicine_heading}</h1>
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>{DpKeys.medicine_sl_no}</TableColumn>
              <TableColumn>{DpKeys.medicine_name}</TableColumn>
              <TableColumn>{DpKeys.medicine_composition}</TableColumn>
              <TableColumn>{DpKeys.medicine_method}</TableColumn>
              <TableColumn>{DpKeys.medicine_days}</TableColumn>
              <TableColumn>{DpKeys.medicine_dosage}</TableColumn>
              <TableColumn>{DpKeys.medicine_comments}</TableColumn>
            </TableHeader>
            <TableBody>
              {dpData?.medicine_dtls.length > 0 &&
                dpData.medicine_dtls.map((medicineDetail: any, mx: number) => (
                  <TableRow key={mx}>
                    <TableCell className="text-center">{mx + 1}</TableCell>
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
                        className="bg-transparent text-orange-400"
                        onClick={() => {
                          dispatch(setReminderDetails(medicineDetail));
                          dispatch(setReminderActionKey("create"));
                          dispatch(setIsReminderModal(true));
                        }}
                      >
                        <Timer size={28} />
                      </button>
                    </TableCell>

                    <TableCell className="uppercase">
                      {medicineDetail?.composition ? (
                        <button
                          className="border-b-2 border-sky-600 cursor-pointer text-sky-800 uppercase"
                          onClick={() => {
                            const compSlug = encodeURIComponent(
                              medicineDetail?.composition
                            );
                            router.push(
                              `/prescription/composition/${compSlug}`
                            );
                          }}
                        >
                          {medicineDetail?.composition}
                        </button>
                      ) : (
                        "-"
                      )}
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
                    <TableCell>{medicineDetail?.comments}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <h1>{DpKeys.investagition_heading}</h1>
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="w-12">
                {DpKeys.medicine_sl_no}
              </TableColumn>
              <TableColumn>{DpKeys.investigation_name}</TableColumn>
              <TableColumn>{DpKeys.investigation_description}</TableColumn>
              <TableColumn>{DpKeys.investigation_comments}</TableColumn>
            </TableHeader>
            <TableBody>
              {dpData?.reports.length > 0 &&
                dpData?.reports.map((report: any, mx: number) => (
                  <TableRow key={mx}>
                    <TableCell className="text-center">{mx + 1}</TableCell>
                    <TableCell
                      className="uppercase"
                      onClick={() => {
                        if (report?.o_id) {
                          router.push(`/investigation/${report?.o_id}`);
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
                    <TableCell className="uppercase">{report?.desc}</TableCell>
                    <TableCell className="uppercase">
                      {report?.comments}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <div>
            <h1>{DpKeys.diagnosis_heading}</h1>
            <p className="text-xs font-light text-slate-400 uppercase">
              {dpData?.diagnosis}
            </p>
          </div>
          <div>
            <h1>{DpKeys.symptoms_heading}</h1>
            <p className="text-xs font-light text-slate-400 uppercase">
              {dpData?.symptoms}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NCTemplate1;
