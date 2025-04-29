// components/ModulesControl/Tickets/TicketMessage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Messages from "./Messages";
import { fetchMessages } from "../../../Store/ticketsSlice/ticketsSlice";

const TicketMessage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.tickets.messages);
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {messages.map((message, index) => (
        <Messages
          key={index}
          message={message}
        />
      ))}
    </div>
  );
};

export default TicketMessage;
