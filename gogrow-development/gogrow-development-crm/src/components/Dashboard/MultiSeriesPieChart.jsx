import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const MultiSeriesRadialBarChart = ({ datasets }) => {
  // Extract the series and labels from datasets
  const seriesData = datasets?.map((data) => data?.data[0]); // Array of raw values for each lead status
  const labels = datasets?.map((status) => status?.label); // Array of labels
  const colors = datasets?.map((data) => data?.color); // Color array

  // ApexCharts options for a multiple radial bar chart (without percentage)
  const options = {
    series: seriesData, // Use raw data
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '18px',
          },
          value: {
            fontSize: '16px',
            show: true, // Show the raw value instead of percentage
            formatter: function (val) {
              return Math.round(val)     // Show the exact value (round if necessary)
            },
          },
          total: {
            show: true,
            label: 'Total Leads',
            formatter: function () {
              // Return the sum of all series values
              return seriesData.reduce((acc, val) => acc + val, 0);
            },
          },
        },
        track: {
          show: true,
        },
      },
    },
    labels: labels, // Use dataset labels
    colors: colors, // Use colors assigned to each lead status
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };

  useEffect(() => {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [datasets]);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div id="chart" className="w-full flex justify-center items-center h-40"></div>
    </div>
  );
};

export default MultiSeriesRadialBarChart;
