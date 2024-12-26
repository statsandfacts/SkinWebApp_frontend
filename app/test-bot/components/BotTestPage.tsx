"use client";

import React, { useState, ReactNode } from "react";
import { ChatBubbleLeftIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Chatbot, { createChatBotMessage } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

const config = {
  botName: "Assistant",
  initialMessages: [
    createChatBotMessage("Hi! I'm your assistant. What's your name?", {}),
  ],
};

interface ActionProviderProps {
  createChatBotMessage: typeof createChatBotMessage;
  setState: React.Dispatch<React.SetStateAction<any>>;
  children: ReactNode;
}

const ActionProvider: React.FC<ActionProviderProps> = ({
  createChatBotMessage,
  setState,
  children,
}) => {
  const handleUserMessage = (message: string) => {
    let botResponse = "Sorry, I didn't understand that.";

    // Check the user's message and respond accordingly
    if (message.toLowerCase() === "hi") {
      botResponse = "Hello!";
    }

    const botMessage = createChatBotMessage(botResponse, {});
    setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, botMessage],
    }));
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as any, {
          actions: {
            handleUserMessage,
          },
        });
      })}
    </>
  );
};

interface MessageParserProps {
  children: ReactNode;
  actions: {
    handleUserMessage: (message: string) => void;
  };
}

const MessageParser: React.FC<MessageParserProps> = ({ children, actions }) => {
  const parse = (message: string) => {
    if (message) {
      actions.handleUserMessage(message);
    }
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as any, {
          parse: parse,
          actions,
        });
      })}
    </>
  );
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
        <div className="fixed bottom-24 right-8 w-[300px]">
          <Chatbot
            config={config}
            messageParser={(props: any) => (
              <MessageParser
                {...props}
                actions={{
                  handleUserMessage: (message: string) => {
                    // Handle user message
                    console.log(message);
                  },
                }}
              />
            )}
            actionProvider={(props: any) => (
              <ActionProvider
                {...props}
                createChatBotMessage={createChatBotMessage}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default BotTestPage;
