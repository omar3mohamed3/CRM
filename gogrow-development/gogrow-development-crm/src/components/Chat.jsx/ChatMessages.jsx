import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { URL } from "../../Url/url";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../Store/DashBoard/dashboardSlice";
import useFetchUser from "../../Store/Auth/useFetchUser";
import { getMessages, selectChat } from "../../Store/ChatSlice/ChatSlice";

// Initialize Laravel Echo with Pusher
window.Pusher = Pusher;
const echo = new Echo({
  broadcaster: "pusher",
  key: "ab845fabd42aa4131ae7",
  cluster: "mt1",
  forceTLS: true,
  authEndpoint: `https://growcrm.tech/broadcasting/auth`,
  // auth: {
  //   headers: {
  //     Authorization: `Bearer ${getToken()}`, // Ensure token is handled correctly
  //   },
  // },
});

const ChatMessages = () => {
  const dispatch = useDispatch();
  const { selectedChat, sender, senderTo, chatType } = useSelector(
    (state) => state.chat
  );

  const [messages, setMessages] = useState([]);
  // const [conversationId, setConversationId] = useState();
  const endOfMessagesRef = useRef(null);
  const { user } = useFetchUser();

  // Fetch chat messages on chat selection
  useEffect(() => {
    const fetchMessages = async () => {
      if (senderTo) {
        try {
          let response;
          if (chatType === "users") {
            response = await axios.get(
              `${URL}private-chat/${senderTo}/messages`,
              { headers: { Authorization: `Bearer ${getToken()}` } }
            );
          } else {
            response = await axios.get(`${URL}team-chat/${senderTo}/messages`, {
              headers: { Authorization: `Bearer ${getToken()}` },
            });
          }

          // Check if the response contains Messages ?
          if (response.data.conversation_id) {
            //No messages found
            dispatch(selectChat(response.data.conversation_id));
            // setConversationId(response.data.conversation_id);
            setMessages([]);
          } else {
            // Found messages

            setMessages(response.data.messages);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
          setMessages([]); // Clear messages on error
        }
      }
    };

    fetchMessages();
  }, [chatType, dispatch, senderTo]);

  // Listen to new messages via Laravel Echo
  useEffect(() => {
    let pusher = new Pusher("ab845fabd42aa4131ae7", {
      cluster: "mt1",
    });

    // Subscribe to the private channel
    let channel = pusher.subscribe(
      chatType === "users"
        ? `my-channel-conversation_id.${selectedChat}`
        : `my-channel-team.${selectedChat}`
    );

    // Bind to the 'message-sent' event
    channel.bind("App\\Events\\MessageSent", function (data) {
      // Add New Message To Chat
      setMessages((prevMessages) => [...prevMessages, data.data]);
      dispatch(getMessages(messages));
    });

    // Unsubscribe from the channel when the component unmounts
    return () => {
      pusher.unsubscribe(
        // `my-channel-sender.${user?.id + senderTo}.recipient.${
        //   user?.id + senderTo
        // }`
        chatType === "users"
          ? `my-channel-conversation_id.${selectedChat}`
          : `my-channel-team.${selectedChat}`
      );
    };
  }, [chatType, dispatch, messages, selectedChat]);

  // Automatically scroll to the bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async (values, { resetForm }) => {
    const trimmedMessage = values.message.trim();

    if (trimmedMessage && senderTo) {
      const newMessage = {
        message: trimmedMessage,
      };

      try {
        await axios.post(
          chatType === "users"
            ? `${URL}private-chat/${senderTo}/message`
            : `${URL}team-chat/${senderTo}/message`,
          newMessage,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        resetForm(); // Clear input field after sending message
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(90vh-200px)] rounded-b-lg bg-gray-100">
      {/* Message Display */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
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

      {/* Message Input Form */}
      <Formik
        initialValues={{ message: "" }}
        onSubmit={handleSendMessage}>
        {({ values }) => (
          <Form className="p-4 bg-white rounded-b-xl">
            <div className="flex items-center border rounded-lg">
              <Field
                type="text"
                name="message"
                className="flex-1 px-4 py-2  focus:outline-none"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                disabled={!values.message.trim()}
                className="p-2 text-white hover:bg-blue-100">
                <IoSend
                  size={20}
                  className="text-[#1492E6]"
                />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChatMessages;
