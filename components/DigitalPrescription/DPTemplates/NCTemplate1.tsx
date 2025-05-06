import React, { useState } from "react";
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
  prescriptionDetails: any;
}

const NCTemplate1 = ({prescriptionDetails}: NCtemplateProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  // const { singlePrescriptionDetails, singleCaseDetails } = useSelector(
  //   (state: any) => state.digitalPrescription
  // );

  // const [dpData, setDpData] = useState<any>({
  //   target_lang: "or",
  //   dp_keys: {
  //     doctor_name: "Doctor Name",
  //     doctor_redg_number: "Doctor Redg. No.",
  //     provider_heading: "Hospital/Clinic Details",
  //     provider_name: "Name",
  //     provider_dtls: "Address",
  //     pharmacist_name: "Pharmacist Name",
  //     pharmacist_certificate_no: "Pharmacist License",
  //     prescription_date: "Date",
  //     prescription_id: "Prescription Id",
  //     remarks: "Remarks",
  //     medicine_heading: "MEDICINE",
  //     medicine_sl_no: "Sl No",
  //     medicine_name: "Medicine Name",
  //     medicine_composition: "Compisition",
  //     medicine_method: "How to use",
  //     medicine_days: "Days",
  //     medicine_dosage: "Dosage",
  //     medicine_comments: "Comments",
  //     investagition_heading: "INVESTIGATION",
  //     investigation_name: "Name",
  //     investigation_description: "Description",
  //     investigation_comments: "Comments",
  //     diagnosis_heading: "DIAGNOSIS",
  //     symptoms_heading: "SYMPTOMS"
  //   },
  //   dp_details: {
  //     dr_name: singlePrescriptionDetails?.doctor_name,
  //     dr_redg_no: singlePrescriptionDetails?.doctor_redg_number,
  //     prv_name: singlePrescriptionDetails?.provider_name,
  //     prv_dtls: singlePrescriptionDetails?.provider_dtls,
  //     ph_name: singleCaseDetails?.pharmacist_name,
  //     ph_lis_no: singleCaseDetails?.pharmacist_certificate_no,
  //     prsc_date: singlePrescriptionDetails?.prescription_date,
  //     prsc_id: singlePrescriptionDetails?.prescription_id,
  //     remarks: singlePrescriptionDetails?.remarks,
  //     medicine_dtls: singlePrescriptionDetails?.medicine_dtls,
  //     reports: singlePrescriptionDetails?.reports,
  //     diagnosis: singlePrescriptionDetails?.diagnosis,
  //     symptoms: singlePrescriptionDetails?.symptoms
  //   }

  // });

  return (
    <>
      <div className="overflow-y-auto max-h-[35rem]">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold capitalize text-slate-600">
              {prescriptionDetails.dp_keys.doctor_name}: {prescriptionDetails.dp_details.dr_name}
            </p>
            <p className="text-xs font-normal text-slate-400">
            {prescriptionDetails.dp_keys.doctor_redg_number}: {prescriptionDetails?.dr_redg_no}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-slate-600">
            {prescriptionDetails.dp_keys.provider_heading}
            </p>
            <p className="text-xs font-normal text-slate-400 capitalize">
              {prescriptionDetails.provider_name}: {prescriptionDetails?.prv_name}
            </p>
            <p className="text-xs font-normal text-slate-400 capitalize">
              {prescriptionDetails.provider_dtls}: {prescriptionDetails?.prv_dtls}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs font-normal text-slate-400 capitalize">
              {prescriptionDetails.pharmacist_name}: {prescriptionDetails?.ph_name}
            </p>
            <p className="text-xs font-normal text-slate-400">
            {prescriptionDetails.pharmacist_certificate_no}: {prescriptionDetails?.ph_lis_no}
            </p>
          </div>
          <div>
            <p className="text-xs font-normal text-slate-400">
            {prescriptionDetails.prescription_date}: {prescriptionDetails?.prsc_date}
            </p>
            <p className="text-xs font-normal text-slate-400">
            {prescriptionDetails.dp_keys.prescription_id}: {prescriptionDetails?.dp_details.prsc_id}
            </p>
          </div>
        </div>

        {prescriptionDetails?.remarks && (
          <p className="mt-2 text-orange-600 rounded-sm bg-orange-50 text-xs font-semibold w-fit py-1 px-2">
            {" "}
            {prescriptionDetails.dp_keys.remarks}: {prescriptionDetails?.dp_details.remarks}{" "}
          </p>
        )}

        <div className="mt-2">
          <h1>{prescriptionDetails.dp_keys.medicine_heading}</h1>
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>{prescriptionDetails.dp_keys.medicine_sl_no}</TableColumn>
              <TableColumn>{prescriptionDetails.dp_keys.medicine_name}</TableColumn>
              <TableColumn>{prescriptionDetails.dp_keys.medicine_composition}</TableColumn>
              <TableColumn>{prescriptionDetails.dp_keys.medicine_method}</TableColumn>
              <TableColumn>{prescriptionDetails.dp_keys.medicine_days}</TableColumn>
              <TableColumn>{prescriptionDetails.dp_keys.medicine_dosage}</TableColumn>
              <TableColumn>{prescriptionDetails.dp_keys.medicine_comments}</TableColumn>
            </TableHeader>
            <TableBody>
              {prescriptionDetails?.dp_details.medicine_dtls.length > 0 &&
                prescriptionDetails?.dp_details.medicine_dtls.map(
                  (medicineDetail: any, mx: number) => (
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
                  )
                )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <h1>INVESTIGATION</h1>
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="w-12">Sl No</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>Description</TableColumn>
              <TableColumn>COMMENTS</TableColumn>
            </TableHeader>
            <TableBody>
              {prescriptionDetails?.dp_details.reports.length > 0 &&
                prescriptionDetails?.dp_details.reports.map(
                  (report: any, mx: number) => (
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
            <h1>{prescriptionDetails?.dp_keys.diagnosis_heading}</h1>
            <p className="text-xs font-light text-slate-400 uppercase">
              {prescriptionDetails?.dp_details.diagnosis}
            </p>
          </div>
          <div>
            <h1>{prescriptionDetails?.dp_keys.symptoms_heading}</h1>
            <p className="text-xs font-light text-slate-400 uppercase">
              {prescriptionDetails?.dp_details.symptoms}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NCTemplate1;
