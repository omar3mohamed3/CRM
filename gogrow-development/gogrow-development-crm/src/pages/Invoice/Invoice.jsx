import { useState } from "react";
import InvoiceCard from "../../components/Invoice/InvoiceCard";
import InvoiceSales from "../../components/Invoice/InvoiceSales";
import InvoiceTable from "../../components/Invoice/InvoiceTable";
import InvoiceTableHead from "../../components/Invoice/InvoiceTableHead";
import TotalInvoice from "../../components/Invoice/TotalInvoice";

const Invoice = () => {
  const [showInvoice, setShowInvoice] = useState(null);
  return (
    <div className=" py-1">
      <div className=" grid grid-cols-12 gap-[12px]">
        {/*  Total Invoice */}
        <div className=" col-span-4 leading-[23px] text-[18px]">
          <TotalInvoice />
        </div>
        <div className="  col-span-8">
          <div className=" h-full bg-white rounded-card shadow-card p-5">
            <InvoiceSales />
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-12 gap-2 mt-4">
        <div
          className={` ${
            showInvoice !== null ? "col-span-8" : "col-span-12"
          }  shadow-card rounded-card bg-white p-3`}>
          <InvoiceTableHead />
          <InvoiceTable
            showInvoice={showInvoice}
            setShowInvoice={setShowInvoice}
          />
        </div>
        {showInvoice !== null && (
          <div className="  col-span-4 shadow-card rounded-card  bg-white p-3">
            <InvoiceCard setShowInvoice={setShowInvoice} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
