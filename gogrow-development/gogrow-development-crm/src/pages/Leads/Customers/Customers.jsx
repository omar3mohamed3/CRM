import React, { useRef } from "react";
import LeadsFilter from "../LeadsFilter";
import LeadsTable from "../LeadsTable";
import CustomersTable from "./CustomersTable";

const Customers = () => {
  const componentRef = useRef();
  return (
    <div className="  h-full ">
      {/* <LeadsFilter componentRef={componentRef} /> */}
      <div className="  h-full  ">
        <CustomersTable componentRef={componentRef} />
      </div>
    </div>
  );
};

export default Customers;
