import { setIsTestSearchModal } from "@/redux/slices/digitalPrescription/drug.slice";
import { NavbarItem } from "@nextui-org/navbar";
import React from "react";
import { useDispatch } from "react-redux";
import InvestigationSearchModal from "../modal/InvestigationSearchModal";

interface LabInvestigationNavItemProps {
  setIsMenuOpen?: any;
  isMenuOpen?: any;
}

const LabInvestigationNavItem = ({
  setIsMenuOpen,
  isMenuOpen,
}: LabInvestigationNavItemProps) => {
  const dispatch = useDispatch();
  return (
    <>
      <NavbarItem
        onClick={() => {
          if (isMenuOpen) {
            setIsMenuOpen(!isMenuOpen);
          }
        }}
      >
        <button
          className="text-lg"
          onClick={() => {
            dispatch(setIsTestSearchModal(true));
          }}
        >
          Lab&Meds
        </button>
      </NavbarItem>

      <InvestigationSearchModal />
    </>
  );
};

export default LabInvestigationNavItem;
