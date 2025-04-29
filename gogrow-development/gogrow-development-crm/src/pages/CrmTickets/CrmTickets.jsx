import React from "react";
import TicketsList from "../../components/ModulesControl/Tickets/TicketsList";
import TicketMessage from "../../components/ModulesControl/Tickets/TicketChat";
import TicketInfo from "../../components/ModulesControl/Tickets/TicketInfo";
import Hashtag from "../../components/Hashtag";

const CrmTickets = () => {
  return (
    <div>
      <Hashtag># Tickets</Hashtag>
      <div className=" grid grid-cols-12 gap-2 pb-2 px-[1px]">
        {/* Tickets */}
        <div className="  col-span-3 shadow-card bg-white rounded-card p-4">
          <TicketsList />
        </div>
        {/* Chat */}
        <div className=" col-span-9 shadow-card bg-white rounded-card p-4">
          <TicketMessage />
        </div>
        {/* Tickets Info */}
        {/* <div className=" col-span-3   ">
          <TicketInfo />
        </div> */}
      </div>
    </div>
  );
};

export default CrmTickets;
