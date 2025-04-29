import MinCard from "./MinCard";
import MinChartLine from "./MinCharLine";

const CustomersChart = ({ canceled_customers }) => {
  const datasets = [
    {
      label: "Customer",
      data: canceled_customers,
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: "transparent", // Remove background color
      fill: false, // Disable fill to remove the area under the line
      tension: 0.4, // Make the line smooth
    },
  ];
  return (
    <MinCard
      header="Canceled Customer"
      // subHeader="Last 7 days"
      // persentage="+26.0%"
      // count={"6.380"}
    >
      {/* Chart */}
      <div className=" flex flex-col  w-full gap-2">
        <MinChartLine datasets={datasets} />
      </div>
      {/* Footer */}
      <div>
        {/* Cash */}
        {/* <div className=" flex justify-between items-center">
          <div className=" flex  gap-2 items-center">
            <NormalFont>April 07 - April 14</NormalFont>
          </div>
          <NormalFont>6.380</NormalFont>
        </div> */}
        {/* Credit Card */}
        {/* <div className=" flex justify-between items-center">
          <div className=" flex  gap-2 items-center">
            <NormalFont>Last Week</NormalFont>
          </div>
          <NormalFont>4.298</NormalFont>
        </div> */}
      </div>
    </MinCard>
  );
};

export default CustomersChart;
