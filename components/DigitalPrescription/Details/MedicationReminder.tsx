import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { ToolTipBtn } from "@/components/common/ToolTipBtn";
import { CalendarDaysIcon, PlusIcon } from "@heroicons/react/24/outline";
import ComingSoon from "@/components/ComingSoon";

interface Medication {
  id: number;
  name: string;
  frequency: string;
  howToUse: string;
  sideEffect: string;
  prescriptionId: string;
}

const medications: Medication[] = [
  {
    id: 1,
    name: "Aspirin",
    frequency: "Once daily",
    howToUse: "Take with food",
    sideEffect: "Upset stomach",
    prescriptionId: "RX123456",
  },
  {
    id: 2,
    name: "Ibuprofen",
    frequency: "Every 6 hours",
    howToUse: "Take with water",
    sideEffect: "Nausea",
    prescriptionId: "RX654321",
  },
];

const MedicationReminder: React.FC = () => {
  const handleSetReminder = (medicationId: number) => {
    // Logic to set a reminder
    console.log(`Reminder set for medication with ID: ${medicationId}`);
  };

  return (
    <Card>
      <ComingSoon />
      {/* <CardHeader>
        <div className="flex justify-end w-full">
          <Button
            color="primary"
            onPress={() => {
            }}
          >
            Add Medicine
            <PlusIcon className="h-5 w-5" />{" "}
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Table removeWrapper aria-label="Medication Reminder Table">
          <TableHeader>
            <TableColumn>Prescription Id</TableColumn>
            <TableColumn>Medicine Name</TableColumn>
            <TableColumn>Frequency</TableColumn>
            <TableColumn>How to Use</TableColumn>
            <TableColumn>Side Effect</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {medications.map((medication) => (
              <TableRow key={medication.id}>
                <TableCell>{medication.prescriptionId}</TableCell>
                <TableCell>{medication.name}</TableCell>
                <TableCell>{medication.frequency}</TableCell>
                <TableCell>{medication.howToUse}</TableCell>
                <TableCell>{medication.sideEffect}</TableCell>
                <TableCell>
                  <ToolTipBtn
                    onClick={() => handleSetReminder(medication.id)}
                    title="Set Reminder"
                  >
                    <CalendarDaysIcon className="h-5 w-5" />
                  </ToolTipBtn>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody> */}
    </Card>
  );
};

export default MedicationReminder;
