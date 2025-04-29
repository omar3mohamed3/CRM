import { useEffect, useState } from "react";
import ChatUser from "./ChatUser";
import ChatUserProfile from "./ChatUserProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeamsWithLastMessage,
  fetchUsersWithLastMessage,
  setChatType,
} from "../../Store/ChatSlice/ChatSlice";
import useFetchUser from "../../Store/Auth/useFetchUser";
import teamLogo from "/team.jpg";
import userLogo from "/download.png";

const ChatList = () => {
  const dispatch = useDispatch();

  const [chats, setChats] = useState("users");

  const { teams, users, loading, error, messagesChat, sender } = useSelector(
    (state) => state.chat
  );

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Set the chat type to "teams"
  const teamsChats = () => {
    dispatch(setChatType("teams"));
    setChats("teams");
  };

  //  Set the chat type to "users"
  const usersChats = () => {
    dispatch(setChatType("users"));
    setChats("users");
  };

  useEffect(() => {
    dispatch(fetchTeamsWithLastMessage());
    dispatch(fetchUsersWithLastMessage());
  }, [dispatch, messagesChat]);

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter teams and users based on the search term
  const filteredTeams = teams?.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if (loading) {
  //   return <div>Loading...</div>; // Display loading state
  // }

  if (error) {
    return <div>Error: {error}</div>; // Display error state
  }

  return (
    <div>
      {/* Header */}
      <ChatUserProfile onSearch={setSearchTerm} />
      {/* Tabs */}
      <div>
        <button
          onClick={usersChats}
          className={` ${
            chats === "users" ? " bg-yellowlight   " : " bg-yellow-200 "
          } w-1/2   hover:bg-yellowlight   font-medium`}>
          Users
        </button>
        <button
          onClick={teamsChats}
          className={` ${
            chats === "teams" ? "  bg-yellowlight   " : "  bg-yellow-200 "
          } w-1/2   hover:bg-yellowlight  font-medium `}>
          Teams
        </button>
      </div>
      {/* Chat List */}
      <div className="  max-h-[375px]  overflow-y-auto">
        {/* Render Teams */}
        {chats === "teams" &&
          filteredTeams?.map((team) => (
            <div
              key={team?.id}
              className={`${
                team?.id === sender ? "bg-[#d7d7d7] " : ""
              } hover:bg-[#b0b0b0] `}>
              <ChatUser
                photo={teamLogo}
                otherUserData={team}
                id={team?.id}
                conversation_id={team?.last_message?.conversation_id}
                name={team?.name}
                lastMessage={team?.last_message?.message}
              />
            </div>
          ))}

        {/* Render Users */}
        {chats === "users" &&
          filteredUsers?.map((user) => (
            <div
              key={user?.id}
              className={`${
                user?.id === sender ? "bg-[#d7d7d7] " : ""
              } hover:bg-[#b0b0b0] `}>
              <ChatUser
                photo={user?.photo || userLogo}
                otherUserData={user}
                conversation_id={user?.last_message?.conversation_id}
                id={user?.id}
                sendtoId={user?.id}
                name={user?.name}
                lastMessage={user?.last_message?.message}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatList;
