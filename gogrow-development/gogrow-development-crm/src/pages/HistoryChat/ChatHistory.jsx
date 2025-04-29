import Hashtag from "../../components/Hashtag";

import { useState } from "react";
import ChatHeader from "../../components/Chat.jsx/ChatHeader";
import ChatMessages from "../../components/Chat.jsx/ChatMessages";
import ChatListHistory from "../../components/Chat.jsx/History/ChatListHistory";
import ChatMessagesHistory from "../../components/Chat.jsx/History/ChatMessagesHistory";
import ChatListHistoryHistory from "../../components/Chat.jsx/History/ChatListHistoryHistory";
import { useSelector } from "react-redux";

const ChatHistory = () => {
  const [openSide, setOpenSide] = useState(true);
  const [role, setRole] = useState("admin"); // User - TeamLeader - Admin
  const [history, setHistory] = useState("user"); // User - Team

  const { teams, users, loading, error, chatType } = useSelector(
    (state) => state.chatHistory
  );
  // Logic Here
  // User can see users and his team chats
  // Leader can see users and his team chats
  // Admin cas see all chats
  return (
    <div className=" flex flex-col h-full">
      <Hashtag># Chat</Hashtag>
      <div className="grid  flex-grow pb-1 text-primary grid-cols-12 gap-4">
        {/* Chats Section */}
        {openSide && (
          <div className="  py-7 col-span-3 shadow-card rounded-card bg-white ">
            <ChatListHistory />
          </div>
        )}
        {openSide && chatType === "users" && (
          <div className="  py-7 col-span-3 shadow-card rounded-card bg-white ">
            <ChatListHistoryHistory />
          </div>
        )}
        <div
          className={` ${
            openSide && chatType === "users"
              ? "col-span-6"
              : chatType === "teams"
              ? "col-span-9"
              : "col-span-12"
          } shadow-card rounded-card  bg-white `}>
          <div className=" py-[20px]   w-full border-b px-[25px] flex justify-between items-center">
            <ChatHeader
              setOpenSide={setOpenSide}
              history={true}
            />
          </div>
          <ChatMessagesHistory />
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
