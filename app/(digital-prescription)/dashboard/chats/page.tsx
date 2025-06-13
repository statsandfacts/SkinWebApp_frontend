import { Metadata } from "next";
import UserChats from "../_components/UserChats";

export const metadata: Metadata = {
  title: "Your chats",
};

const ChattingPage = () => {
  return (
    <div>
      <UserChats />
    </div>
  );
};

export default ChattingPage;