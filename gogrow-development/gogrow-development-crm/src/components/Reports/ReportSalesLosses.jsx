import { useSelector } from "react-redux";
import CardLayout from "../CardLayout";
import ColumnChart from "../ModulesControl/Sales/ColumnChart";

const ReportSalesLosses = () => {
  const { reportedChartsData } = useSelector((state) => state.reportedCharts);
  const converted = reportedChartsData?.monthly_data?.map(
    (lead) => lead.converted_leads
  );
  const lead_losses = reportedChartsData?.monthly_data?.map(
    (lead) => lead.lead_losses
  );

  const dataset = [
    {
      label: "Converted",
      backgroundColor: "#9BD052",
      data: converted,
    },
    {
      label: "Lost",
      backgroundColor: "#F62E2E",
      data: lead_losses,
    },
  ];
  return (
    <CardLayout>
      <div className="flex items-center justify-between  ">
        <div>
          <span className=" font-bold  block text-[18px]   ">
            Converted & Losted Leads
          </span>
          <span className="   font-normal block mb-2 text-[15px]">
            All Months
          </span>
        </div>
        <div className="relative inline-block"></div>
      </div>
      <ColumnChart
        height="min-h-[280px]"
        dataset={dataset}
      />
    </CardLayout>
  );
};

export default ReportSalesLosses;
