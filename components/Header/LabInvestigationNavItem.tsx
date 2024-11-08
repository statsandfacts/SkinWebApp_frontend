import { setIsTestSearchModal } from "@/redux/slices/digitalPrescription/drug.slice";
import { NavbarItem } from "@nextui-org/navbar";
import React from "react";
import { useDispatch } from "react-redux";
import InvestigationSearchModal from "../modal/InvestigationSearchModal";

const LabInvestigationNavItem = () => {
  const dispatch = useDispatch();
  return (
    <>
      <NavbarItem>
        <button
          onClick={() => {
            dispatch(setIsTestSearchModal(true));
          }}
        >
          Lab Investigations
        </button>
      </NavbarItem>

      <InvestigationSearchModal />
    </>
  );
};

export default LabInvestigationNavItem;
