"use client";

import React, { useState } from "react";
import {Tabs, Tab} from "@heroui/tabs";
import {Button} from "@heroui/button";
import PrescriptionDetails from "./PrescriptionDetails";
import AddFamilyMembers from "./Family/AddFamilyMembers";
import MedicationReminder from "./Reminder/MedicationReminder";
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
import { userLogout } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";

export default function PrescriptionDetailPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedTab } = useSelector((state: any) => state.familyMember);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = () => {
    setIsLoading(true);
    userLogout()
      .then((response) => {
        toast.success("Logout successfully.");
        router.push("/");
        dispatch(logOutUser());
        dispatch(resetPrescription());
        dispatch(resetFamilyMember());
      })
      .catch((error) => {
        toast.error("Logout Failed!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="hidden md:flex w-full gap-2 justify-end">
        <Button
          color="primary"
          variant="solid"
          className="rounded-lg"
          onPress={() => {
            router.push("/upload-prescription");
          }}
        >
          <ArrowUpTrayIcon className="h-5 w-5 mr-1" /> Upload
        </Button>
        <Button
          isLoading={isLoading}
          color="danger"
          className="rounded-lg"
          variant="light"
          onPress={handleLogout}
        >
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
          <Tab key="My Documents" title="My Documents">
            <PrescriptionDetails />
          </Tab>
          <Tab key="medication_reminder" title="Medication Reminder">
            {/* <MedicationReminder /> */}
          </Tab>
          <Tab key="family_members" title="Family Members">
            <AddFamilyMembers />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
