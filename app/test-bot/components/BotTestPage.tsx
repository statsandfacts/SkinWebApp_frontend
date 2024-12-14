"use client";

import React, { useState } from "react";
import { ChatBubbleLeftIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";

const steps = [
  {
    id: "1",
    message: "Hi! I'm your assistant. What's your name?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "Nice to meet you, {previousValue}! How can I assist you today?",
    trigger: "4",
  },
  {
    id: "4",
    user: true,
    trigger: "5",
  },
  {
    id: "5",
    message: "Thanks for sharing! Have a great day!",
    end: true,
  },
];
const theme = {
  background: "#f5f8fb",
  fontFamily: "Arial, Helvetica, sans-serif",
  headerBgColor: "#007bff",
  headerFontColor: "#fff",
  headerFontSize: "16px",
  botBubbleColor: "#007bff",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const BotTestPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the dialog visibility

  // Function to toggle the chat dialog
  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative h-screen bg-gray-100">
      {/* Message Icon (Chat Bubble) */}
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

      {/* Chat Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-8">
          {/* Close Icon (XCircleIcon) */}
          {/* <button
            onClick={toggleDialog}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          ></button> */}

          {/* ChatBot */}
          <ThemeProvider theme={theme}>
            <ChatBot
              steps={steps}
              headerTitle="Chat Assistant"
              placeholder="Type your message..."
            />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
};

export default BotTestPage;
