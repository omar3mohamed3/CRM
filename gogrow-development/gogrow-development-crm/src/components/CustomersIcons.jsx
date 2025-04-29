import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const CustomersIcons = ({ path, members }) => {
  const navigate = useNavigate();
  const [hoveredmember, setHoverdMember] = useState(null);
  const handleNavigate = (id) => {
    navigate(`/${path}/${id}`);
  };
  const handleNavigateAll = () => {
    navigate(`/${path}`);
  };
  return (
    <div className="   relative flex items-center ">
      {members ? (
        members.length < 3 ? (
          members.map((member) => (
            <div
              key={member.id}
              onClick={() => handleNavigate(member.id)}
              onMouseEnter={() => setHoverdMember(member.id)}
              onMouseLeave={() => setHoverdMember(null)}
              className={` relative  cursor-pointer   rounded-full border border-white`}>
              <HiOutlineUserCircle className=" text-white bg-[#F7BF76] p-1 text-[30px]  rounded-full" />
              {member.id === hoveredmember && (
                <div className=" absolute bg-white px-2 border rounded-md z-20  w-fit py-1">
                  {member.name}
                </div>
              )}
            </div>
          ))
        ) : (
          <>
            {members.slice(0, 3).map((member) => (
              <div
                key={member.id}
                onClick={() => handleNavigate(member.id)}
                onMouseEnter={() => setHoverdMember(member.id)}
                onMouseLeave={() => setHoverdMember(null)}
                className={` relative  cursor-pointer   rounded-full border border-white`}>
                <HiOutlineUserCircle className=" text-white bg-[#F7BF76] p-1 text-[30px]  rounded-full" />
                {member.id === hoveredmember && (
                  <div className=" absolute bg-white px-2 border rounded-md z-20  w-fit py-1">
                    {member.name}
                  </div>
                )}
              </div>
            ))}
            {members.length > 3 && (
              <div
                onClick={handleNavigateAll}
                className=" bg-[#E5F3FB] cursor-pointer p-[7px] top-0 left-[110px] rounded-full   border border-white">
                <span className="  font-medium flex justify-between items-center text-[11px]">
                  + {members.length - 3}
                </span>
              </div>
            )}
          </>
        )
      ) : (
        <>
          <div className="   rounded-full border border-white">
            <HiOutlineUserCircle className=" text-white bg-[#F7BF76] p-1 text-[30px]  rounded-full" />
          </div>
          <div className=" top-0 left-7 rounded-full   border border-white">
            <HiOutlineUserCircle className=" text-white bg-[#FFD8A5] p-1 text-[30px]  rounded-full" />
          </div>
          <div className=" top-0 left-14 rounded-full   border border-white">
            <HiOutlineUserCircle className=" text-white bg-[#91D4FF] p-1 text-[30px]  rounded-full" />
          </div>
          <div className=" top-0 left-[84px] rounded-full   border border-white">
            <HiOutlineUserCircle className=" text-white bg-[#D3C1FF] p-1 text-[30px]  rounded-full" />
          </div>
          <div className=" bg-[#E5F3FB] p-[7px] top-0 left-[110px] rounded-full   border border-white">
            <span className=" flex justify-between items-center text-[11px]">
              +18
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomersIcons;
