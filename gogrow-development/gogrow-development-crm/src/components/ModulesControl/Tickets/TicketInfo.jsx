import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import TicketsHeader from "./TicketsHeader";
import { Link } from "react-router-dom";
import FilesShared from "./FilesShared";
import CustomerTicketInfo from "./CustomerTicketInfo";
import icon from "/public/Rectangle 142.png";

const TicketInfo = () => {
  const [open, setOpen] = useState(true);
  const closeTicketInfo = () => {
    setOpen((open) => !open);
  };
  return (
    <div>
      <button className=" w-full mb-[15px] px-3 py-2 shadow-card bg-white rounded-card flex justify-between items-center">
        <TicketsHeader>Ticket Info</TicketsHeader>
        <button onClick={closeTicketInfo}>
          <IoMdArrowDropdown className={`${open && " rotate-180"}`} />
        </button>
      </button>
      {open && (
        <div className=" px-3 py-2 w-full mb-[15px] shadow-card bg-white rounded-card">
          <CustomerTicketInfo />
        </div>
      )}

      <div className="p-3 w-full shadow-card bg-white rounded-card">
        <FilesShared />
      </div>
    </div>
  );
};

export default TicketInfo;
