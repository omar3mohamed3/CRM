import MinCard from "./MinCard";
import NormalFont from "../NormalFont";
import CustomersIcons from "../CustomersIcons";
import { formatNumber } from "../../Url/url";

const LatestDealChart = ({
  total_target_and_achieved,
  team_targets_achieved,
}) => {
  const total_target = total_target_and_achieved?.total_target;

  const total_achieved = total_target_and_achieved?.total_achieved;

  const members = team_targets_achieved?.slice(0, 6)?.map((team) => ({
    id: team.id,
    name: team.team_name,
  }));

  return (
    <MinCard
      header="Teams Target"
      // subHeader="Last 7 days"
      // persentage="86.5%"
    >
      {/* Chart */}
      <div className=" flex flex-col  gap-2">
        <div className=" flex justify-between items-center text-[16px] 2xl:text-[19px] font-medium leading-[28px]">
          <div>{formatNumber(total_achieved)}</div>
          <div>{formatNumber(total_target)}</div>
        </div>
        <div className=" w-full h-1 bg-[#BFE0F6] relative rounded-full">
          <div className="w-[30%] h-1 bg-[#0085DB] absolute top-0 rounded-full" />
        </div>
        {/* <NormalFont>Coupons Used: 18/22</NormalFont> */}
      </div>
      {/* Footer */}
      <div className=" flex flex-col gap-2">
        <NormalFont>Teams</NormalFont>
        <CustomersIcons
          path="teams"
          members={members}
        />
      </div>
    </MinCard>
  );
};

export default LatestDealChart;
