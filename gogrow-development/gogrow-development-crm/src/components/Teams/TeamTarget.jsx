import CustomersIcons from "../CustomersIcons";
import NormalFont from "../NormalFont";
import CardHeader from "../CardHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  editTeamTarget,
  fetchTeamTarget,
  openTeamTargetModal,
  setEditTargetMonth,
} from "../../Store/teamTargetSlice/teamTargetSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatNumber } from "../../Url/url";

const TeamTarget = () => {
  const { id: teamId } = useParams();
  const dispatch = useDispatch();

  const { teamTarget, loading, error } = useSelector(
    (state) => state.teamTarget
  );

  useEffect(() => {
    dispatch(fetchTeamTarget(teamId));
  }, [dispatch, teamId]);

  const EditTarget = (item) => {
    dispatch(setEditTargetMonth(item)); // Data to edit
    dispatch(openTeamTargetModal()); // Open Modal
  };

  return (
    <div className=" p-4 shadow-card rounded-card   bg-white h-[350px]  overflow-y-auto my-2">
      {teamTarget.map((target) => (
        <div
          key={target.id}
          className=" border-b    py-2">
          <div className=" flex   items-center justify-between ">
            <div>
              <CardHeader>Target</CardHeader>
              <NormalFont>Month : {target.title}</NormalFont>
            </div>
            <button
              onClick={() => {
                EditTarget(target);

                // setEditTeam(item.id);
              }}
              className="   py-1  px-8 rounded text-white bg-[#2799df] text-[15px] leading-[23px]">
              Edit
            </button>
          </div>
          <div className=" flex flex-col  gap-2">
            <div className=" flex justify-between items-center text-[16px] 2xl:text-[19px] font-medium leading-[28px]">
              <div>{formatNumber(target.achieved_target)}</div>
              <div>{formatNumber(target.target)}</div>
            </div>
            <div className=" w-full h-1 bg-[#BFE0F6] relative rounded-full">
              <div
                className={` w-[${
                  (target.achieved_target / target.target) * 100
                }]  h-1 bg-[#0085DB] absolute top-0 rounded-full`}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <div className=" flex justify-between items-center"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamTarget;
