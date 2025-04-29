import { PiBellSimpleRingingFill } from "react-icons/pi";
import { TfiSearch } from "react-icons/tfi";
import ReminderTable from "./LeadReminderTable";
import { useEffect, useState } from "react";
import SetReminderModal from "./SetReminderModal";
import { fetchReminders } from "../../Store/leadsSlice/leadReminders";
import { useDispatch, useSelector } from "react-redux";

const LeadReminder = () => {
  const [openReminder, setOpenReminder] = useState(false);
  const dispatch = useDispatch();

  const handleopenReminder = () => {
    setOpenReminder(true);
  };
  const closeReminder = () => {
    setOpenReminder(false);
  };

  // useEffect(() => {
  //   dispatch(fetchReminders());
  // }, [dispatch]);

  return (
    <div className=" mt-3">
      <div className=" flex justify-between items-center">
        <SetReminderModal
          isOpen={openReminder}
          onClose={closeReminder}
        />
        {/* Set Lead Reminder */}
        <button
          onClick={handleopenReminder}
          className=" hover:bg-[#40bb6e] bg-[#22C55E] rounded-[4px] text-white flex gap-1 items-center px-2 py-px">
          <PiBellSimpleRingingFill />
          Set Lead Reminder
        </button>
        {/* Search Input */}

        {/* <div className="relative mr-5   flex items-center">
          <input
            type="text"
            placeholder="Try to Searching..."
            className="w-[180px] p-[1px]  pl-10 placeholder:text-primary bg-white rounded-full  border-borderGray border   focus:outline-none"
          />
          <TfiSearch className="absolute left-3 text-gray-400" />
        </div> */}
      </div>
      <ReminderTable />
    </div>
  );
};

export default LeadReminder;
