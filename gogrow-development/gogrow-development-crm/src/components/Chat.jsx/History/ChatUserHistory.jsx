import { useDispatch } from "react-redux";

import { TfiSearch } from "react-icons/tfi";
import {
  selectChat,
  selectOtherUser,
  selectOtherUserData,
  selectSender,
} from "../../../Store/ChatSlice/ChatSlice";
import {
  fetchPrivateChat,
  getTeamMessages,
  selectChatsOfUser,
} from "../../../Store/ChatSlice/chatHistorySlice";

const ChatUserHistory = ({
  name,
  lastMessage,
  id,
  userId,
  setSelectedUser,
  conversation_id,
  sendId,
  otherUserData,
  photo,
  isTeam,
  historyHistory = false,
}) => {
  const dispatch = useDispatch();

  const handleSelectChat = () => {
    //For Users
    // Get Chats between  the selected user and Users talk with
    if (!isTeam && !historyHistory) {
      dispatch(selectChatsOfUser(id));
    }
    setSelectedUser(id);

    // Get Chats between  the selected user and Users talk with
    //Id => The Other User Id

    if (userId && id) {
      dispatch(fetchPrivateChat({ userId, otherUserId: id }));
    }

    //For Teams
    if (isTeam) {
      // Fetch messages if the selected chat is a team
      dispatch(getTeamMessages(id)); // Pass the team id to getTeamMessages
    }
  };

  return (
    <>
      <button
        onClick={handleSelectChat}
        className="     w-full flex px-[15px] py-2 ">
        <img
          src={photo}
          className=" w-[50px] h-[50px] rounded-full   object-fill"
          alt=""
        />
        <div className=" text-[18px] ml-[20px]">
          <h2 className=" text-left font-bold ">{name}</h2>
          <span className=" truncate  w-full font-light ">
            {lastMessage && lastMessage?.length > 20
              ? lastMessage?.slice(0, 20) + "..."
              : lastMessage}
          </span>
        </div>
      </button>
    </>
  );
};

export default ChatUserHistory;
