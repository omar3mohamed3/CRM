import React from "react";
import UserBox from "./UserBox";

const UserTime = () => {
  return (
    <div className=" grid grid-cols-5 gap-[13px] items-center w-full">
      <UserBox
        title={"Total Lead Actions"}
        time={"00:00"}
      />
      <UserBox
        title={"This Month Lead Actions"}
        time={"00:00"}
      />
      <UserBox
        title={"This Weak Lead Actions"}
        time={"00:00"}
      />
      <UserBox
        title={"Total Assign Lead"}
        time={"00:00"}
      />
      <UserBox
        title={"Total Converted Lead"}
        time={"00:00"}
      />
    </div>
  );
};

export default UserTime;
