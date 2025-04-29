import React, { useEffect, useRef, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TableFooter from "../TableFooter";
import {
  deleteTeam,
  fetchTeams,
  setNextTeamPage,
  setPreviousTeamPage,
  toggleAllTeamsSelection,
  toggleTeamsSelection,
} from "../../Store/teamsSlice/teamsSlice";
import CustomersIcons from "../CustomersIcons";
import Loader from "../Layout/Loader";
import { formatNumber } from "../../Url/url";
import LeadReassignModal from "../Leads/LeadReassignModal";
import toast from "react-hot-toast";
import { setNextLeadPage } from "../../Store/leadsSlice/leadsSlice";

const TeamsTable = ({ componentRef }) => {
  const [showLead, setShowLead] = useState(null);
  const [showSetting, setShowSetting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedTeams, teams, loading, pagination, search } = useSelector(
    (state) => state.teams
  );

  useEffect(() => {
    dispatch(fetchTeams({ page: pagination?.currentPage, search: search }));
  }, [dispatch, pagination?.currentPage, search]);

  const handledeleteTeam = (team) => {
    dispatch(deleteTeam(team.id))
      .unwrap()
      .then(() => {
        toast.success(`Deleted Team "${team.team}" Successfully`);
        // Refetch teams after deletion
        dispatch(fetchTeams({ page: pagination.currentPage, search: search }));
      })
      .catch((error) => {
        toast.error(`Failed to delete team: ${error.message}`);
      });
  };

  // Refs for the elements
  const leadIconRefs = useRef([]);
  const settingButtonRefs = useRef([]);

  const columns = [
    "@",
    " # ",
    "Team",
    "ID",
    "Team Leader",
    "Members",
    "Target",
    "Deals",
    "Assigned",
    "Created",
    "",
  ];

  const tableData = teams.map((team) => ({
    count: team.sale_team_members.length,
    team: team.team_name,
    id: team.id,
    teamLeader: team.team_lead_name,
    member: team.sale_team_members.map((member) => ({
      id: member.id,
      name: member.name,
      image: "image",
    })),
    // [
    //   { id: 1, name: "Ahmed Nagy", image: "image" },
    //   { id: 2, name: "Ahmed Nagy", image: "image" },
    //   { id: 3, name: "Ahmed Nagy", image: "image" },
    //   { id: 4, name: "Ahmed Nagy", image: "image" },
    //   { id: 5, name: "Ahmed Nagy", image: "image" },
    // ]
    target: team.target,
    deals: team.number_of_deals,
    assigned: team.assigned_to,
    created: team.created_at,
  }));

  const handleSelectAll = () => {
    const allIds = tableData.map((row) => row.id);
    dispatch(toggleAllTeamsSelection(allIds));
  };

  const handleSelect = (id) => {
    dispatch(toggleTeamsSelection(id));
  };

  const handleClickOutside = (event) => {
    // Check if click is outside of any lead icon
    if (
      !leadIconRefs.current.some((ref) => ref && ref.contains(event.target))
    ) {
      setShowLead(null);
    }
    // Check if click is outside of any setting button
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

  const nextpage = () => {
    dispatch(setNextTeamPage());
  };

  const previouspage = () => {
    dispatch(setPreviousTeamPage());
  };

  return (
    <div
      ref={componentRef}
      className="bg-white rounded-[18px]  mb-1  shadow-card p-6">
      <div className="overflow-y-auto  flex flex-col relative min-h-[550px]">
        <div className="overflow-y-auto flex-grow">
          <table className="w-full ">
            <thead className="  ">
              <tr className="border-b ">
                {columns.map((col, index) => (
                  <th
                    key={col}
                    className={`${
                      index === 0 ? "text-left max-w-5 " : " text-left "
                    } pb-3 text-[16px]    leading-[30px] font-bold`}>
                    {index === 0 ? (
                      <div className=" flex justify-left">
                        <input
                          className=" w-[18px]  h-[18px]"
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedTeams?.length === tableData.length}
                        />
                      </div>
                    ) : (
                      col
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className=" ">
              {loading ? (
                <tr className=" h-full">
                  <td
                    colSpan={columns.length}
                    className="py-4 h-[400px] text-center">
                    <Loader />
                  </td>
                </tr>
              ) : tableData.length === 0 ? (
                <tr className=" h-full">
                  <td
                    colSpan={columns.length}
                    className="py-4 h-[400px] text-center">
                    No Teams
                  </td>
                </tr>
              ) : (
                tableData.map((row, index) => (
                  <tr
                    key={index}
                    onClick={() => navigate(`/teams/${row.id}`)}
                    className="border-b text-[15px] text-primary font-medium cursor-pointer leading-[23px] last:border-b-0">
                    <td
                      onClick={(e) => e.stopPropagation()}
                      className="py-4 text-left">
                      <div className="flex max-w-5 justify-center items-center">
                        <input
                          type="checkbox"
                          className=" w-[18px] h-[18px]"
                          checked={selectedTeams?.includes(row.id)}
                          onChange={() => handleSelect(row.id)}
                        />
                      </div>
                    </td>
                    <td className="py-4 text-left">
                      {index +
                        1 +
                        (pagination.currentPage - 1) * pagination.perPage}
                    </td>
                    <td className="py-4 text-left">{row.team}</td>
                    <td className="py-4 text-left">#{row.id}</td>
                    <td className="py-4 text-left">{row.teamLeader}</td>
                    {/* <td className="py-4 text-left">{row.member}</td> */}
                    <td
                      onClick={(e) => e.stopPropagation()}
                      className="py-4 cursor-default text-left">
                      <CustomersIcons
                        path="users"
                        members={row.member}
                      />
                    </td>
                    <td className="py-4 text-left">
                      {formatNumber(row.target)}
                    </td>
                    <td className="py-4 text-left">{row.deals}</td>

                    <td className="py-4 text-left">
                      {row?.assigned?.map((item, index) => (
                        <div key={index}>{item}</div>
                      ))}
                    </td>
                    <td className="py-4 text-left">{row.created}</td>

                    {row.status && (
                      <td className="py-4 text-left">
                        <span className="bg-[#FFDFDF69] text-[#B70000] border border-[#B70000] text-xs font-medium px-3 py-[1px] rounded-[4px]">
                          {row.status}
                        </span>
                      </td>
                    )}
                    <td
                      onClick={(e) => e.stopPropagation()}
                      ref={(el) => (settingButtonRefs.current[row.id] = el)}
                      className="py-4 relative text-center">
                      <div className="">
                        <button
                          onClick={() => setShowSetting(row.id)}
                          className="setting-button text-gray-400 hover:text-gray-600">
                          <GoKebabHorizontal
                            className="text-[16px] rotate-90"
                            size={16}
                          />
                        </button>
                        {showSetting === row.id && (
                          <div className="z-10 absolute -left-20 top-3 text-center bg-white rounded-[8px] shadow-card border py-1">
                            <button
                              onClick={() => handledeleteTeam(row)}
                              className="hover:bg-red-500   hover:text-white w-full px-5">
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
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

        {/* Bulk Action Modal */}
        {/* <LeadReassignModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        /> */}
      </div>
    </div>
  );
};

export default TeamsTable;
