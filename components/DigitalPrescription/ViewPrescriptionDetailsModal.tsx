"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useDispatch, useSelector } from "react-redux";
import { setViewPrescriptionDetailsModal } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";

import AddReminderModalFromPrescription from "./AddReminderModelFromPrescription";
import NCTemplate1 from "./DPTemplates/NCTemplate1";
import { Button } from "@heroui/button";
import { Languages } from "lucide-react";
export default function ViewPrescriptionDetailsModal() {
  const dispatch = useDispatch();
  

  const { isViewPrescriptionDetailsModal, singlePrescriptionDetails, singleCaseDetails } = useSelector(
    (state: any) => state.digitalPrescription
  );

  const onClose = () => {
    dispatch(setViewPrescriptionDetailsModal(false));
  };

    const [dpData, setDpData] = useState<any>({
      target_lang: "or",
      dp_keys: {
        doctor_name: "Doctor Name",
        doctor_redg_number: "Doctor Redg. No.",
        provider_heading: "Hospital/Clinic Details",
        provider_name: "Name",
        provider_dtls: "Address",
        pharmacist_name: "Pharmacist Name",
        pharmacist_certificate_no: "Pharmacist License",
        prescription_date: "Date",
        prescription_id: "Prescription Id",
        remarks: "Remarks",
        medicine_heading: "MEDICINE",
        medicine_sl_no: "Serial Number",
        medicine_name: "Medicine Name",
        medicine_composition: "Compisition",
        medicine_method: "How to use",
        medicine_days: "Days",
        medicine_dosage: "Dosage",
        medicine_comments: "Comments",
        investagition_heading: "INVESTIGATION",
        investigation_name: "Name",
        investigation_description: "Description",
        investigation_comments: "Comments",
        diagnosis_heading: "DIAGNOSIS",
        symptoms_heading: "SYMPTOMS"
      },
      dp_details: {
        dr_name: singlePrescriptionDetails?.doctor_name,
        dr_redg_no: singlePrescriptionDetails?.doctor_redg_number,
        prv_name: singlePrescriptionDetails?.provider_name,
        prv_dtls: singlePrescriptionDetails?.provider_dtls,
        ph_name: singleCaseDetails?.pharmacist_name,
        ph_lis_no: singleCaseDetails?.pharmacist_certificate_no,
        prsc_date: singlePrescriptionDetails?.prescription_date,
        prsc_id: singlePrescriptionDetails?.prescription_id,
        remarks: singlePrescriptionDetails?.remarks,
        medicine_dtls: singlePrescriptionDetails?.medicine_dtls,
        reports: singlePrescriptionDetails?.reports,
        diagnosis: singlePrescriptionDetails?.diagnosis,
        symptoms: singlePrescriptionDetails?.symptoms
      }
  
    });

  const handleTranslatelanguage = () => {

  }

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
                <Button variant="flat" className="mr-8" onPress={handleTranslatelanguage}>
                <Languages size={18} />  Translate
                </Button>
              </ModalHeader>
              <ModalBody>
                <NCTemplate1 prescriptionDetails={dpData}/>
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
