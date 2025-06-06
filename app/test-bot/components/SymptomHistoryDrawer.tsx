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
import dayjs from "dayjs";

const SymptomHistoryDrawer = () => {
  const { symptHistoryVisible } = useSelector(
    (state: RootState) => state.symptomBot
  );
  const dispatch = useDispatch();
  // const [dpuserid, setDpuserid] = useState<string | null>("");
  const [historydata, setHistoryData] = useState<any>();

  const symptomHistoryData = async () => {
    const storedUserId = localStorage.getItem("dpUserId");
    console.log("UserID : ", storedUserId);
    if (!storedUserId) {
      toast.error("User not found! Please login.");
      dispatch(setSymptHistoryVisible(false));
      return;
    }
    try {
      const response = await getSymptomHistory(storedUserId.replace(/"/g, ''));
      console.log(response);
      setHistoryData(response);
    } catch {
      toast.error("Something went wrong !");
    }
  };

  useEffect(() => {
    symptomHistoryData();
  }, []);

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
              {historydata && historydata.length > 0 ? (
                historydata.map((item: any, index: number) => (
                  <div key={index} className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                    <h3 className="text-md font-semibold text-gray-800">
                      Date : {dayjs(item.date).format("MMMM D, YYYY")}
                    </h3>
                    <ul className="text-sm text-gray-600 mt-1">
                      {item?.symptoms && item.symptoms.length > 0 && item.symptoms.map((symptom: string, idx: number) => (
                        <li key={idx} className="list-disc list-inside">
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>)
              )): null
              }
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
