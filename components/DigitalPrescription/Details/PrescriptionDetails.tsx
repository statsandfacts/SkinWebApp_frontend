"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import {
  EyeIcon,
  DocumentMagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import {
  setSinglePrescriptionDetails,
  setViewOriginalImageModal,
  setViewPrescriptionDetailsModal,
} from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { useDispatch } from "react-redux";
import ViewPrescriptionDetailsModal from "../ViewPrescriptionDetailsModal";
import { ToolTipBtn } from "../../common/ToolTipBtn";
import ViewOriginalPrescriptionImage from "../ViewOriginalPrescriptionImage";

interface PrescriptionDetail {
  label: string;
  data: any;
}

interface PrescriptionData {
  status: "pending" | "completed" | "in_progress" | "reject";
  name: string;
  original_image_url: string;
  prescriptionDetails: PrescriptionDetail[];
}

const data: PrescriptionData[] = [
  {
    status: "pending",
    name: "Mamata Jena",
    original_image_url: "https://dummyimage.com/300x200/000/fff",
    prescriptionDetails: [
      {
        label: "Sympotoms",
        data: "Chest tightness, Shortness of breath (SOB), Tingling sensitivity in lower limbs",
      },
      {
        label: "Vital Signs",
        data: "Pulse Rate (PR): 84/min, Respiratory Rate (RR): 14/min, Oxygen Saturation (SpO2): 98%",
      },
      {
        label: "Tests",
        data: [
          {
            testName: "Blood Tests:",
            testData: [
              "Complete Blood Count (CBC)",
              "Absolute Eosinophil Count (AEC)",
              "Fasting Blood Sugar (FBS)",
            ],
          },
        ],
      },
      {
        label: "Rx",
        data: [
          {
            medicine: "Levocetirizine 5mg",
            how_to_use: "Take with or without food. Swallow whole with water.",
            frequency: "Once daily, usually in the evening.",
            side_effects: "Drowsiness, fatigue, dry mouth, headache.",
            brands: "Xyzal, Levoday, Cetirizine HCL",
            safety_advice:
              "Avoid alcohol; may cause drowsiness. Not recommended for kidney disease without a doctor's advice.",
            if_missed_dose:
              "Take as soon as remembered. If it's close to the next dose, skip the missed dose. Do not double the dose.",
          },
          {
            medicine: "Montelukast",
            how_to_use: "Swallow whole with water, with or without food.",
            frequency: "Once daily, preferably in the evening.",
            side_effects: "Headache, dizziness, abdominal pain, fatigue, mood changes.",
            brands: "Singulair, Montair, Monticope.",
            safety_advice:
              "Not for acute asthma attacks. Use cautiously if there is a history of mental health issues.",
            if_missed_dose:"Take as soon as remembered. If it's almost time for the next dose, skip the missed dose. No double doses."
          },
          {
            medicine: "Multivitamin B complex",
            how_to_use: "Take after a meal with water.",
            frequency: "Once daily for 15 days.",
            side_effects: "Nausea, diarrhea, upset stomach, allergic reactions (rare).",
            brands: "Neurobion, Becosules, Supradyn.",
            safety_advice:
              "Do not overdose. Be cautious if you have kidney or liver issues. Avoid if allergic to any component in the multivitamin.",
            if_missed_dose:"Take when remembered. If it's close to the next dose, skip the missed dose. No double dosing."
          },
        ],
      },
    ],
  }
];

const PrescriptionDetails: React.FC = () => {
  const dispatch = useDispatch();

  const statusColorMap: { [key: string]: "success" | "danger" | "warning" } = {
    completed: "success",
    reject: "danger",
    in_progress: "warning",
  };

  return (
    <>
      <Table className="mt-3" aria-label="Prescriptions Detail Table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index + 1}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={statusColorMap[item.status]}
                  size="sm"
                  variant="flat"
                >
                  {item.status}
                </Chip>
              </TableCell>
              <TableCell className="flex gap-4">
                <ToolTipBtn
                  onClick={() => {
                    dispatch(setSinglePrescriptionDetails(item));
                    dispatch(setViewPrescriptionDetailsModal(true));
                  }}
                  title="View Prescription Details"
                  key={1}
                >
                  <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                </ToolTipBtn>
                <ToolTipBtn
                  onClick={() => {
                    dispatch(setSinglePrescriptionDetails(item));
                    dispatch(setViewOriginalImageModal(true));
                  }}
                  title="View Original Image"
                  key={2}
                >
                  <EyeIcon className="h-5 w-5" />
                </ToolTipBtn>
                <ToolTipBtn
                  onClick={() => {}}
                  title="Download Digital Prescription"
                  key={3}
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </ToolTipBtn>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ViewPrescriptionDetailsModal />
      <ViewOriginalPrescriptionImage />
    </>
  );
};

export default PrescriptionDetails;
