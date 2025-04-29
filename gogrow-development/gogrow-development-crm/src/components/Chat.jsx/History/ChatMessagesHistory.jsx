import { useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import useFetchUser from "../../../Store/Auth/useFetchUser";

const ChatMessagesHistory = () => {
  const { messagesChat } = useSelector((state) => state.chatHistory);

  // const [conversationId, setConversationId] = useState();
  const endOfMessagesRef = useRef(null);
  const { user } = useFetchUser();

  // Automatically scroll to the bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView();
  }, [messagesChat]);

  return (
    <div className="flex flex-col h-[calc(90vh-200px)] rounded-b-lg bg-gray-100">
      {/* Message Display */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messagesChat?.length > 0 ? (
          messagesChat?.map((message) => (
            <div
              key={message.id}
              className={`flex  *: ${
                message.sender_id === user?.id ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`max-w-md  px-4 py-2 rounded-lg ${
                  message.sender_id === user?.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}>
                {/* Sender's Name */}
                {message.sender_id !== user?.id && (
                  <div className=" font-bold ">{message?.sender?.name}</div>
                )}

                {/* message */}
                {message.message}
              </div>
            </div>
          ))
        ) : (
          <p>No messages to display</p>
        )}
        {/* Scroll to bottom ref */}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatMessagesHistory;
