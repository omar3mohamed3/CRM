import { useRef, useState } from "react";
import Hashtag from "../../components/Hashtag";

import TeamsTable from "../../components/Teams/TeamsTable";

import AddTeam from "../../components/Teams/AddTeam";
import BulkBar from "../Items/BulkBarWithDispatch";
import {
  deleteTeamsBulk,
  fetchTeams,
  setSearch,
} from "../../Store/teamsSlice/teamsSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

/* Make Team With redux */

const Teams = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const componentRef = useRef();
  const { selectedTeams, pagination, search } = useSelector(
    (state) => state.teams
  );

  // Delete Bulk of Leads
  const deleteBulk = () => {
    //Guard
    if (selectedTeams.length !== 0) {
      dispatch(deleteTeamsBulk(selectedTeams))
        .unwrap()
        .then(() => {
          toast.success(`Deleted Teams Successfully`);
          // Refetch teams after deletion
          dispatch(
            fetchTeams({ page: pagination.currentPage, search: search })
          );
        })
        .catch((error) => {
          toast.error(`Failed to delete team: ${error.message}`);
        });
    } else {
      toast.error("No Lead to delete ");
    }
  };

  const searchInput = (values) => {
    dispatch(setSearch(values.search));
  };

  return (
    <div>
      <Hashtag># Teams</Hashtag>
      <BulkBar
        withOutImport={true}
        item="Team"
        searchInput={searchInput}
        deleteBulk={deleteBulk}
        withAssign={false}
        componentRef={componentRef}
        setIsModalOpen={() => setShowModal((open) => !open)}
      />
      <AddTeam
        componentRef={componentRef}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <div className=" mt-2">
        <TeamsTable componentRef={componentRef} />
      </div>
    </div>
  );
};

export default Teams;
