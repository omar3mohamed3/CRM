import React from "react";
import Hashtag from "../../components/Hashtag";
import SubSidebar from "../../components/Layout/sidebar/SubSidebar";
import MenuItem from "../../components/Layout/sidebar/MenuItem";
import { Outlet } from "react-router-dom";
import LeadsButtons from "./LeadsButtons";

const SettingsController = () => {
  return (
    <div className=" flex  gap-2">
      {/* Sidebar */}
      <div>
        <Hashtag># Settings</Hashtag>
        <SubSidebar width={" w-[122px]"}>
          <MenuItem
            noPadding
            button={"button"}
            label="Leads"
            to={"lead"}>
            <LeadsButtons
              path="lead"
              linksList={leadList}
            />
          </MenuItem>

          <MenuItem
            noPadding
            button={"button"}
            label="Property"
            to={"property"}>
            <LeadsButtons
              path="property"
              linksList={propertiesList}
            />
          </MenuItem>
        </SubSidebar>
      </div>
      <div
        className={` ${
          location.pathname === "/leads"
            ? " flex-grow h-[80vh] "
            : " flex-grow  h-full  flex-col       overflow-auto"
        } `}>
        <Hashtag># Filters</Hashtag>
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsController;

const leadList = [
  { id: 1, link: "status", label: "Status" },
  { id: 2, link: "source", label: "Source" },
  // { id: 3, link: "additionFilters", label: "Addition Filters" },
];
const propertiesList = [
  { id: 1, link: "type", label: "Type of Unit" },
  // { id: 2, link: "direction", label: "Direction Property" },
  { id: 3, link: "features", label: "Other Features" },
  // { id: 3, link: "details", label: "Other Details" },
  // { id: 3, link: "additionFilters", label: "Addition Filters" },
];
