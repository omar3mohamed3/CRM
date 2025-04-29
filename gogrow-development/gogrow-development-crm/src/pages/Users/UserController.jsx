import React from "react";
import { Outlet } from "react-router-dom";

const UserController = () => {
  return (
    <div className="  ">
      <div
        className={` ${
          location.pathname === "/leads"
            ? " flex-grow h-[80vh] "
            : " flex-grow h-[83vh]         overflow-auto"
        } `}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserController;
