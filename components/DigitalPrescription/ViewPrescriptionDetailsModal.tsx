"use client";
import React, { useEffect, useState } from "react";
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
import { translateLanguage } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";

const dpKeysInitial = {
  doctor_name: "Doctor Name",
  doctor_redg_number: "Doctor Redg. No",
  provider_heading: "Hospital/Clinic Details",
  provider_name: "Name",
  provider_dtls: "Address",
  provider_contact: "Provider Contact No",
  pharmacist_name: "Pharmacist Name",
  pharmacist_certificate_no: "Pharmacist License",
  prescription_date: "Date",
  prescription_id: "Prescription Id",
  remarks: "Remarks",
  medicine_heading: "MEDICINE",
  medicine_sl_no: "Sl No",
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
  symptoms_heading: "SYMPTOMS",
  general_vitals_heading: "GENERAL VITALS",
  gv_blood_pressure: "Blood Pressure",
  gv_heart_rate: "Heart Rate",
  gv_resp_rate: "Respiratory Rate",
  gv_oxg_lvl: "Oxygen Level",
  gv_temp: "Temprature",
  gv_weight: "Weight",
};

export default function ViewPrescriptionDetailsModal() {
  const dispatch = useDispatch();
  const {
    isViewPrescriptionDetailsModal,
    singlePrescriptionDetails,
    singleCaseDetails,
  } = useSelector((state: any) => state.digitalPrescription);

  console.log("singleCaseDetails", singleCaseDetails);
  console.log("singlePrescriptionDetails", singlePrescriptionDetails);


  const [targetLang, setTargetLang] = useState<string>("en");
  const [lTLoading, setLTLoading] = useState<boolean>(false);
  const [DpKeys, setDpKeys] = useState<any>(dpKeysInitial);
  const [dpData, setDpData] = useState<any>({
    dr_name: "",
    prv_name: "",
    prv_dtls: "",
    ph_name: "",
    prsc_date: "",
    remarks: "",
    medicine_dtls: [],
    reports: [],
    diagnosis: "",
    symptoms: "",
    general_vitals: {}
  });

  useEffect(() => {
    if (singlePrescriptionDetails || singleCaseDetails) {
      setDpData({
        dr_name: singlePrescriptionDetails?.doctor_name || "",
        prv_name: singlePrescriptionDetails?.provider_name || "",
        prv_dtls: singlePrescriptionDetails?.provider_dtls || "",
        ph_name: singleCaseDetails?.pharmacist_name || "",
        prsc_date: singlePrescriptionDetails?.prescription_date || "",
        remarks: singlePrescriptionDetails?.remarks || "",
        medicine_dtls: singlePrescriptionDetails?.medicine_dtls || [],
        reports: singlePrescriptionDetails?.reports || [],
        diagnosis: singlePrescriptionDetails?.diagnosis || "",
        symptoms: singlePrescriptionDetails?.symptoms || "",
        general_vitals: singlePrescriptionDetails?.general_vital || null,
      });
    }
  }, [singlePrescriptionDetails, singleCaseDetails]);

  const onClose = () => {
    dispatch(setViewPrescriptionDetailsModal(false));
  };

  const handleTranslateLanguage = () => {
    if (targetLang === "or") {
      setDpKeys(dpKeysInitial);
      setDpData({
        dr_name: singlePrescriptionDetails?.doctor_name || "",
        prv_name: singlePrescriptionDetails?.provider_name || "",
        prv_dtls: singlePrescriptionDetails?.provider_dtls || "",
        ph_name: singleCaseDetails?.pharmacist_name || "",
        prsc_date: singlePrescriptionDetails?.prescription_date || "",
        remarks: singlePrescriptionDetails?.remarks || "",
        medicine_dtls: singlePrescriptionDetails?.medicine_dtls || [],
        reports: singlePrescriptionDetails?.reports || [],
        diagnosis: singlePrescriptionDetails?.diagnosis || "",
        symptoms: singlePrescriptionDetails?.symptoms || "",
      });
      setTargetLang("en");
      return;
    }
    setLTLoading(true);
    translateLanguage({
      target_lang: "or",
      dp_details: dpData,
      dp_keys: DpKeys,
    })
      .then((res: any) => {
        setTargetLang(targetLang === "or" ? "en" : "or");
        setDpKeys(res?.data?.dp_keys);
        setDpData(res?.data?.dp_details);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setLTLoading(false);
      });
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
                <Button
                  variant="flat"
                  className="mr-8"
                  onPress={handleTranslateLanguage}
                  isLoading={lTLoading}
                >
                  <Languages size={18} />{" "}
                  {targetLang === "or" ? "English" : "Odia"}
                </Button>
              </ModalHeader>
              <ModalBody>
                <NCTemplate1 DpKeys={DpKeys} dpData={dpData} />
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
