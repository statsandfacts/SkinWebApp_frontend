import React from "react";
import { motion } from "framer-motion";
import { Select, SelectItem } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePatientDetail,
  updatePatientFor,
} from "@/redux/slices/digitalPrescription/digitalPrescription.slice";
import { useUser } from "@/context/UserContext";
import ChoosePrescriptionLayoutCard from "./CardLaoyout";

interface ChooseFamilyProps {
  setStep: (step: number) => void;
  step: number;
}

const familyMembersData = ["User1", "User2", "User3", "User4"];

const ChooseFamily: React.FC<ChooseFamilyProps> = ({ setStep, step }) => {
  const { user: userId } = useUser();
  const dispatch = useDispatch();
  const { prescriptionFor, patientName } = useSelector(
    (state: any) => state.digitalPrescription
  );

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updatePatientFor({ prescriptionFor: e.target.value }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(updatePatientDetail({ patientName: value }));
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <ChoosePrescriptionLayoutCard
        header={<p className="font-semibold text-slate-800">Choose</p>}
        footer={
          <></>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full min-h-48 max-h-80 flex flex-col"
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg font-semibold mb-4"
          >
            Who is this prescription for?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex items-center mb-4"
          >
            <motion.input
              type="radio"
              id="forMe"
              name="prescriptionFor"
              value="forMe"
              checked={prescriptionFor === "forMe"}
              onChange={handleOptionChange}
              className="mr-2 h-4 w-4 cursor-pointer"
              whileTap={{ scale: 1.1, borderColor: "#075985" }}
            />
            <label htmlFor="forMe" className="text-md">
              For Me
            </label>
          </motion.div>
          {true && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex items-center mb-4"
            >
              <motion.input
                type="radio"
                id="forFamilyMember"
                name="prescriptionFor"
                value="forFamilyMember"
                checked={prescriptionFor === "forFamilyMember"}
                onChange={handleOptionChange}
                className="mr-2 h-4 w-4 cursor-pointer"
                whileTap={{ scale: 1.1, borderColor: "#075985" }}
              />
              <label htmlFor="forFamilyMember" className="text-md">
                For Family Member
              </label>
            </motion.div>
          )}

          {prescriptionFor === "forFamilyMember" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <Select
                items={familyMembersData}
                label="Select Family Member"
                className="max-w-xs"
                value={patientName}
                name="patientName"
                onChange={handleChange}
              >
                {familyMembersData.map((name) => (
                  <SelectItem key={name}>{name}</SelectItem>
                ))}
              </Select>
            </motion.div>
          )}
        </motion.div>
      </ChoosePrescriptionLayoutCard>
    </div>
  );
};

export default ChooseFamily;
