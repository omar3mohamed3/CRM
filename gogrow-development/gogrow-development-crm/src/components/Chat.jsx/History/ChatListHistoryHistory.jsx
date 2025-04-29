import { useEffect, useState } from "react";
import ChatUser from "../ChatUser";
import ChatUserProfile from "../ChatUserProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeamsWithLastMessage,
  fetchUsersWithLastMessage,
  setChatType,
} from "../../../Store/ChatSlice/ChatSlice";
import useFetchUser from "../../../Store/Auth/useFetchUser";
import teamLogo from "/team.jpg";
import userLogo from "/download.png";
import { fetchHistoryUsers } from "../../../Store/ChatSlice/chatHistorySlice";
import ChatUserHistory from "./ChatUserHistory";

const ChatListHistoryHistory = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const [chats, setChats] = useState("users");

  const {
    teams,
    users,
    loading,
    error,
    chatType,
    messagesChat,
    historyUsers,
    selectedChat,
  } = useSelector((state) => state.chatHistory);

  useEffect(() => {
    if (selectedChat && chatType === "users") {
      dispatch(fetchHistoryUsers(selectedChat)); // Fetch users the logged-in user has talked with
    }
  }, [chatType, chats, dispatch, selectedChat]);

  // Filter historyUsers based on search term
  const filteredHistoryUsers = historyUsers?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    chats === "users" && (
      <div>
        {/* Header */}
        <ChatUserProfile onSearch={setSearchTerm} />

        {/* Chat List */}
        <div className="  max-h-[375px]  overflow-y-auto">
          {/* Render Users */}
          {chats === "users" &&
            filteredHistoryUsers?.map((user) => (
              <div
                key={user?.id}
                className={`${
                  user?.id === selectedUser ? "bg-[#d7d7d7] " : ""
                } hover:bg-[#b0b0b0]`}>
                <ChatUserHistory
                  setSelectedUser={setSelectedUser}
                  photo={user?.photo || userLogo}
                  otherUserData={user}
                  conversation_id={user?.last_message?.conversation_id}
                  id={user?.id}
                  userId={selectedChat}
                  historyHistory={true}
                  sendtoId={user?.id}
                  name={user?.name}
                  lastMessage={user?.last_message?.message}
                />
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default ChatListHistoryHistory;
