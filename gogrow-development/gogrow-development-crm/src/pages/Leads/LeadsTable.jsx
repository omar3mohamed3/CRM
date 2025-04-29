import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLeadSelection,
  toggleAllLeadsSelection,
  fetchLeads,
  deleteLead,
  setNextLeadPage,
  setPreviousLeadPage,
  updateLead,
} from "../../Store/leadsSlice/leadsSlice.js";
import { useNavigate } from "react-router-dom";
import { GoKebabHorizontal } from "react-icons/go";
import icon from "/images.png";
import LeadReassignModal from "../../components/Leads/LeadReassignModal.jsx";
import TableFooter from "../../components/TableFooter.jsx";
import Loader from "../../components/Layout/Loader.jsx";
import toast from "react-hot-toast";

const LeadsTable = ({ componentRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Modal
  const [showLead, setShowLead] = useState(null);
  const [showSetting, setShowSetting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Lead ID to Reassign to user
  const [reAssignLeadID, setReAssignLeadID] = useState();

  //Datea From  LeadsSLice
  const { selectedLeads, leadsData, loading, pagination, filters } =
    useSelector((state) => state.leads);

  const leadIconRefs = useRef([]);
  const settingButtonRefs = useRef([]);

  // Fetch Leads With Filter or not
  useEffect(() => {
    dispatch(fetchLeads({ ...filters, page: pagination.currentPage }));
  }, [dispatch, pagination.currentPage, filters]);

  const handleSelectAll = () => {
    const allIds = leadsData.map((lead) => lead.id);
    dispatch(toggleAllLeadsSelection(allIds));
  };

  const handleSelect = (id) => {
    dispatch(toggleLeadSelection(id));
  };

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
    "@",
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

  const handledeleteLead = (lead) => {
    dispatch(deleteLead(lead.id)).then(() =>
      toast.success(`Delete Lead ${lead.name} Successfully`)
    );
  };

  const handleReAssignLead = (changedData) => {
    dispatch(
      updateLead({ leadId: reAssignLeadID, leadData: changedData })
    ).then(() => {
      setReAssignLeadID(null);
      setIsModalOpen(false);
    });
  };


  const nextpage = () => {
    dispatch(setNextLeadPage());
  };

  const previouspage = () => {
    dispatch(setPreviousLeadPage());
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
                  {index === 0 ? (
                    <div className=" flex justify-center">
                      <input
                        className="w-[18px] h-[18px]"
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedLeads.length === leadsData.length}
                      />
                    </div>
                  ) : (
                    col
                  )}
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
            ) : leadsData.length === 0 ? (
              <tr className=" h-full">
                <td
                  colSpan={columns.length}
                  className="py-4 h-[400px] text-center">
                  No Leads
                </td>
              </tr>
            ) : (
              leadsData.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => navigate(`${lead.id}`)}
                  className="border-b text-[15px] cursor-pointer leading-[23px] last:border-b-0">
                  <td
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
                  </td>
                  <td className="py-4 text-center">{lead.id}</td>
                  <td className="py-4 text-center">{lead.customer}</td>
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
                  <td
                    onClick={(e) => e.stopPropagation()}
                    ref={(el) => (settingButtonRefs.current[lead.id] = el)}
                    className="py-4 relative text-center">
                    <button
                      onClick={() =>
                        setShowSetting(showSetting === lead.id ? null : lead.id)
                      }
                      className="setting-button text-gray-400 hover:text-gray-600">
                      <GoKebabHorizontal
                        className="text-[16px] rotate-90"
                        size={16}

          
                      />
                    </button>
                    {showSetting === lead.id && (
                      <div className="z-10 absolute -left-20 text-center bg-white rounded-[8px] shadow-card border py-1">
                        <button
                          onClick={() => {
                            setReAssignLeadID(lead.id);
                            setIsModalOpen(true);
                          }}
                          className="hover:bg-gray-100 w-full px-2">
                          ReAssign
                        </button>
                        <button
                          onClick={() => handledeleteLead(lead)}
                          className="hover:bg-red-500 hover:text-white w-full px-2">
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
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

      <LeadReassignModal
        reAssign={handleReAssignLead}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LeadsTable;
