import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSymptHistoryVisible } from "@/redux/slices/symptomBot.slice";
import { getSymptomHistory } from "@/services/api.symptombot.service";
import { toast } from "react-toastify";

const SymptomHistoryDrawer = () => {
  const { symptHistoryVisible } = useSelector(
    (state: RootState) => state.symptomBot
  );
  const dispatch = useDispatch();
  // const [dpuserid, setDpuserid] = useState<string | null>("");
  const [data, setData] = useState<any>();

  const symptomHistoryData = async () => {
    const storedUserId = localStorage.getItem("dpUserId");
    console.log("UserID : ", storedUserId);
    try {
      const response = await getSymptomHistory("00010ef8-5d5a-4372-a48d-27ac1a05bc71");
      console.log(response);
    } catch {
      toast.error("Something went wrong !");
    }
  };
    symptomHistoryData();

//   useEffect(() => {
//     symptomHistoryData();
//   }, []);

  return (
    <Drawer
      backdrop="blur"
      isOpen={symptHistoryVisible}
      onOpenChange={() => dispatch(setSymptHistoryVisible(false))}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Symptom History</h2>
              {/* <Button isIconOnly variant="light" onPress={onClose}>
                ✕
              </Button> */}
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-gray-600">
                This is where your symptom history will go.
              </p>
              {/* You can map over actual history data here */}
            </DrawerBody>
            <DrawerFooter>
              <Button
                color="primary"
                onPress={() => dispatch(setSymptHistoryVisible(false))}
              >
                Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default SymptomHistoryDrawer;
