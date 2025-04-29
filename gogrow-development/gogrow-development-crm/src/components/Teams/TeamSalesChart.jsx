import { ImRadioUnchecked } from "react-icons/im";
import MinChartLine from "../Dashboard/MinCharLine";
import { LineChart } from "../Dashboard/SalesChart";
import { useSelector } from "react-redux";

const TeamSalesChart = ({
  age = "Last Month",
  title = "Team Target",
  first = "Paid",
  second = "Pending",
  third = "Cost",
}) => {
  const { chartData, loading, error } = useSelector(
    (state) => state.teamDetail
  );

  const datalist = [
    {
      label: "Total Target ",
      data: chartData?.total_target,
      borderColor: "#059A59",
      backgroundColor: "transparent", // Remove background color
      fill: false, // Disable fill to remove the area under the line
      tension: 0.4, // Make the line smooth
    },
    {
      label: "Total Achieved",
      data: chartData?.total_achieved,
      borderColor: "#FF425E",
      backgroundColor: "transparent", // Remove background color
      fill: false, // Disable fill to remove the area under the line
      tension: 0.4, // Make the line smooth
    },
  ];

  return (
    <div className=" h-full  flex  ">
      <div className=" flex  gap-4 flex-col h-full justify-between">
        <div className=" min-w-20">
          <span className=" font-bold  block   ">{title} Rate</span>
          {/* <span className="   font-normal block mb-2 text-[15px]">{age}</span> */}
        </div>

        <div className="  mt-2   ">
          <div className=" flex gap-2 text-[10px] font-medium leading-[15px] items-center">
            <ImRadioUnchecked className=" text-[12px] text-[#009E3F]" />
            Total Target
          </div>
          <div className=" flex gap-2 text-[10px] font-medium leading-[15px] items-center">
            <ImRadioUnchecked className=" text-[12px] text-[#FF425E]" />
            Total Achieved
          </div>
          {/* <div  className=" flex gap-2 text-[10px] font-medium leading-[15px] items-center">
            <ImRadioUnchecked className=" text-[12px] text-[#212121]" />
            {third}
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-2  flex-grow ">
        <div className=" px-4 ">
          <MinChartLine
            datasets={datalist}
            height=" h-[90px]"
          />
        </div>
        <div className=" flex flex-col justify-around">
          {/* <LineChart
            title={first}
            persentage={"25"}
            subColor={" bg-[#059A59]  "}
            mainColor={"  bg-[#00DB8940]"}
          /> */}
          <LineChart
            title={"Average Percentage"}
            persentage={chartData?.average_percentage}
            subColor={"   bg-[#FF425E]"}
            mainColor={"bg-[#707A8240] "}
          />
          {/* <LineChart
            title={third}
            persentage={"18"}
            subColor={"  bg-[#292B2E] "}
            mainColor={" bg-[#707A8240] "}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default TeamSalesChart;
