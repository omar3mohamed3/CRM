import React from "react";
import PaymentChart from "../../components/Dashboard/PaymentChart";
import CustomersChart from "../../components/Dashboard/CustomersChart";
import CustomersTable from "../../components/Customers/CustomersTable";

const Customers = () => {
  return (
    <div className=" h-full">
      <div className=" grid grid-cols-12 gap-5">
        {/* Charts */}
        <div className=" h-[50vh]  col-span-8">
          <PaymentChart length={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]} />
        </div>
        <div className="  col-span-4">
          <CustomersChart />
        </div>
      </div>
      {/* Table of Customers */}
      <div className=" my-5">
        <CustomersTable />
      </div>
    </div>
  );
};

export default Customers;
