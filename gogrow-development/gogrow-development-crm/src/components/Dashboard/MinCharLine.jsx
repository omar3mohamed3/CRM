import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MinChartLine = ({
  height = "   h-28 ",
  graph = false,
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets = [
    {
      label: "",
      data: [10, 40, 80, 20, 120, 1, 30, 12, 100, 50, 60, 70],
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: "transparent", // Remove background color
      fill: false, // Disable fill to remove the area under the line
      tension: 0.4, // Make the line smooth
    },
  ],
}) => {
  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true, // Hide x-axis
      },
      y: {
        display: graph, // Hide y-axis
        ticks: {
          display: true, // Hide the numbers on the y-axis
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true, // Disable tooltips
      },
    },
  };

  return (
    <div className=" py-4 bg-white">
      <div className={`   ${height} `}>
        <Line
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default MinChartLine;
