import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventInfoModal from "./EventInfoModal"; // Import the modal component

const localizer = momentLocalizer(moment);

const CalendarM = ({
  events = [
    {
      title: "Event add team",
      start: new Date(2024, 9, 3, 12, 20, 10),
      end: new Date(2024, 9, 3, 8, 20, 10),
      color: "green",
      description: "Team addition event",
    },
    {
      title: "Event making calendar",
      start: new Date(2024, 9, 10),
      end: new Date(2024, 9, 15),
      color: "green",
      description: "Creating the calendar for Q4",
    },
  ],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color === "green" ? "#2697e0" : "#ef4444"; // Tailwind green-500 or red-500
    const style = {
      backgroundColor,
      borderRadius: "4px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style,
    };
  };

  return (
    <div className=" h-[73vh] overflow-y-auto flex flex-col">
      <div className="flex-grow">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }} // Set height to 100%
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventClick}
          popup={true}
        />
      </div>

      {selectedEvent && (
        <EventInfoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          eventData={selectedEvent}
        />
      )}
    </div>
  );
};

export default CalendarM;
