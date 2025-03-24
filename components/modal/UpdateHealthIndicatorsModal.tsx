import {
  fetchPatientDashboard,
  setUpdateHealthIndicatorModal,
} from "@/redux/slices/digitalPrescription/userDashboard.slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Radio,
  Button,
  RadioGroup,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUser } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import dayjs from "dayjs";

interface UpdateHealthIndicatorsModalProps {
  actionKey?: string;
  updateData: any;
  setUpdateData: any;
}

export default function UpdateHealthIndicatorsModal({
  actionKey,
  updateData,
  setUpdateData,
}: UpdateHealthIndicatorsModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuthInfo();
  const { isUpdateHealthIndicatorModal, dashboardData } = useSelector(
    (state: RootState) => state.userDashboard
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleChange = (field: string, value: any) => {
    setUpdateData((prevState: any) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const onClose = () => {
    dispatch(setUpdateHealthIndicatorModal(false));
    setUpdateData({
      chronicDiseases: "",
      bloodGroup: "",
      heightFeet: "",
      heightInches: "",
      weight: "",
      isSmoking: "",
      isDrinking: "",
      date: null,
      value: null,
      bpData: null,
      spo2_Data: null,
    });
  };

  const handleSubmit = () => {
    if (!updateData.date) {
      setError("Please select a date.");
      return;
    }
    setError("");
    let payload = {};
    if (actionKey === "edit") {
      payload = {
        user_id: userId,
        height: `${updateData.heightFeet} feet ${updateData.heightInches} inch`,
        weight: updateData.weight,
        blood_group: updateData.bloodGroup,
        chronic_diseases: updateData.chronicDiseases,
        health_data: {
          smoking: updateData.isSmoking,
          drinking: updateData.isDrinking,
          spo2: updateData?.spo2_Data,
          bp: updateData?.bpData,
        },
      };
    } else if (actionKey === "add_bp") {
      const inpData = {
        sys: updateData?.value,
        dia: updateData?.value2,
        date: dayjs(updateData?.date).format("DD/MM/YYYY"),
        value: "0",
      };

      payload = {
        user_id: userId,
        health_data: {
          smoking: updateData.isSmoking,
          drinking: updateData.isDrinking,
          bp: updateData?.bpData ? [...updateData.bpData, inpData] : [inpData],
          spo2: updateData?.spo2_Data,
        },
      };
    } else if (actionKey === "add_spo2") {
      const inpData = {
        value: updateData?.value,
        date: dayjs(updateData?.date).format("DD/MM/YYYY"),
      };
      payload = {
        user_id: userId,
        health_data: {
          smoking: updateData.isSmoking,
          drinking: updateData.isDrinking,
          spo2: updateData?.spo2_Data
            ? [...updateData?.spo2_Data, inpData]
            : [inpData],
          bp: updateData?.bpData,
        },
      };
    }

    setIsLoading(true);
    updateUser(payload)
      .then((response) => {
        toast.success("Health Indicators Updated");
        dispatch(fetchPatientDashboard(userId));
        onClose();
      })
      .catch((error) => {
        toast.error(error?.message || "Health Indicators Updated Failed!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal
      size="2xl"
      isOpen={isUpdateHealthIndicatorModal}
      onOpenChange={onClose}
    >
      <ModalContent className="mb-20">
        <ModalHeader className="flex flex-col gap-1">
          Update Health Indicators
        </ModalHeader>
        <ModalBody>
          {actionKey === "add_bp" || actionKey === "add_spo2" ? (
            <div className="space-y-2">
              <Input
                value={updateData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                label="Date"
                placeholder="Enter Date"
                type="date"
              />
              {error && <p className="text-red-500">{error}</p>}
              {
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    value={updateData.value}
                    onChange={(e) => handleChange("value", e.target.value)}
                    label={
                      actionKey === "add_bp"
                        ? "Systolic (mm Hg)"
                        : "SpO₂ Value (%)"
                    }
                    placeholder={
                      actionKey === "add_bp"
                        ? "Enter Systolic Value"
                        : "SpO₂ Value (%)"
                    }
                  />
                  {actionKey === "add_bp" && (
                    <Input
                      value={updateData.value2}
                      onChange={(e) => handleChange("value2", e.target.value)}
                      label={
                        actionKey === "add_bp" ? "Diastolic (mm Hg)" : "Value"
                      }
                      placeholder={
                        actionKey === "add_bp"
                          ? "Enter Diastolic Value"
                          : "Enter Value"
                      }
                    />
                  )}
                </div>
              }
            </div>
          ) : (
            <div className="space-y-2">
              <Input
                value={updateData.chronicDiseases}
                onChange={(e) =>
                  handleChange("chronicDiseases", e.target.value)
                }
                label="Chronic Diseases"
                placeholder="Enter any chronic diseases"
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex gap-2">
                  <Input
                    value={updateData.heightFeet}
                    onChange={(e) => handleChange("heightFeet", e.target.value)}
                    label="Height (Feet)"
                    type="number"
                    placeholder="Feet"
                    className="w-1/2"
                  />
                  <Input
                    value={updateData.heightInches}
                    onChange={(e) =>
                      handleChange("heightInches", e.target.value)
                    }
                    label="Height (Inches)"
                    type="number"
                    placeholder="Inches"
                    className="w-1/2"
                  />
                </div>
                <Input
                  value={updateData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  label="Weight (kg)"
                  type="number"
                  placeholder="Enter weight in kg"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={updateData.bloodGroup}
                  onChange={(e) => handleChange("bloodGroup", e.target.value)}
                  label="Blood Group"
                  placeholder="Enter your blood group"
                  className="w-full sm:w-2/5"
                />
                <RadioGroup
                  label="Do you smoke?"
                  orientation="horizontal"
                  value={updateData.isSmoking}
                  onChange={(e) => handleChange("isSmoking", e.target.value)}
                >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </RadioGroup>
                <RadioGroup
                  label="Do you drink alcohol?"
                  orientation="horizontal"
                  value={updateData.isDrinking}
                  onChange={(e) => handleChange("isDrinking", e.target.value)}
                >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </RadioGroup>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} color="danger" className="rounded-lg">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
            color="primary"
            className="rounded-lg"
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
