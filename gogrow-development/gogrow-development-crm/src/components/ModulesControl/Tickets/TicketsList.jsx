// components/ModulesControl/Tickets/TicketsList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTickets,
  setSelectedTicket,
} from "/src/Store/ticketsSlice/ticketsSlice.js";
import TicketCard from "./TicketCard";
import TicketsHeader from "./TicketsHeader";
import { TfiSearch } from "react-icons/tfi";
import { IoMdArrowDropup } from "react-icons/io";
import TicketsListSkeleton from "./Skeleton/TicketsListSkeleton";
import {
  clearMessages,
  fetchMessages,
} from "../../../Store/ticketsSlice/ticketsSlice";

const TicketsList = () => {
  const [active, setActive] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  const handleNewMessage = () => {
    dispatch(clearMessages());
  };

  // Filter tickets based on the search term
  const filteredTickets = tickets?.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if (status === "failed") {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      {/* Header */}
      <div className=" flex justify-between items-center">
        <TicketsHeader>Recent Tickets</TicketsHeader>
        <button
          onClick={handleNewMessage}
          className=" font-medium text-white hover:bg-blue-500 bg-blue-400 rounded-md px-1">
          New Ticket
        </button>
      </div>
      {/* Search */}
      <div className="relative mt-5 flex items-center">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          type="text"
          placeholder="Try to Searching..."
          className="w-full p-[1px] pl-10 placeholder:text-[14px] placeholder:text-primary bg-white rounded-full border-borderGray border focus:outline-none"
        />
        <TfiSearch className="absolute left-3 text-gray-400" />
      </div>

      {/* Tickets */}
      {loading ? (
        <TicketsListSkeleton />
      ) : (
        <div>
          <div className="mt-3 pb-4 flex justify-between items-center">
            <span>My Open Tickets ({filteredTickets?.length})</span>
            <IoMdArrowDropup />
          </div>
          <div className="h-[85vh] flex flex-col gap-3 py-2 overflow-y-auto">
            {filteredTickets?.map((ticket) => (
              <TicketCard
                setActive={setActive}
                active={active}
                key={ticket.id}
                ticket={ticket}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsList;
