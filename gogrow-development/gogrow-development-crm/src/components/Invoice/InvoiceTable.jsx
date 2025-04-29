import React from "react";
import { GoKebabHorizontal } from "react-icons/go";
import TableFooter from "../TableFooter";

const InvoiceTable = ({ setShowInvoice, showInvoice }) => {
  const columns = [
    "Invoice",
    "Customer",
    "Modules",
    "Amount",
    "Date",
    "Total Tax",
    "Due Date",
    "Visa",
    "Status",
    "",
  ];

  return (
    <div className="  overflow-y-auto">
      {/* <div className=" h-[50vh] overflow-y-auto"> */}
      <table
        className={`${
          showInvoice !== null ? "text-[11px]" : "text-[15px]"
        }  w-full    overflow-y-auto  `}>
        <thead>
          <tr className="border-b">
            {columns.map((col, index) => (
              <th
                key={col}
                className={` ${
                  index === 0 ? "text-left" : "text-left"
                } py-2     leading-[16px]  font-medium`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              onClick={() => setShowInvoice(row.id)}
              className="border-b hover:bg-[#707070] cursor-pointer hover:bg-opacity-15 font-normal last:border-b-0">
              <td className="py-5   ">{row.invoice}</td>
              <td className="py-5 text-left ">{row.customer}</td>
              <td className="py-5 text-left">{row.modules}</td>
              <td className="py-3 text-left text-gray-800">{row.amount}</td>
              <td className="py-3 text-left text-gray-800">{row.date}</td>
              <td className="py-3 text-left text-gray-800">{row.tax}</td>
              <td className="py-3 text-left text-gray-800">{row.dueDate}</td>
              <td className="py-3 text-left text-gray-800">{row.visa}</td>

              {row.status && (
                <td className="py-5 text-left ">
                  <span className="bg-[#DFFFF3]  text-[#5AD595] border border-[#5AD595] text-xs font-medium px-3 py-[1px]  rounded-full">
                    {row.status}
                  </span>
                </td>
              )}
              <td className="py-5 text-left">
                <button className="text-gray-400 hover:text-gray-600">
                  <GoKebabHorizontal
                    className=" text-[16px] rotate-90"
                    size={16}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter />
    </div>
  );
};

export default InvoiceTable;

const tableData = [
  {
    id: 1,
    invoice: "#5552121250",
    customer: "GO GROW",
    modules: "Sales",
    amount: "20.000 K",
    date: "02/09",
    tax: "20.000 K",
    dueDate: "20.000 K",
    visa: "xxxx0408",
    status: "Paid",
  },
  {
    id: 2,
    invoice: "#5552121250",
    customer: "GO GROW",
    modules: "Sales",
    amount: "20.000 K",
    date: "02/09",
    tax: "20.000 K",
    dueDate: "20.000 K",
    visa: "xxxx0408",
    status: "Paid",
  },
  {
    id: 3,
    invoice: "#5552121250",
    customer: "GO GROW",
    modules: "Sales",
    amount: "20.000 K",
    date: "02/09",
    tax: "20.000 K",
    dueDate: "20.000 K",
    visa: "xxxx0408",
    status: "Paid",
  },
  {
    id: 4,
    invoice: "#5552121250",
    customer: "GO GROW",
    modules: "Sales",
    amount: "20.000 K",
    date: "02/09",
    tax: "20.000 K",
    dueDate: "20.000 K",
    visa: "xxxx0408",
    status: "Paid",
  },
  {
    id: 5,
    invoice: "#5552121250",
    customer: "GO GROW",
    modules: "Sales",
    amount: "20.000 K",
    date: "02/09",
    tax: "20.000 K",
    dueDate: "20.000 K",
    visa: "xxxx0408",
    status: "Paid",
  },
  {
    id: 6,
    invoice: "#5552121250",
    customer: "GO GROW",
    modules: "Sales",
    amount: "20.000 K",
    date: "02/09",
    tax: "20.000 K",
    dueDate: "20.000 K",
    visa: "xxxx0408",
    status: "Paid",
  },
  {
    id: 7,
    invoice: "#5552121250",
    customer: "GO GROW",
    modules: "Sales",
    amount: "20.000 K",
    date: "02/09",
    tax: "20.000 K",
    dueDate: "20.000 K",
    visa: "xxxx0408",
    status: "Paid",
  },
  {
    id: 8,
    invoice: "#5552121250",
    customer: "GO GROW",
    modules: "Sales",
    amount: "20.000 K",
    date: "02/09",
    tax: "20.000 K",
    dueDate: "20.000 K",
    visa: "xxxx0408",
    status: "Paid",
  },
  {
    id: 9,
    invoice: "#5552121250",
    customer: "GO GROW",
    modules: "Sales",
    amount: "20.000 K",
    date: "02/09",
    tax: "20.000 K",
    dueDate: "20.000 K",
    visa: "xxxx0408",
    status: "Paid",
  },
  {
    id: 10,
    invoice: "#5552121250",
    customer: "GO GROW",
    modules: "Sales",
    amount: "20.000 K",
    date: "02/09",
    tax: "20.000 K",
    dueDate: "20.000 K",
    visa: "xxxx0408",
    status: "Paid",
  },
];
