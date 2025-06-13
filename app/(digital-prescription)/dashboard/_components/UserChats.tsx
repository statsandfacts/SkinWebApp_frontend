"use client";

import BackButton from "@/components/common/BackButton";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { RootState } from "@/redux/store";
import { getChatByChatId, getChatByUserId } from "@/services/app.chat";
import { Input } from "@heroui/input";
import { Button } from "antd";
import { HeartHandshake, Loader2, MessageCircleCode, Send, User, UserCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import socket from "@/services/socket";
import clsx from "clsx";

const UserChats = () => {
  const { userId, userDetails } = useAuthInfo();
  const [allChats, setAllChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [unreadChats, setUnreadChats] = useState<Record<string, boolean>>({});

  const { singlePrescriptionDetails, singleCaseDetails } = useSelector(
    (state: RootState) => state.digitalPrescription
  );

  const { chatResponseData } = useSelector(
    (state: RootState) => state.UserChats
  );

  useEffect(() => {
    getAllChats();
  }, [userId]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (selectedChat?._id === message.chat_id) {
        setMessages((prev: any) => [...prev, message]);
      } else {
        setUnreadChats((prev) => ({
          ...prev,
          [message.chat_id]: true,
        }));
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [selectedChat]);

  const getAllChats = async () => {
    if (!userId) return;
    try {
      const response = await getChatByUserId(userId);
      setAllChats(response.chats);
    } catch (error) {
      toast.error("Error fetching chats. Please try again later.");
    }
  };

  const handleSelectChat = async (chat: any) => {
    setSelectedChat(chat);
    if (chat._id) {
      socket.emit("joinRoom", chat._id);
      setUnreadChats((prev) => {
        const updated = { ...prev };
        delete updated[chat._id];
        return updated;
      });
    }
    getAllMessagesFromChatID(chat._id);
  };

  const getAllMessagesFromChatID = async (chatId: string) => {
    try {
      // setLoading(true);
      const response = await getChatByChatId(chatId);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat by ID:", error);
      toast.error("Error fetching chat details. Please try again later.");
    } finally {
      // setLoading(false);
    }
  };

  const handleSend = () => {
    if (!message.trim() || !selectedChat) {
      toast.error("Message cannot be empty");
      return;
    }
    setMessage("");
    socket.emit("sendMessage", {
      chat_id: selectedChat._id,
      sender_id: userId,
      content: message,
      message_type: "text",
      user_type: userDetails.user_type,
    });
    getAllMessagesFromChatID(selectedChat._id);
  };

  return (
    <div className="px-20">
      <div className="w-full max-w-7xl my-4">
        <BackButton />
      </div>

      <div className="">
        {allChats.length > 0 ? (
          <div className="">
            <div className="flex h-full">
              {/* Left Pane */}
              <div className="w-1/3 border-r border-gray-200 bg-gray-100">
                <div className="text-xl font-bold py-4 pl-5 bg-primary-lite text-white">
                  Your Chats
                </div>
                <Input
                  type="text"
                  placeholder="Search chats..."
                  className="p-4 border-b border-gray-400 bg-primary-lite"
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const filteredChats = allChats.filter((chat) =>
                      chat.participants.join(", ").toLowerCase().includes(searchTerm)
                    );
                    // Optionally: setFilteredChats(filteredChats);
                  }}
                />
                <div className="overflow-y-auto max-h-[70vh] min-h-[70vh]">
                  {allChats.map((chat, index) => (
                    <div
                      key={index}
                      className={`p-4 cursor-pointer flex justify-between items-center transition-all ${
                        selectedChat?.case_id === chat.case_id
                          ? "bg-gray-400"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => handleSelectChat(chat)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-1/6">
                          <UserCircle className="inline-block text-gray-600" size={48}/>
                        </div>
                        <div className="w-5/4">
                          <div className="text-sm text-gray-600">{chat.case_id}</div>
                          <div className="text-md font-semibold text-gray-800 break-words whitespace-normal">
                            {chat.participants.join(", ")}
                          </div>
                        </div>
                      </div>
                      {unreadChats[chat._id] && (
                        <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          New
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Pane */}
              <div className="w-2/3 h-full">
                {selectedChat ? (
                  <>
                    {/* Header */}
                    <div className="p-4 border-b shrink-0">
                      <h2 className="text-lg font-bold text-gray-800">
                        Chat with: {selectedChat.participants.join(", ")}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Case ID: {selectedChat.case_id}
                      </p>
                    </div>

                    {/* Messages */}
                    {loading ? (
                      <div className="flex-1 flex items-center justify-center text-gray-500">
                        <Loader2 className="animate-spin" />
                      </div>
                    ) : (
                      <div className="flex-1 overflow-y-auto p-4 space-y-2 h-[70vh]">
                        {messages.map((msg: any, i: number) => (
                          <div
                            key={i}
                            className={clsx(
                              "flex w-full my-1",
                              msg.user_type === "patient"
                                ? "justify-end"
                                : "justify-start"
                            )}
                          >
                            <div
                              className={clsx(
                                "p-2 rounded-lg max-w-[70%]",
                                msg.user_type === "patient"
                                  ? "bg-blue-100 text-right"
                                  : "bg-green-100 text-left"
                              )}
                            >
                              {msg.content}
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(msg.updatedAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                  timeZone: "Asia/Kolkata",
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Input */}
                    <div className="p-4 border-t flex items-center gap-2 shrink-0">
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      />
                      <button
                        onClick={handleSend}
                        className="bg-primary-lite hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
                      >
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    Select a chat to view conversation
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 mt-10">No chats available.</div>
        )}
      </div>
    </div>
  );
};

export default UserChats;
