import { FaUser, FaTasks, FaPowerOff } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import logo from "/public/arrowup - Copy.png";

import { VscSettings } from "react-icons/vsc";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { HiOutlineTicket } from "react-icons/hi2";
import { PiChatsDuotone } from "react-icons/pi";
import { RiUserStarLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import MenuItem from "./MenuItem";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Store/Auth/loginUser";
import { fetchProfile } from "../../../Store/AccountSettings/profileSlice";

const Sidebar = ({ toggleSide }) => {
  const [subSide, setSubSide] = useState(false);
  const { userInfo } = useSelector((states) => states.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading, error } = useSelector((state) => state.profile);
  const [profilePicture, setProfilePicture] = useState();
  const isAdmin = userInfo?.identity === "admin";

  // Fetch the profile picture on component mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Update profilePicture state when profile is fetched
  useEffect(() => {
    if (profile) {
      setProfilePicture(profile?.photo_url); // Ensure to use photo_url
    }
  }, [profile]);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");

    // window.location.reload()
  };
  return (
    <div
      className={`${
        toggleSide ? "w-[230px]" : " w-[70px]"
      }  h-[92vh]   overflow-y-auto relative  bg-white rounded-[18px]  ease duration-500 transition-all shadow-card flex flex-col justify-between`}>
      <div>
        {/* Logo Section */}
        <div className="flex items-center justify-center  border-b px-3 py-3">
          <Link
            to={isAdmin ? "/dashboard" : "/leads"}
            className="flex items-center  justify-between  pb-3  space-x-2">
            <img
              src={profilePicture}
              className="text-primary max-w-[55px] rounded-full text-sm font-bold"
            />
            {toggleSide && (
              <div className=" text-[24px] font-medium">{profile?.name}</div>
            )}
          </Link>
        </div>

        {/* Menu Items */}
        <div className="space-y-1 mt-1">
          {isAdmin && (
            <MenuItem
              toggleSide={toggleSide}
              icon={<LuLayoutDashboard />}
              label="Dashboard"
              to={"/dashboard"}
            />
          )}
          {userInfo?.lead && (
            <MenuItem
              setSubSide={setSubSide}
              toggleSide={toggleSide}
              icon={<RiTeamLine />}
              label="Leads"
              to="/leads"
            />
          )}

          {isAdmin && (
            <MenuItem
              setSubSide={setSubSide}
              toggleSide={toggleSide}
              icon={<RiUserStarLine />}
              label="Customer"
              to="/customers"
            />
          )}

          {(userInfo?.products ||
            userInfo?.properties ||
            userInfo?.services) && (
            <MenuItem
              toggleSide={toggleSide}
              icon={<MdOutlineAddToPhotos />}
              label="Add Items"
              to="/items"
            />
          )}
          {isAdmin && (
            <MenuItem
              toggleSide={toggleSide}
              icon={<FaRegAddressCard />}
              to="users"
              label="Users"
            />
          )}
          {userInfo?.teams && (
            <MenuItem
              toggleSide={toggleSide}
              icon={<PiUsersThreeLight />}
              label="Teams"
              to="teams"
            />
          )}
          <MenuItem
            toggleSide={toggleSide}
            icon={<PiChatsDuotone />}
            label="Chat"
            to="chat"
          />
          {userInfo?.identity !== "user" && (
            <MenuItem
              toggleSide={toggleSide}
              icon={<PiChatsDuotone />}
              label="Chat-History"
              to="history"
            />
          )}
          <MenuItem
            toggleSide={toggleSide}
            icon={<MdOutlineCalendarMonth />}
            label="Calendar"
            to="calendar"
          />
          {isAdmin && (
            <MenuItem
              toggleSide={toggleSide}
              icon={<HiOutlineTicket />}
              label="Tickets"
              to="tickets"
            />
          )}
          {/* <MenuItem
            toggleSide={toggleSide}
            icon={<LiaFileInvoiceDollarSolid />}
            label="Invoice"
            to="invoice"
          /> */}
          <MenuItem
            toggleSide={toggleSide}
            icon={<FaTasks />}
            label="ToDo"
            to="todo"
          />
          {isAdmin && (
            <>
              <MenuItem
                toggleSide={toggleSide}
                icon={<TbReportAnalytics />}
                label="Reports"
                to="reports"
              />
              <MenuItem
                toggleSide={toggleSide}
                icon={<VscSettings />}
                label="Settings"
                to="settings"
              />
              <MenuItem
                toggleSide={toggleSide}
                icon={<RiUserSettingsLine />}
                label="Account Setting"
                to="account-setting"
              />{" "}
            </>
          )}
        </div>
      </div>
      {/* Sub Menu */}

      {/* {subSide && <SubSidebar toggleSide={toggleSide} />} */}

      {/* User Section */}
      <div
        className={` ${
          toggleSide ? " p-2 " : "    py-[35px]   mx-[8px]  mb-[13px] "
        } flex items-center m-[10px]  justify-center  rounded-2xl  bg-yellowprimary text-white`}>
        {toggleSide && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-6 h-6 bg-white text-primary rounded-full">
              <FaUser />
            </div>
            <div>
              <div className="font-bold text-primary">{userInfo?.name}</div>
              <div className="text-sm">{userInfo?.identity}</div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`${toggleSide && "ml-auto"}`}>
          <FaPowerOff className=" text-primary text-[16px]" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
