import Table from "./Table";
import { GoKebabHorizontal } from "react-icons/go";
import CustomersIcons from "../CustomersIcons";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState } from "react";
import { useSelector } from "react-redux";

const CustomersOverViewTable = () => {
  const { summary } = useSelector((state) => state.dashboard);
  const [hoveredmember, setHoverdMember] = useState(null);
  const navigate = useNavigate();

  const columns = [
    "Customers",
    "Company",
    "Phone",
    "Source",
    "Assigned",
    "Last Contact",
    "Status",
    "",
  ];

  const tableData = summary?.newest_customers.map((customer) => ({
    id: customer.id,
    Customers: customer.name,
    Company: customer.company,
    Phone: customer.phone,
    Source: customer?.source_name, // It will change in API
    Assigned: {
      id: customer?.assigned_id,
      name: customer?.assigned_name,
    },
    lastContact: customer.last_contact,
    status: customer?.status_name,
  }));

  // const tableData = [
  //   {
  //     id: "1",
  //     Customers: "Ahmed Nagy",
  //     Company: "GO GROW",
  //     Phone: "0123456789",
  //     Source: "Direct Leads",
  //     Assigned: { id: 1, name: "Ahmed Mohamed" },
  //     lastContact: "Yesterday",
  //     status: "New Lead From Campaign",
  //   },
  //   {
  //     id: "2",
  //     Customers: "Ahmed Nagy",
  //     Company: "GO GROW",
  //     Phone: "0123456789",
  //     Source: "Direct Leads",
  //     Assigned: { id: 2, name: "Ahmed Mohamed" },
  //     lastContact: "Yesterday",
  //     status: "New Lead From Campaign",
  //   },
  //   {
  //     id: "3",
  //     Customers: "Ahmed Nagy",
  //     Company: "GO GROW",
  //     Phone: "0123456789",
  //     Source: "Direct Leads",
  //     Assigned: { id: 3, name: "Ahmed Mohamed" },
  //     lastContact: "Yesterday",
  //     status: "New Lead From Campaign",
  //   },
  //   {
  //     id: "4",
  //     Customers: "Ahmed Nagy",
  //     Company: "GO GROW",
  //     Phone: "0123456789",
  //     Source: "Direct Leads",
  //     Assigned: { id: 4, name: "Ahmed Mohamed" },
  //     lastContact: "Yesterday",
  //     status: "New Lead From Campaign",
  //   },
  //   {
  //     id: "5",
  //     Customers: "Ahmed Nagy",
  //     Company: "GO GROW",
  //     Phone: "0123456789",
  //     Source: "Direct Leads",
  //     Assigned: { id: 5, name: "Ahmed Mohamed" },
  //     lastContact: "Yesterday",
  //     status: "New Lead From Campaign",
  //   },
  // ];

  const handleNavigate = (id) => {
    navigate(`/leads/${id}`);
  };

  return (
    <div className="bg-white shadow-card rounded-card p-6 h-full flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((col, index) => (
                <th
                  key={col}
                  className={`${
                    index === 0 ? "text-left" : "text-center"
                  } pb-3 text-[20px] leading-[30px] font-semibold`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row, index) => (
              <tr
                key={index}
                onClick={() => handleNavigate(row.id)}
                className="border-b cursor-pointer last:border-b-0">
                <td className="py-5   ">{row.Customers}</td>
                <td className="py-5 text-center ">{row.Company}</td>
                <td className="py-5 text-center">{row.Phone}</td>
                <td className="py-3 text-center text-gray-800">{row.Source}</td>
                <td
                  onClick={(e) => e.stopPropagation()}
                  className="py-3 ">
                  <div className=" flex justify-center ">
                    {/* <CustomersIcons /> */}
                    <div
                      onClick={() => navigate(`/users/${row.Assigned.id}`)}
                      onMouseEnter={() => setHoverdMember(row.id)}
                      onMouseLeave={() => setHoverdMember(null)}
                      className={` relative  cursor-pointer   rounded-full border border-white`}>
                      <HiOutlineUserCircle className=" text-white bg-[#F7BF76] p-1 text-[30px]  rounded-full" />
                      {row.id === hoveredmember && (
                        <div className=" absolute bg-white px-2 border rounded-md z-20  top-0 right-8 w-fit py-1">
                          {row.Assigned.name}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 text-center text-gray-800">
                  {row.lastContact}
                </td>
                {row.status && (
                  <td className="py-5 text-center ">
                    <span className="bg-[#FFDFDF69]  text-[#B70000] border border-[#B70000] text-xs font-medium px-3 py-[1px] rounded-[4px]">
                      {row.status}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        to={"/teams"}
        className="mt-4 hover:text-blue-500 text-blue-600 self-start">
        See More
      </Link>
    </div>
  );
};

export default CustomersOverViewTable;
