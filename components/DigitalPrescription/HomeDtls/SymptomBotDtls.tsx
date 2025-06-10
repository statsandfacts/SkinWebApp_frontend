"use client";
import { setLoginModal } from "@/redux/slices/digitalPrescription/auth.slice";
import { RootState } from "@/redux/store";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginDrawer from "../Auth/LoginDrawer";
import { setSymptHistoryVisible } from "@/redux/slices/symptomBot.slice";
import SymptomHistoryDrawer from "@/app/test-bot/components/SymptomHistoryDrawer";

const SymptomBotDtls = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId  } = useSelector(
    (state: RootState) => state.auth
  );
  const [dpuserid, setDpuserid] = useState<string | null>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("dpUserId");
    setDpuserid(storedUserId ? JSON.parse(storedUserId) : "");
  }, []);


  const { isModalOpen } = useSelector((state: any) => state.loginModal);
  

  const trySymptomBotHandleClick = () => {
    console.log("User ID : ", dpuserid);
    if(dpuserid){
      router.push("/test-bot")
    }else{
      dispatch(setLoginModal(true));
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700">
        🤖 Interactive Symptoms Bot
      </h1>
      <p className="text-xl text-gray-600 font-medium">
        Smarter Conversations. Better Health.
      </p>

      <p className="text-md text-gray-700 max-w-2xl mx-auto">
        Meet your soon-to-launch digital health assistant — <br />
        an intelligent, conversational bot designed to understand your symptoms
        and guide you toward better decisions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-left">
        <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-xl shadow-sm ">
          <span className="text-2xl">💬</span>
          <p className="font-semibold text-blue-900">
            Conversational Interface
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">🧠</span>
          <p className="font-semibold text-green-900">Smart Symptom Checker</p>
        </div>
        <div className="flex items-center space-x-3 bg-yellow-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">📚</span>
          <p className="font-semibold text-yellow-700">
            Guided, User-Friendly Flow
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-xl shadow-sm">
          <span className="text-2xl">⚙</span>
          <p className="font-semibold text-purple-900">
            AI-Powered, Personalized Responses
          </p>
        </div>
      </div>

      <div className="pt-8">
        <div className="flex justify-center items-center">
          <p className="text-lg font-semibold text-red-600 animate-pulse">
            🛠 In Progress – Launching Soon!
          </p>
          <Button onClick={trySymptomBotHandleClick} className="my-2 bg-primary-lite font-bold ml-4 animate-pulse text-white">
            Try Now
          </Button>
        </div>
        <div className="mb-10">
          <Button onPress={() => dispatch(setSymptHistoryVisible(true))} className="">Check Your Symptom History</Button>
        </div>
        <p className="text-gray-600">
          We’re building something powerful — a smart, empathetic health
          companion that’s always ready to talk.
          <br />
          <span className="font-medium text-gray-800">
            Stay tuned — the future of self-assessment is just around the
            corner!
          </span>
        </p>
      </div>
      <LoginDrawer />
      <SymptomHistoryDrawer />
    </div>
  );
};

export default SymptomBotDtls;
