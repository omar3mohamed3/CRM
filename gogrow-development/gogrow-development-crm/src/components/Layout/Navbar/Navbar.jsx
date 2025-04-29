import { FaBars } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { PiBellSimpleRingingFill } from "react-icons/pi";
import { TfiSearch } from "react-icons/tfi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import NormalFont from "../../NormalFont";
import useFetchUser from "../../../Store/Auth/useFetchUser";
import userIcon from "/download.png";
import { useSelector } from "react-redux";

const Navbar = ({ setToggleSide }) => {
  const { userInfo } = useSelector((states) => states.auth);

  return (
    <div className="flex items-center justify-between w-full bg-white px-[35px] py-[14px]  shadow-card rounded-[18px]">
      {/* Left Section */}
      <div className="flex items-center gap-[50px]  ">
        <button onClick={() => setToggleSide((open) => !open)}>
          <FaBars className="text-primary text-xl cursor-pointer" />
        </button>
        <nav className="flex gap-[50px]    items-center text-gray-700">
          <Link
            to="/chat"
            className="hover:text-primary">
            <NormalFont font=" font-bold ">Chat</NormalFont>
          </Link>
          <Link
            to="/calendar"
            className="hover:text-primary">
            <NormalFont font=" font-bold ">Calendar</NormalFont>
          </Link>
          {/* <Link
            to="#email"
            className="hover:text-primary">
            <NormalFont>Email</NormalFont>
          </Link> */}
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-[36px] text-gray-700">
        {/* Middle Section */}
        {/* <div className="relative mr-5  flex items-center">
          <input
            type="text"
            placeholder="Try to Searching..."
            className="w-[180px] p-1 pl-10 placeholder:text-primary bg-white rounded-full  border-borderGray border   focus:outline-none"
          />
          <TfiSearch className="absolute left-3 text-gray-400" />
        </div> */}
        <button>
          <BiMessageDetail className="text-[20px] cursor-pointer hover:text-primary" />
        </button>
        <button>
          <PiBellSimpleRingingFill className="text-[20px] cursor-pointer hover:text-primary" />
        </button>
        <Link
          to={
            userInfo?.identity === "admin"
              ? "/account-setting"
              : `/users/${userInfo?.id}`
          }
          className="flex items-center text-left space-x-2">
          <div className=" relative rounded-full">
            <img
              className="w-[35px] h-[35px] rounded-full object-cover"
              alt={userInfo?.name}
              src={userInfo?.photo || userIcon}
            />
            {/* <HiMiniUserCircle className="text-4xl  bg-white rounded-full   mx-auto " /> */}
          </div>
          <div className="leading-tight">
            <div className="font-bold">{userInfo?.name}</div>
            <div className="text-[15px] font-light">{userInfo?.identity}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
