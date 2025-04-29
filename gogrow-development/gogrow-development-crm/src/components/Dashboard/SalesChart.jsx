import NormalFont from "../NormalFont";
import MinCard from "./MinCard";
import MinChartLine from "./MinCharLine";

const SalesChart = ({ teamsTargets }) => {
  const colors = [
    "rgba(75,192,192,1)",
    "rgba(255,99,132,1)",
    "rgba(54,162,235,1)",
    "rgba(255,206,86,1)",
    "rgba(153,102,255,1)",
    "rgba(255,159,64,1)",
  ];

  const datasets = teamsTargets?.map((team, index) => ({
    label: team.team_name,
    data: team.total_achieved,
    borderColor: colors[index % colors.length],
    backgroundColor: "transparent",
    fill: false,
    tension: 0.4,
    pointRadius: 0, // Remove bullets
  }));

  return (
    <MinCard header="Sales Rate">
      {/* Chart */}
      <div className="flex flex-col gap-2">
        <MinChartLine
          graph={true}
          datasets={datasets}
          height={"h-32"}
        />
      </div>
      {/* Footer */}
      <div>
        {/* Modules Sales */}
        <div className="flex flex-col gap-2">
          {teamsTargets?.map((team, index) => (
            <LineChart
              key={team.id}
              title={team.team_name}
              persentage={team.total_percentage.toFixed(0)}
              subColor={`bg-[${colors[index % colors.length]}]`}
              mainColor="bg-[#dbdee0]"
            />
          ))}
        </div>
      </div>
    </MinCard>
  );
};

export default SalesChart;

export const LineChart = ({ title, persentage, mainColor, subColor }) => {
  return (
    <div className="grid grid-cols-11 gap-4 justify-between items-center">
      <div className="col-span-3">
        <NormalFont>{title}</NormalFont>
      </div>
      <div
        className={`col-span-7 w-full h-1 ${mainColor} relative rounded-full`}>
        <div
          style={{ width: persentage + "%" }}
          className={`h-1 ${subColor} absolute top-0 rounded-full`}
        />
      </div>
      <NormalFont>{persentage}%</NormalFont>
    </div>
  );
};
