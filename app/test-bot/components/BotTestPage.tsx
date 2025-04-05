"use client";

import React, { useState, ReactNode } from "react";
import { ChatBubbleLeftIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Chatbot, { createChatBotMessage } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const config = {
  botName: "Assistant",
  initialMessages: [
    createChatBotMessage(
      "Hi! I’m here to assist you with your health concerns. To guide you better, I’ll need some basic information.",
      {}
    ),
    createChatBotMessage("Would you like to proceed? (yes/no)", {}),
  ],
};

const BotTestPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative h-screen bg-gray-100">
      <button
        onClick={toggleDialog}
        className="fixed bottom-8 right-8 bg-blue-500 p-3 rounded-full text-white shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        {isOpen ? (
          <XCircleIcon className="h-6 w-6" />
        ) : (
          <ChatBubbleLeftIcon className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
};

export default BotTestPage;
