import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SubSidebar from "../../components/Layout/sidebar/SubSidebar";
import MenuItem from "../../components/Layout/sidebar/MenuItem";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdDisplaySettings, MdOutlineCalendarMonth } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { TbReportAnalytics } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

// TODO
// Every Module should navigate with  it's "ID"
const ModulesControler = () => {
  const location = useLocation();
  return (
    <div className="  flex  ">
      {location.pathname !== "/modules-control" && (
        <div className="   w-[190px]">
          <SubSidebar>
            <MenuItem
              icon={<LuLayoutDashboard />}
              label="Profile"
              to={"/modules-control/profile"}
            />
            <MenuItem
              icon={<MdDisplaySettings />}
              label="Modules Customers"
              to="/modules-control/modules-customers"
            />
            <MenuItem
              icon={<PiUsersThree />}
              label="Sales"
              to={"/modules-control/sales"}
            />
            <MenuItem
              icon={<MdOutlineCalendarMonth />}
              label="Calender"
              to="/modules-control/calender"
            />
            <MenuItem
              icon={<TbReportAnalytics />}
              label="Modules View"
              to="/modules-control/module-view"
            />
            <MenuItem
              icon={<MdOutlineCalendarMonth />}
              label="Tickets"
              to="/modules-control/tickets"
            />
            <MenuItem
              icon={<LiaFileInvoiceDollarSolid />}
              label="Invoice"
            />
          </SubSidebar>
        </div>
      )}
      <div
        className={` ${
          location.pathname === "/modules-control"
            ? "   "
            : " flex-grow h-[78vh]  ml-2    overflow-auto"
        } `}>
        <Outlet />
      </div>
    </div>
  );
};
export default ModulesControler;
