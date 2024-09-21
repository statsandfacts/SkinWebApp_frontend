"use client";

import React from "react";
import { Tabs, Tab, Button } from "@nextui-org/react";
import PrescriptionDetails from "./PrescriptionDetails";
import AddFamilyMembers from "./AddFamilyMembers";
import MedicationReminder from "./MedicationReminder";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFamilyMember,
  setPrescriptionDetailTab,
} from "@/redux/slices/digitalPrescription/familyMembers.slice";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { logOutUser } from "@/redux/slices/digitalPrescription/auth.slice";
import { resetPrescription } from "@/redux/slices/digitalPrescription/digitalPrescription.slice";

export default function PrescriptionDetailPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedTab } = useSelector((state: any) => state.familyMember);

  const handleLogout = () => {
    dispatch(logOutUser());
    dispatch(resetPrescription());
    dispatch(resetFamilyMember());
    router.push("/");
  };

  return (
    <>
      <div className="hidden md:flex w-full gap-2 justify-end">
        <Button
          color="primary"
          variant="solid"
          onPress={() => {
            router.push("/upload-prescription");
          }}
        >
          <ArrowUpTrayIcon className="h-5 w-5 mr-1" /> Upload
        </Button>
        <Button color="danger" variant="light" onPress={handleLogout}>
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5 mr-2" /> Logout
        </Button>
      </div>
      <div className="flex flex-col w-full">
        <Tabs
          aria-label="Options"
          variant="underlined"
          selectedKey={selectedTab}
          onSelectionChange={(keyName) => {
            dispatch(setPrescriptionDetailTab(keyName));
          }}
        >
          <Tab key="Prescriptions" title="Prescriptions">
            <PrescriptionDetails />
          </Tab>
          <Tab key="family_members" title="Family Members">
            <AddFamilyMembers />
          </Tab>
          <Tab key="medication_reminder" title="Medication Reminder">
            <MedicationReminder />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
