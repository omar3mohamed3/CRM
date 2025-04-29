import { useState } from "react";

import LeadProfile from "./LeadProfile";
import LeadProposals from "./LeadProposals";
import LeadContract from "./LeadContract";
import LeadReminder from "./LeadReminder";
import LeadNote from "./LeadNote";
import LeadActivityLog from "./LeadAcivityLog";
import { useSelector } from "react-redux";

const LeadInfo = () => {
  // TODO
  // GET leadId and Name
  const { error, loading, lead, convertLeadLoading, progressFailedLoading } =
    useSelector((state) => state.leadInfo);
  const [currentPage, setCurrentPage] = useState("Profile");

  const handlePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const buttons = [
    "Profile",
    "Proposals",
    "Contract",
    "Reminders",
    "Notes",
    "Activity Log",
  ];

  return (
    <div className="bg-white h-full overflow-y-auto shadow-card p-3 rounded-card">
      <h2 className="text-[16px] leading-[30px] font-medium">
        #{lead?.id} - {lead?.name}
      </h2>

      {/* Lead Nav Profile */}
      <div className="flex justify-around py-2 rounded-[6px] w-full bg-customBlue text-white">
        {buttons.map((button) => (
          <button
            key={button}
            className={`${
              currentPage === button
                ? "border-white"
                : "border-transparent hover:border-white"
            } font-medium hover:border-b-[2px] duration-200 ease-in-out transition-all border-b-[2px] px-2`}
            onClick={() => handlePage(button)}>
            {button}
          </button>
        ))}
      </div>

      {/* Lead Profile */}
      {/* TODO Lists */}
      {currentPage === "Profile" && <LeadProfile />}
      {/* TODO Download */}
      {currentPage === "Proposals" && <LeadProposals />}
      {currentPage === "Contract" && <LeadContract />}
      {/* TODO   */}
      {currentPage === "Reminders" && <LeadReminder />}
      {/* TODO   */}
      {currentPage === "Notes" && <LeadNote />}
      {/* TODO   */}
      {currentPage === "Activity Log" && <LeadActivityLog />}
    </div>
  );
};

export default LeadInfo;
