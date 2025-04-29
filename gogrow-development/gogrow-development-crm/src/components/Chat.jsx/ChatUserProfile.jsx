import React, { useState } from "react";
import logo from "/Logo.png";
import { TfiSearch } from "react-icons/tfi";
import useFetchUser from "../../Store/Auth/useFetchUser";

const ChatUserProfile = ({ onSearch }) => {
  const { user } = useFetchUser();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the search term to the parent component
  };

  return (
    <div>
      {" "}
      <div className=" flex px-[15px] ">
        <img
          src={user?.photo}
          className=" w-[50px] h-[50px] rounded-full   object-fill"
          alt=""
        />
        <div className=" text-[18px] ml-[20px]">
          <h2 className=" font-bold ">{user?.name}</h2>
          <span className="  font-light ">
            {user?.role_id == 2 ? "Admin" : "User"}
          </span>
        </div>
      </div>
      <div className="px-[15px] mt-[20px] border-b pb-3  ">
        <div className="relative    flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Try to Searching..."
            className=" w-full  p-1 pl-10 placeholder:text-primary bg-white rounded-full  border-borderGray border   focus:outline-none"
          />
          <TfiSearch className="absolute left-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ChatUserProfile;
