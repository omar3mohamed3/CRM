import { Outlet, useLocation } from "react-router-dom";
import SubSidebar from "../../components/Layout/sidebar/SubSidebar";
import MenuItem from "../../components/Layout/sidebar/MenuItem";
import { TbReportAnalytics } from "react-icons/tb";
import { MdDisplaySettings, MdOutlineCalendarMonth } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import ModuleHeader from "../../components/ModulesControl/Main/ModuleHeader";

// TODO
// Every Customer should navigate with  it's "ID"

const CustomerControler = () => {
  const location = useLocation();
  return (
    <div>
      <div
        className={`${
          location.pathname !== "/customers" && " pl-[50px] "
        } pb-2`}>
        <ModuleHeader />
      </div>
      <div className="  flex  ">
        {location.pathname !== "/customers" && (
          <div className="   w-[190px]">
            <SubSidebar>
              <MenuItem
                icon={<LuLayoutDashboard />}
                label="Profile"
                to={"/customers/profile"}
              />
              <MenuItem
                icon={<MdDisplaySettings />}
                label="Contact Number"
                to="/customers/contact-number"
              />
              <MenuItem
                icon={<PiUsersThree />}
                label="Modules"
                to={"#"}
              />
              <MenuItem
                icon={<MdOutlineCalendarMonth />}
                label="Users"
                to="#"
              />
              <MenuItem
                icon={<TbReportAnalytics />}
                label="Payment"
                to="#"
              />
              <MenuItem
                icon={<MdOutlineCalendarMonth />}
                label="Contract"
                to="#"
              />
              <MenuItem
                icon={<LiaFileInvoiceDollarSolid />}
                label="Tickets"
                to="#"
              />
            </SubSidebar>
          </div>
        )}
        <div
          className={` ${
            location.pathname === "/customers"
              ? " flex-grow  "
              : " flex-grow h-[78vh]  ml-2    overflow-auto"
          } `}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default CustomerControler;
