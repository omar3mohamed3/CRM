import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-quill/dist/quill.snow.css";
import { IoStar } from "react-icons/io5";
import TicketsHeader from "./TicketsHeader";
import Editor from "./Editor";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import MessagesSkeleton from "./Skeleton/MessageSkillton";
import { IoIosMail } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import MarksSkeleton from "./Skeleton/MarksSkeleton";
import {
  addMessage,
  addTicket,
  fetchMessages,
  fetchTickets,
  statusTicket,
} from "../../../Store/ticketsSlice/ticketsSlice";
import { editNote } from "../../../Store/usersSlice/notesSlice";

const TicketMessage = () => {
  const dispatch = useDispatch();
  const { messages, loadingMessage, tickets, errorMessage } = useSelector(
    (state) => state.tickets
  );

  // TODO
  //Get Message base on last Ticket

  // useEffect(() => {
  //   if (loadingMessage === "idle") {
  //     dispatch(fetchMessages());
  //   }
  // }, [loadingMessage, dispatch]);

  // loadingMessage
  // if (loadingMessage === "loadingMessage") {
  //   return <div>loadingMessage...</div>;
  // }

  // Error
  // if (loadingMessage === "failed") {
  //   return <div>Error: {error}</div>;
  // }

  // Remove Email
  const handleClear = (setFieldValue, field) => {
    setFieldValue(field, "");
  };

  // Validate send ticket
  const validateSchema = Yup.object({
    title: Yup.string(),
    // .required("Required"),
    // email: Yup.string().email("Invalid email address").required("Required"),
    reply: Yup.string().required("Content is required"),
    other_attachment: Yup.mixed().test(
      "fileSize",
      "Each file must be smaller than 10MB",
      (value) => {
        if (!value || value.length === 0) {
          return true; // No file selected, so the test passes
        }
        // If multiple files, check each file
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 10 * 1024 * 1024) {
            return false; // Fail if any file exceeds the size limit
          }
        }
        return true; // All files are within the size limit
      }
    ),
  });

  const onSubmit = async (values) => {
    const formdata = new FormData();

    if (messages.length < 1) {
      formdata.append("title", values.title);
      formdata.append("message", values.reply);

      if (values.other_attachment) {
        formdata.append("attachments", values.other_attachment?.[0]);
      }
      await dispatch(fetchTickets());
      const addTicketResult = await dispatch(addTicket(formdata)).unwrap();
      const newTicketId = addTicketResult.conversation.id;

      await dispatch(fetchMessages(newTicketId));
    } else {
      formdata.append("message", values.reply);

      if (values.other_attachment) {
        formdata.append("attachments", values.other_attachment?.[0]);
      }
      const editTicketResult = await dispatch(
        addMessage({ ticketId: messages.id, message: formdata })
      ).unwrap();
    }
  };

  const endOfMessagesRef = useRef(null);

  // useEffect(() => {
  //   if (endOfMessagesRef.current) {
  //     endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

  const changeStatus = (status) => {
    dispatch(statusTicket({ ticketId: messages.id, status }));
  };

  return (
    <div className="  mx-auto bg-white  overflow-hidden">
      <div className="px-2">
        {/* Ticket Chat Header */}
        <div className=" border-b pb-2 mb-2">
          {loadingMessage ? (
            <div className="font-bold text-lg leading-7 text-gray-300 bg-gray-200 animate-pulse p-2 rounded">
              {/* Skeleton placeholder for text */}
              <div className="w-32 h-6 bg-gray-300 rounded"></div>
            </div>
          ) : (
            <TicketsHeader>
              {messages?.title ? messages?.title : <div>Add New Ticket !</div>}
            </TicketsHeader>
          )}
        </div>

        {loadingMessage ? (
          <MarksSkeleton />
        ) : (
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => changeStatus("unread")}
              className={`${
                messages.status === "unread" ? "bg-[#deedfc]" : "bg-[#feffff]"
              } px-3 gap-1 py-1 flex items-center border  text-blue-500  rounded-full text-xs`}>
              <IoIosMail />
              Mark as Unread
            </button>
            <button
              onClick={() => changeStatus("done")}
              className={`${
                messages.status === "done" ? "bg-green-100" : "bg-[#feffff]"
              } px-3 gap-1 py-1 flex border items-center  text-green-600  rounded-full text-xs`}>
              <MdOutlineDone />
              Mark To Done
            </button>
            <button
              onClick={() => changeStatus("follow-up")}
              className={`${
                messages.status === "follow-up"
                  ? "bg-[#E6F3FF]"
                  : " bg-[#feffff]"
              } px-3 gap-1 py-1 border text-[#5D5D5D] flex items-center   rounded-full text-xs`}>
              <IoStar className=" text-[#FEC007]" />
              Mark as Follow Up
            </button>
          </div>
        )}

        {/* <Messages /> */}
        {loadingMessage ? (
          <MessagesSkeleton />
        ) : (
          <div className=" h-[40vh]   overflow-y-auto">
            {messages?.messages?.length > 0 ? (
              messages?.messages?.map((message, index) => (
                <Messages
                  key={index}
                  message={message}
                />
              ))
            ) : (
              <div className=" text-primary  flex  justify-center items-center h-full">
                Add New Ticket !
              </div>
            )}
            {/* This empty div helps scroll to the bottom */}
            <div ref={endOfMessagesRef} />
          </div>
        )}

        <div className="border-t pt-4">
          <Formik
            validationSchema={validateSchema}
            initialValues={{
              reply: "",
              title: "",
              // email: "",
              other_attachment: "",
            }}
            onSubmit={onSubmit}>
            {({ setFieldValue, values, errors, touched }) => {
              return (
                <Form>
                  <div className="  grid grid-cols-2">
                    <div className="flex items-center  mb-2">
                      <p className="text-sm mr-2">Ticket Title :</p>
                      <div className="  relative">
                        <Field
                          id="title"
                          name={"title"}
                          required={messages.length < 1}
                          placeholder="gogo"
                          className="bg-gray-200   w-[180px] text-gray-500 px-2 py-1 focus:outline-none  rounded-full text-xs"
                        />
                        {values.title.length > 0 && (
                          <button
                            type="button"
                            onClick={() => handleClear(setFieldValue, "title")}
                            className=" z-20 top-0 right-2 absolute">
                            x
                          </button>
                        )}
                      </div>
                      <ErrorMessage
                        name="title"
                        id="title"
                        component={"div"}
                        className=" text-red-500 "
                      />
                    </div>
                  </div>
                  <div className=" relative    rounded-lg  ">
                    <Field name="reply">
                      {({ field }) => (
                        <Editor
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="reply"
                      id="reply"
                      component={"div"}
                      className=" text-red-500  mt-2"
                    />
                    <div
                      style={{ bottom: "25px", padding: "10px 20px" }}
                      className="flex  absolute w-full bottom-[5px] z-30 px-[20px] py-[10px] pb-2 justify-between items-center mt-2">
                      <div
                        type="button"
                        className="text-gray-500 flex gap-2  items-center">
                        <label
                          className="text-[#000929] cursor-pointer text-[14px] font-bold"
                          htmlFor="other_attachment">
                          <FaPaperclip size={16} />
                        </label>
                        <div className="col-span-1  hidden w-full">
                          <input
                            id="other_attachment"
                            name="other_attachment"
                            type="file"
                            style={{ display: "none" }}
                            multiple={true}
                            onChange={(event) => {
                              setFieldValue(
                                "other_attachment",
                                event.currentTarget.files
                              );
                            }}
                            className={`bg-white border
                             ${
                               errors.other_attachment &&
                               touched.other_attachment
                                 ? "border-red-500"
                                 : "border-gray-300"
                             }
                               text-gray-900 hidden text-opacity-50 border-[1px] mt-1 font-bold text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600   w-full px-[5px] py-[11px]`}
                          />
                          <ErrorMessage
                            name="other_attachment"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                        <div>
                          {/* {values?.other_attachment?.map((attach, index) => (
                          <div key={index}>{attach.name}</div>
                        ))} */}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm flex items-center">
                        Send
                        <FaPaperPlane
                          size={16}
                          className="ml-1"
                        />
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TicketMessage;
