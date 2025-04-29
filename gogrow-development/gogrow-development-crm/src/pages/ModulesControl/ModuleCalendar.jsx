import React from "react";
import CalendarM from "../../components/ModulesControl/Calendar/Calendar";
import CardHeader from "../../components/CardHeader";

const ModuleCalendar = () => {
  return (
    <div className="     h-full ">
      <div className=" bg-white  shadow-card p-4 rounded-card">
        <div>
          <CardHeader>Sales</CardHeader>
        </div>
        <CalendarM />
      </div>
    </div>
  );
};

export default ModuleCalendar;
