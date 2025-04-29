import { useSelector } from "react-redux";
import MinCard from "./MinCard";
  import MultiSeriesRadialBarChart  from   "./MultiSeriesPieChart" // Use radial bar chart component
import toast from "react-hot-toast";

const Productchart = () => {
  const { summary } = useSelector((state) => state.dashboard);

  // Extract total and lead statuses
  const total = summary?.total_leads || 0;

  const leadStatuses = summary?.lead_statuses || [];

  // Define a color palette to assign different colors for each lead status
  const colorPalette = ["#F0B74C", "#F06352", "#3BB6CA", "#91CC75", "#5470C6"];

  // Dynamically create series and labels for the radial bar chart
  const datasets = leadStatuses?.map((status) => ({
    label: status.status_name,
    data: [status.leads_count], // Only use the leads count for each status
    color: colorPalette[leadStatuses.indexOf(status) % colorPalette.length], // Assign a color for each status
  }));

  return (
    <MinCard header="Status">
      <div className="">
        {/* Use MultiSeriesRadialBarChart instead of PieChart */}
        <MultiSeriesRadialBarChart datasets={datasets} />
      </div>
    </MinCard>
  );
};

export default Productchart;
