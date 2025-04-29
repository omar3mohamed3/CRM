import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoKebabHorizontal } from "react-icons/go";
import icon from "/images.png";

import toast from "react-hot-toast";
import {
  deleteCustomer,
  fetchCustomers,
  setNextCustomerPage,
  setPreviousCustomerPage,
} from "../../Store/leadsSlice/Customers/CustomersSlice";
import Loader from "../../components/Layout/Loader";
import TableFooter from "../../components/TableFooter";
import { fetchReportedLeads } from "../../Store/reportsSlice/reportedLeadsTable";

const ReportedLeadsTable = ({ componentRef }) => {
  const dispatch = useDispatch();

  // Modal
  const [showLead, setShowLead] = useState(null);
  const [showSetting, setShowSetting] = useState(null);

  // Lead ID to Reassign to user

  //Datea From  LeadsSLice
  const { reportedLeadsData, loading, pagination, filters } = useSelector(
    (state) => state.reportedLeads
  );

  const leadIconRefs = useRef([]);
  const settingButtonRefs = useRef([]);

  // Fetch Leads with paginated
  useEffect(() => {
    dispatch(
      fetchReportedLeads({
        page: pagination.currentPage,
        teamId: filters.teamId,
        memberId: filters.memberId,
      })
    );
  }, [dispatch, pagination.currentPage, filters]);

  const handleClickOutside = (event) => {
    if (
      !leadIconRefs.current.some((ref) => ref && ref.contains(event.target))
    ) {
      setShowLead(null);
    }
    if (
      !settingButtonRefs.current.some(
        (ref) => ref && ref.contains(event.target)
      )
    ) {
      setShowSetting(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLead, showSetting]);

  const columns = [
    "#",
    "Customers",
    "Company",
    "Phone",
    "Source",
    "Assigned",
    "Last Contact",
    "Status",
    "",
  ];

  const nextpage = () => {
    dispatch(setNextCustomerPage());
  };

  const previouspage = () => {
    dispatch(setPreviousCustomerPage());
  };
  return (
    <div
      ref={componentRef}
      className="bg-white rounded-[18px] min-h-[76vh] shadow-card p-6 flex flex-col">
      <div className="overflow-y-auto flex-grow">
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
            {loading ? (
              <tr className=" h-full">
                <td
                  colSpan={columns.length}
                  className="py-4 h-[400px] text-center">
                  <Loader />
                </td>
              </tr>
            ) : reportedLeadsData.length === 0 ? (
              <tr className=" h-full">
                <td
                  colSpan={columns.length}
                  className="py-4 h-[400px] text-center">
                  No Customers
                </td>
              </tr>
            ) : (
              reportedLeadsData.map((lead) => (
                <tr
                  key={lead.id}
                  // onClick={() => navigate(`${lead.id}`)}
                  className="border-b text-[15px]   leading-[23px] last:border-b-0">
                  {/* <td
                    onClick={(e) => e.stopPropagation()}
                    className="py-4 text-center">
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        className="w-[18px] h-[18px]"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => handleSelect(lead.id)}
                      />
                    </div>
                  </td> */}
                  <td className="py-4 text-center">{lead.id}</td>
                  <td className="py-4 text-center">{lead.name}</td>
                  <td className="py-4 text-center">{lead.company}</td>
                  <td className="py-4 text-center">{lead.phone}</td>
                  <td className="py-4 text-center">{lead.source}</td>
                  <td className="py-4 text-center">
                    <div className="w-full flex relative justify-center">
                      <img
                        ref={(el) => (leadIconRefs.current[lead.id] = el)}
                        src={icon}
                        onMouseEnter={() => setShowLead(lead.id)}
                        onMouseLeave={() => setShowLead(null)}
                        alt="user icon"
                        className="lead-icon w-8 h-8 cursor-pointer rounded-full"
                      />
                      {showLead === lead.id && (
                        <div className="absolute z-10 bg-white text-primary rounded-card border w-[150px] -top-[30px]">
                          {lead.assigned}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 text-center text-gray-800">
                    {lead.last_contact}
                  </td>
                  {lead.status && (
                    <td className="py-4 text-center">
                      <span className="bg-[#FFDFDF69] text-[#B70000] border border-[#B70000] text-xs font-medium px-3 py-[1px] rounded-[4px]">
                        {lead.status}
                      </span>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-auto">
        <TableFooter
          loading={loading}
          next={nextpage}
          previous={previouspage}
          from={pagination.from}
          to={pagination.to}
          currentPage={pagination.currentPage}
          totalPages={pagination.lastPage}
          total={pagination.total}
        />
      </div>

      {/* <LeadReassignModal
        reAssign={handleReAssignLead}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </div>
  );
};

export default ReportedLeadsTable;
