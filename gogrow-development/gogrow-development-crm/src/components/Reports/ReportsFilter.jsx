import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch to dispatch actions
import CardLayout from "../CardLayout";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css"; // You can use other Flatpickr themes
import SingleSelectFilterDropdown from "../../pages/Leads/SingleSelectFilterDropdown";
import {
  fetchAssignedUsers,
  fetchAssignedUsersEditTeam,
} from "../../Store/leadsSlice/AssignedUsersSlice";
import { typesList } from "../../pages/Leads/FakeLists";
import { setFilters } from "../../Store/reportsSlice/reportedLeadsTable";
import { fetchAllTeams } from "../../Store/teamsSlice/teamsSlice";
// Adjust the import path as necessary

const ReportsFilter = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [teamId, setTeamId] = useState();
  const [selectedTeam, setSelectedTeam] = useState(null); // State for selected team
  const [selectedMember, setSelectedMember] = useState(null); // State for selected team member
  const { users } = useSelector((state) => state.assignedUsers);
  const { allTeams } = useSelector((state) => state.teams);

  /// Filter users based on the selected team
  // All => all Users and Teams
  const usersList = teamId ? [{ id: "", label: "All" }, ...users] : [];
  const teamsList = [{ id: "", label: "All" }, ...allTeams];
  useEffect(() => {
    dispatch(fetchAllTeams());
  }, [dispatch]);

  useEffect(() => {
    if (teamId) {
      dispatch(fetchAssignedUsersEditTeam(teamId));
    }
  }, [dispatch, teamId]);
  // Handler for date change
  // const handleDateChange = (selectedDates) => {
  //   const formattedDates = selectedDates.map(
  //     (date) => date.toISOString().split("T")[0]
  //   );

  //   setDateRange(formattedDates);
  //   dispatch(
  //     setFilters({ date_from: formattedDates[0], date_to: formattedDates[1] })
  //   ); // Dispatch the date filter
  // };

  // Handler for team selection
  const handleTeamChange = (value) => {
    setSelectedTeam(value);
    setTeamId(value);
    dispatch(setFilters({ teamId: value })); // Dispatch the team filter
  };

  // Handler for member selection
  const handleMemberChange = (value) => {
    setSelectedMember(value);
    dispatch(setFilters({ memberId: value })); // Dispatch the member filter
  };

  return (
    <CardLayout>
      <div className="flex justify-between">
        <div className="text-[16px] leading-[23px] font-bold">Sales</div>
        <div className="flex gap-4 items-center">
          <div>
            <SingleSelectFilterDropdown
              filters={usersList} // Replace with actual team member list
              placeholder={"Select Member"}
              width="md:w-full md:max-w-full min-w-[181px] max-w-[270px]"
              padding={"py-[2px] px-[2px]"}
              setFieldValues={handleMemberChange} // Add onChange to handle member selection
            />
          </div>
          <div>
            <SingleSelectFilterDropdown
              filters={teamsList} // Replace with actual team list
              placeholder={"Select Team"}
              width="md:w-full md:max-w-full min-w-[181px] max-w-[270px]"
              padding={"py-[2px] px-[2px]"}
              setFieldValues={handleTeamChange} // Add onChange to handle team selection
            />
          </div>
          {/* <div>
            <Flatpickr
              value={dateRange}
              onChange={handleDateChange} // Use the date change handler
              options={{
                mode: "range", // Enables date range mode
                dateFormat: "Y-m-d", // Date format, e.g., 2023-09-09
              }}
              className="input border border-borderGray rounded-lg w-fit min-w-[200px] text-center"
            />
          </div> */}
        </div>
      </div>
    </CardLayout>
  );
};

export default ReportsFilter;
