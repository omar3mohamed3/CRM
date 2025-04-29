import { useEffect, useState } from "react";
import ChatUser from "../ChatUser";
import ChatUserProfile from "../ChatUserProfile";
import { useDispatch, useSelector } from "react-redux";

import teamLogo from "/team.jpg";
import userLogo from "/download.png";
import {
  fetchTeamsWithLastMessage,
  fetchUsersWithLastMessage,
  setChatType,
} from "../../../Store/ChatSlice/chatHistorySlice";
import ChatUserHistory from "./ChatUserHistory";

const ChatListHistory = () => {
  const dispatch = useDispatch();
  const { teams, users, loading, error, chatType } = useSelector(
    (state) => state.chatHistory
  );
  const [activeTab, setActiveTab] = useState("users");
  const [selectedUser, setSelectedUser] = useState();
  const [selectedOthorUser, setSelectedOthorUser] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const switchToTeams = () => {
    dispatch(setChatType("teams"));
    setActiveTab("teams");
  };

  const switchToUsers = () => {
    dispatch(setChatType("users"));
    setActiveTab("users");
  };

  useEffect(() => {
    if (chatType === "teams") {
      dispatch(fetchTeamsWithLastMessage());
    } else {
      dispatch(fetchUsersWithLastMessage());
    }
  }, [dispatch, chatType]);

  // Filter users and teams based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Header */}
      <ChatUserProfile onSearch={setSearchTerm} />
      {/* Tabs */}
      <div>
        <button
          onClick={switchToUsers}
          className={` ${
            activeTab === "users" ? "bg-yellowlight" : "bg-yellow-200"
          } w-1/2 hover:bg-yellowlight font-medium`}>
          Users
        </button>
        <button
          onClick={switchToTeams}
          className={` ${
            activeTab === "teams" ? "bg-yellowlight" : "bg-yellow-200"
          } w-1/2 hover:bg-yellowlight font-medium`}>
          Teams
        </button>
      </div>
      {/* Chat List */}
      <div className="max-h-[375px] overflow-y-auto">
        {activeTab === "teams" &&
          filteredTeams.map((team) => (
            <div
              key={team.id}
              className={`${
                team?.id === selectedUser ? "bg-[#d7d7d7] " : ""
              } hover:bg-[#b0b0b0]`}>
              <ChatUserHistory
                photo={teamLogo}
                otherUserData={team}
                id={team.id}
                isTeam={true}
                setSelectedUser={setSelectedUser}
                conversation_id={team?.last_message?.conversation_id}
                name={team.name}
                lastMessage={team?.last_message?.message}
              />
            </div>
          ))}
        {activeTab === "users" &&
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`${
                user?.id === selectedUser ? "bg-[#d7d7d7] " : ""
              } hover:bg-[#b0b0b0]`}>
              <ChatUserHistory
                setSelectedUser={setSelectedUser}
                photo={user.photo || userLogo}
                otherUserData={user}
                conversation_id={user?.last_message?.conversation_id}
                id={user.id}
                isTeam={false}
                sendtoId={user.id}
                name={user.name}
                lastMessage={user?.last_message?.message}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatListHistory;
