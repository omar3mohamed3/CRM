import React, { useState } from "react";
import TicketsHeader from "./TicketsHeader";
import icon from "/images.png";
import { IoIosMail } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  setSelectedTicket,
} from "../../../Store/ticketsSlice/ticketsSlice";
import dayjs from "dayjs";

const TicketCard = ({ ticket, active, setActive }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.tickets.messages);
  // TODO
  //1) Get Message base on ticket
  //2) Send ID To get ticket's messages

  const showTicket = () => {
    setActive(ticket.id);

    dispatch(setSelectedTicket(ticket));
    dispatch(fetchMessages(ticket.id));
    // dispatch(fetchMessage({ messageId: ticket.id }));
  };

  // const markAsUnreaded = (e) => {
  //   e.stopPropagation();
  // };
  // const markAsDone = (e) => {
  //   e.stopPropagation();
  // };
  // const markAsFollowUp = (e) => {
  //   e.stopPropagation();
  // };

  return (
    <div
      onClick={showTicket}
      className={` border  cursor-pointer rounded-card shadow-card p-3 ${
        messages.id === ticket.id
          ? "border-yellowprimary bg-[#FEFDF5]"
          : "  border-[#B8B8B8] "
      } `}>
      {/* Customer Line */}
      <div className=" w-full flex justify-between items-center">
        <div className=" flex  gap-4 items-center">
          <img
            src={icon}
            alt="customer"
            className="  w-5 rounded-full  "
          />
          <div className="  font-medium text-[14px] leading-[26px] text-primary">
            {ticket?.title?.length > 20
              ? ticket?.title?.slice(0, 20) + "..."
              : ticket?.title}
          </div>
        </div>
        {/* Ticket  Date */}
      </div>
      <span className=" ml-1   font-medium text-[10px] leading-[15px]">
        {dayjs(ticket?.updated_at).format("YYYY-MM-DD HH:mm:ss")}
      </span>
      {/* Description */}
      <p className=" mt-4 text-left mb-2 text-[12px] font-medium leading-[18px]">
        {ticket?.description?.length > 50
          ? ticket?.description?.slice(0, 50) + "..."
          : ticket?.description}
      </p>
      {/* Marks */}
      {/* <div className=" text-[10px] text-left mb-2">Mark as :</div> */}
      {/* <div className="   grid grid-cols-3 gap-x-1 gap-y-1  ">
        <button
          onClick={markAsUnreaded}
          className=" flex justify-center items-center gap-2 text-[8px] leading-[14px] font-medium rounded-full px-1 py-[1px] bg-[#E6F3FF]  text-customBlue">
          <IoIosMail />
          Unread
        </button>
        <button
          onClick={markAsDone}
          className=" flex  justify-center items-center gap-2 text-[8px] leading-[14px] font-medium rounded-full px-1 py-[1px] bg-[#E8FBF1]  text-[#00591C]">
          <MdOutlineDone />
          Done
        </button>
        <button
          onClick={markAsFollowUp}
          className=" flex justify-center items-center gap-2 text-[8px] leading-[14px] font-medium rounded-full px-1 py-[1px] bg-[#E6F3FF]  text-[#5D5D5D]">
          <IoStar className=" text-[#FEC007]" />
          Follow Up
        </button>
      </div> */}
    </div>
  );
};

export default TicketCard;
