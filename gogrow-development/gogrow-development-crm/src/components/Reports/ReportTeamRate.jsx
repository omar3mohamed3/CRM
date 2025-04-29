import CardLayout from "../CardLayout";
import MinChartLine from "../Dashboard/MinCharLine";
import { ImRadioUnchecked } from "react-icons/im";
import { LineChart } from "../Dashboard/SalesChart";
import { useSelector } from "react-redux";

const ReportTeamRate = ({
  age = "Last Month",
  title = "Team",
  first = "Target",
  second = "Achived",
  third = "losses",
}) => {
  const { reportedChartsData } = useSelector((state) => state.reportedCharts);
  const total_target = reportedChartsData?.target_data?.map(
    (lead) => lead.total_target
  );
  const total_achieved = reportedChartsData?.target_data?.map(
    (lead) => lead.total_achieved
  );
  const difference = reportedChartsData?.target_data?.map(
    (lead) => lead.difference
  );

  const datalist = [
    {
      label: "Target",
      data: total_target,
      borderColor: "#059A59",
      backgroundColor: "transparent", // Remove background color
      fill: false, // Disable fill to remove the area under the line
      tension: 0.4, // Make the line smooth
    },
    {
      label: "Commitment",
      data: total_achieved,
      borderColor: "#FF425E",
      backgroundColor: "transparent", // Remove background color
      fill: false, // Disable fill to remove the area under the line
      tension: 0.4, // Make the line smooth
    },
    {
      label: "losses",
      data: difference,
      borderColor: "#292B2E",
      backgroundColor: "transparent", // Remove background color
      fill: false, // Disable fill to remove the area under the line
      tension: 0.4, // Make the line smooth
    },
  ];

  return (
    <CardLayout>
      <div className="grid grid-cols-1  flex-grow ">
        <div className=" min-w-20">
          <span className=" font-bold  block text-[18px]   ">{title} Rate</span>
          <span className="   font-normal block mb-2 text-[15px]">
            All Months
          </span>
        </div>
        <div>
          <MinChartLine
            datasets={datalist}
            height=" h-[150px]"
          />
        </div>
        <div className=" flex gap-5">
          <div className="    flex flex-col  gap-1 justify-around  ">
            <div className=" flex gap-2 text-[10px] font-medium leading-[15px] items-center">
              <ImRadioUnchecked className=" text-[12px] text-[#009E3F]" />
              {first}
            </div>
            <div className=" flex gap-2 text-[10px] font-medium leading-[15px] items-center">
              <ImRadioUnchecked className=" text-[12px] text-[#FF425E]" />
              {second}
            </div>
            <div className=" flex gap-2 text-[10px] font-medium leading-[15px] items-center">
              <ImRadioUnchecked className=" text-[12px] text-[#212121]" />
              {third}
            </div>
          </div>
          <div className=" flex flex-col justify-around">
            <LineChart
              title={first}
              persentage={"100"}
              subColor={" bg-[#059A59]  "}
              mainColor={"  bg-[#00DB8940]"}
            />
            <LineChart
              title={second}
              persentage={
                reportedChartsData.total_of_total_target_achieved > 100
                  ? 100
                  : reportedChartsData.total_of_total_target_achieved
              }
              subColor={"   bg-[#FF425E]"}
              mainColor={"bg-[#707A8240] "}
            />
            <LineChart
              title={third}
              persentage={
                reportedChartsData.total_of_total_target_difference > 100
                  ? 100
                  : reportedChartsData.total_of_total_target_achieved
              }
              subColor={"  bg-[#292B2E] "}
              mainColor={" bg-[#707A8240] "}
            />
          </div>
        </div>
      </div>
    </CardLayout>
  );
};

export default ReportTeamRate;
