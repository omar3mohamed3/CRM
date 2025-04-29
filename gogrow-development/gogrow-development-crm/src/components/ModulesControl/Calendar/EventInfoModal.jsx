import { useEffect, useRef } from "react";

const EventInfoModal = ({ isOpen, onClose, eventData }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-medium mb-4">Meeting Details</h2>
        {/* Event Title */}
        <div className="mb-4">
          {/* <label className="block text-sm font-medium mb-1">Title</label>
          <p className="border border-gray-300 rounded px-3 py-2 bg-gray-100">
            {eventData.title}
          </p> */}
        </div>

        {/* Event Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Event Date</label>
          <p className="border border-gray-300 rounded px-3 py-2 bg-gray-100">
            {eventData.start.toDateString()} - {eventData.end.toDateString()}
          </p>
        </div>

        {/* Event Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <p className="border border-gray-300 rounded px-3 py-2 bg-gray-100">
            {eventData.description || "No description provided."}
          </p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventInfoModal;
