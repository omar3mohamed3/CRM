import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ModuleHeader from "../../components/ModulesControl/Main/ModuleHeader";
import Hashtag from "../../components/Hashtag";

const LeadsControler = () => {
  const location = useLocation();

  return (
    <div>
      <Hashtag>
        # {location.pathname === "/leads" ? "Leads" : "Customers"}
      </Hashtag>
      {location.pathname === "/leads" && (
        <div>
          <ModuleHeader />
        </div>
      )}

      <div
        className={` ${
          location.pathname === "/leads"
            ? " flex-grow h-[80vh] "
            : "  h-[78vh]  py-2  mt-2    overflow-auto"
        } `}>
        <Outlet />
      </div>
    </div>
  );
};

export default LeadsControler;
