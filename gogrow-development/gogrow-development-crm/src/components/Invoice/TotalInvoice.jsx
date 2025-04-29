import React from "react";
import { ImRadioUnchecked } from "react-icons/im";
import CardLayout from "../CardLayout";

const TotalInvoice = () => {
  return (
    <CardLayout>
      <h2 className=" font-bold mb-10 ">Total Invoices</h2>
      <div></div>
      <div className=" font-medium grid grid-cols-2 ">
        <div>
          <div className="  mb-[14px] ">22.47K</div>
          <div className=" flex gap-2 items-center">
            <ImRadioUnchecked className=" text-[14px] text-[#009E3F]" />
            Paid
          </div>
        </div>
        <div>
          <div className="  mb-[14px] ">5.47K</div>
          <div className=" flex gap-2 items-center">
            <ImRadioUnchecked className=" text-[14px] text-[#FF425E]" />
            Pending
          </div>
        </div>
      </div>
    </CardLayout>
  );
};

export default TotalInvoice;
