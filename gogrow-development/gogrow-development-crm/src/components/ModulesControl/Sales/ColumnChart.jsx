import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CardHeader from "../../CardHeader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ColumnChart = ({ height = "h-[66vh]", dataset }) => {
  const data = {
    labels: [
      "Jan",
      "Febr",
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
    datasets: dataset,
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: false,
          padding: 20,
          boxHeight: 20,
          boxWidth: 20,
          color: "#000",
          font: {
            size: 14,
            family: "Arial",
            weight: "bold",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${
              tooltipItem.dataset.label
            }: $${tooltipItem.raw.toLocaleString()}`,
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="w-full px-4 ">
      <div className={` bg-white flex justify-center  ${height}   `}>
        <Bar
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default ColumnChart;
