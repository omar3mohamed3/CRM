import { useDispatch } from "react-redux";

import { TfiSearch } from "react-icons/tfi";
import {
  selectChat,
  selectOtherUser,
  selectOtherUserData,
  selectSender,
} from "../../Store/ChatSlice/ChatSlice";

const ChatUser = ({
  name,
  lastMessage,
  id,
  conversation_id,
  sendId,
  otherUserData,
  photo,
}) => {
  const dispatch = useDispatch();

  const handleSelectChat = () => {
    dispatch(selectOtherUserData(otherUserData));
    dispatch(selectSender(id));
    dispatch(selectChat(conversation_id));
    dispatch(selectOtherUser(id));
  };

  return (
    <>
      <button
        onClick={handleSelectChat}
        className={`      w-full flex px-[15px] py-2 `}>
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

export default ChatUser;
