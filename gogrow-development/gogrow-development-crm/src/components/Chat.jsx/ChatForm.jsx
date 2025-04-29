import React from "react";
import { Formik, Form, Field } from "formik";
import { IoSend } from "react-icons/io5";

const ChatForm = () => {
  // const handleSendMessage = (values, { resetForm }) => {
  //   if (values.message.trim() !== "") {
  //     const newMessage = {
  //       id: messages.length + 1,
  //       text: values.message,
  //       sender: "user",
  //     };
  //     setMessages([...messages, newMessage]);
  //     resetForm();
  //     // Simulate bot response
  //     setTimeout(() => {
  //       const botResponse = {
  //         id: messages.length + 2,
  //         text: "Thank you for your message. How else can I assist you?",
  //         sender: "bot",
  //       };
  //       setMessages((prevMessages) => [...prevMessages, botResponse]);
  //     }, 1000);
  //   }
  // };
  // return (
  //   <Formik
  //     initialValues={{ message: "" }}
  //     onSubmit={handleSendMessage}>
  //     {({ values }) => (
  //       <Form className="p-4 rounded-b-xl bg-white">
  //         <div className="flex items-center border rounded-lg overflow-hidden">
  //           <Field
  //             type="text"
  //             name="message"
  //             className="flex-1 px-4 py-2 focus:outline-none"
  //             placeholder="Type your message..."
  //           />
  //           <button
  //             type="submit"
  //             disabled={values.message.length < 1}
  //             className="  text-white mr-[2px] rounded-r-lg p-2 hover:bg-blue-100 transition-colors">
  //             <IoSend
  //               size={20}
  //               className=" text-[#1492E6]"
  //             />
  //           </button>
  //         </div>
  //       </Form>
  //     )}
  //   </Formik>
  // );
};

export default ChatForm;
