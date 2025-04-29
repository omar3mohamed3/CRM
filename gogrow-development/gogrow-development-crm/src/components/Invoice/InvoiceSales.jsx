import MinChartLine from "../../components/Dashboard/MinCharLine";
import { LineChart } from "../../components/Dashboard/SalesChart";
import { ImRadioUnchecked } from "react-icons/im";

const InvoiceSales = ({
  age = "Last Month",
  title = "Sales",
  first = "Paid",
  second = "Pending",
  third = "Cost",
}) => {
  return (
    <div className=" h-full  flex  ">
      <div className=" flex  gap-4 flex-col h-full justify-between">
        <div className=" min-w-20">
          <span className=" font-bold  block   ">{title} Rate</span>
          <span className="   font-normal block mb-2 text-[15px]">{age}</span>
        </div>

        <div className="    ">
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
      </div>
      <div className="grid grid-cols-2  flex-grow ">
        <div className=" px-4 ">
          <MinChartLine
            datasets={datalist}
            height=" h-[90px]"
          />
        </div>
        <div className=" flex flex-col justify-around">
          <LineChart
            title={first}
            persentage={"25"}
            subColor={" bg-[#059A59]  "}
            mainColor={"  bg-[#00DB8940]"}
          />
          <LineChart
            title={second}
            persentage={"20"}
            subColor={"   bg-[#FF425E]"}
            mainColor={"bg-[#707A8240] "}
          />
          <LineChart
            title={third}
            persentage={"18"}
            subColor={"  bg-[#292B2E] "}
            mainColor={" bg-[#707A8240] "}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceSales;

const datalist = [
  {
    label: "Paid ",
    data: [120, 40, 250, 20, 120, 1, 30, 50, 80, 20, 30, 40],
    borderColor: "#059A59",
    backgroundColor: "transparent", // Remove background color
    fill: false, // Disable fill to remove the area under the line
    tension: 0.4, // Make the line smooth
  },
  {
    label: "Pending",
    data: [60, 120, 40, 10, 120, 50, 80, 0, 10, 50, 90, 10],
    borderColor: "#FF425E",
    backgroundColor: "transparent", // Remove background color
    fill: false, // Disable fill to remove the area under the line
    tension: 0.4, // Make the line smooth
  },
  {
    label: "Cost",
    data: [10, 20, 30, 10, 80, 200, 40, 12, 80, 80, 80, 30],
    borderColor: "#292B2E",
    backgroundColor: "transparent", // Remove background color
    fill: false, // Disable fill to remove the area under the line
    tension: 0.4, // Make the line smooth
  },
];
