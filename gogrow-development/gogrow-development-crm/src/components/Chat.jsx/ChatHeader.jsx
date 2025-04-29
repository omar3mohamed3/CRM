import React from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { PiListBold } from "react-icons/pi";
import logo from "/download.png";
import { useSelector } from "react-redux";

const ChatHeader = ({ setOpenSide, history = false }) => {
  const { otherUserData } = useSelector((state) => state.chat);

  return (
    <div className=" flex justify-between items-center w-full">
      <div className=" flex items-center  ">
        <button
          className="mr-[20px]"
          onClick={() => setOpenSide((open) => !open)}>
          <PiListBold className=" text-[24px]  " />
        </button>
        {!history && (
          <div className=" flex px-[15px] ">
            {otherUserData && (
              <img
                src={otherUserData.photo || logo}
                className=" w-[50px] h-[50px] rounded-full   object-fill"
                alt=""
              />
            )}

            <div className=" text-[18px] ml-[20px] flex   items-center">
              <h2 className=" font-bold ">{otherUserData?.name}</h2>
              {/* <span className="  font-light ">Admin</span> */}
            </div>
          </div>
        )}
      </div>
      <button className=" ml-auto">
        <IoEllipsisVerticalSharp />
      </button>
    </div>
  );
};

export default ChatHeader;
