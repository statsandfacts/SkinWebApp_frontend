"use client"

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSymptomHistoryVisible } from "@/redux/slices/symptomBot.slice";
import { getSymptomFaqs, getSymptomHistory } from "@/services/api.symptombot.service";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);


const SymptomHistoryDrawer = ({drawerFor} : {drawerFor: string}) => {

  console.log("Drawer of : ", drawerFor);
  const { symptomHistoryVisible, symptomId } = useSelector(
    (state: RootState) => state.symptomBot
  );
  const dispatch = useDispatch();
  // const [dpuserid, setDpuserid] = useState<string | null>("");
  const [historydata, setHistoryData] = useState<any>();
  const [faqData, setFaqData] = useState<any[]>();
  

  const symptomHistoryData = async () => {
    const storedUserId = localStorage.getItem("dpUserId");
    console.log("UserID : ", storedUserId);
    if (!storedUserId) {
      toast.error("User not found! Please login.");
      dispatch(setSymptomHistoryVisible(false));
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
  const getFaqData = async() => {
      try{
          // setLoading(true);
          const response = await getSymptomFaqs(symptomId);
          console.log(response);
          setFaqData(response.data.faqs);
      }catch(err){
          // toast.error("Something went wrong! Please try again");
      }finally{
          // setLoading(false);
      }
  }

  useEffect(() => {
    if(drawerFor === "history"){
      symptomHistoryData();
    }else if(drawerFor === "faqs"){
     getFaqData();
    }
  }, [symptomHistoryVisible, drawerFor]);

  return (
    <Drawer
      backdrop="blur"
      isOpen={symptomHistoryVisible}
      onOpenChange={() => dispatch(setSymptomHistoryVisible(false))}
    >
      <DrawerContent>
          <>
            <DrawerHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Symptom History</h2>
            </DrawerHeader>
            {drawerFor === "history" ? <DrawerBody>
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
                      {item?.symptoms && item.symptoms.length > 0 && item.symptoms.map((symptom: any, idx: number) => (
                        <li key={idx} className="list-disc list-inside">
                          {dayjs(symptom?.time, "HH:mm:ss").format("h:mm A")} - {symptom?.symptom}
                        </li>
                      ))}
                    </ul>
                  </div>)
              )): null
              }
            </DrawerBody> : 

            <DrawerBody>
              {faqData && <Accordion
                variant="shadow"
                defaultExpandedKeys={["0"]}
                className="animate-slide-up shadow-none"
              >
                {faqData.map((faq: any, index: number) => (
                  <AccordionItem key={index} aria-label={faq?.question} title={faq?.question}>
                    <p className="text-slate-500 "> {faq?.answer} </p>
                  </AccordionItem>
                ))}
              </Accordion>}
            </DrawerBody>

            }
            <DrawerFooter>
              <Button
                color="primary"
                onPress={() => dispatch(setSymptomHistoryVisible(false))}
              >
                Close
              </Button>
            </DrawerFooter>
          </>
      </DrawerContent>
    </Drawer>
  );
};

export default SymptomHistoryDrawer;
