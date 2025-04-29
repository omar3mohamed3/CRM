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

const LineChart = ({
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
      label: "converted",
      data: [65, 59, 80, 81, 56, 55, 40, 12, 50, 36, 40, 10],
      borderColor: "#FF425E",
      backgroundColor: "#FF425E",
      fill: true,
      tension: 0.4, //Make line smoth
    },
    {
      label: "Processings",
      data: [28, 48, 40, 19, 86, 27, 90, 12, 20, 46, 10, 50],
      borderColor: "#c7c7c9",
      backgroundColor: "#c7c7c9",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Losted",
      data: [80, 30, 120, 12, 77, 55, 90, 22, 30, 66, 20, 40],
      borderColor: "#4066FF",
      backgroundColor: "#4066FF",
      fill: true,
      tension: 0.4,
    },
  ],
}) => {
  // Sample data for the chart
  const data = {
    labels: labels,
    datasets: datasets,
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat().format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="  bg-white   ">
      <div className="h-64">
        <Line
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default LineChart;
