import Hashtag from "../../components/Hashtag";
import { useParams } from "react-router-dom";
import InvoiceSales from "../../components/Invoice/InvoiceSales";
import CardLayout from "../../components/CardLayout";
import TeamInfoForm from "../../components/Teams/TeamInfoForm";

import TeamTarget from "../../components/Teams/TeamTarget";
import { useEffect, useState } from "react";
import AddTeamTarget from "./AddTeamTarget";
import { useDispatch, useSelector } from "react-redux";
import { openTeamTargetModal } from "../../Store/teamTargetSlice/teamTargetSlice";
import {
  clearTeamDetail,
  fetchTeamChartData,
  fetchTeamDetail,
} from "../../Store/teamsSlice/teamDetailSlice";
import Loader from "../../components/Layout/Loader";
import TeamSalesChart from "../../components/Teams/TeamSalesChart";

const Team = () => {
  const { id: teamId } = useParams(); // Get team ID from URL
  const dispatch = useDispatch();
  const { team, loadingTeam, error } = useSelector((state) => state.teamDetail);

  useEffect(() => {
    if (teamId) {
      dispatch(clearTeamDetail());
      dispatch(fetchTeamDetail(teamId)); // Fetch team details
      dispatch(fetchTeamChartData(teamId)); // Fetch team details
    }
  }, [dispatch, teamId]);

  const [editTeam, setEditTeam] = useState(null);

  const addTarget = () => {
    dispatch(openTeamTargetModal());
  };

  if (loadingTeam) return <Loader />;
  return (
    <div>
      <div className=" flex justify-between items-center">
        <Hashtag># Teams #{teamId}</Hashtag>
        <button
          onClick={addTarget}
          className="  my-2  py-1  px-8 rounded text-white bg-[#2799df] text-[15px] leading-[23px]">
          Add Team Targat
        </button>
      </div>
      {/* Team Rate Graph */}
      <CardLayout>
        <TeamSalesChart />
      </CardLayout>

      <div className=" my-2">
        <Hashtag># Teams #{teamId} - Info</Hashtag>
      </div>

      {/* Team Info */}
      <TeamInfoForm />
      {/* Target Modale */}
      <AddTeamTarget />
      {/*  Team Target */}
      <TeamTarget />
    </div>
  );
};

export default Team;
