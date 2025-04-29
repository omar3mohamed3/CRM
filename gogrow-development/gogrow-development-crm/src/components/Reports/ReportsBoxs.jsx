import React from "react";
import icon1 from "/arrowup.png";
import icon2 from "/arrowup1.png";
import icon3 from "/arrowup2.png";
import icon4 from "/arrowup3.png";
import CardLayout from "../CardLayout";
import ReportBox from "./ReportBox";
import Hashtag from "../Hashtag";
import { useSelector } from "react-redux";

const ReportsBoxs = () => {
  const { reportedChartsData } = useSelector((state) => state.reportedCharts);

  return (
    <CardLayout>
      <Hashtag># Reports</Hashtag>
      <div className=" grid grid-cols-4 gap-3 ">
        <ReportBox
          mainText={reportedChartsData.number_of_leads}
          subText="Lead Created"
          image={icon1}
        />
        <ReportBox
          mainText={reportedChartsData.converted_leads_count}
          subText="Converted Lead"
          image={icon2}
        />
        <ReportBox
          mainText={reportedChartsData.total_sales}
          subText="Total Sales"
          image={icon3}
          color="blue"
        />
        <ReportBox
          mainText={reportedChartsData.total_failed_value}
          subText="Losted Leads"
          image={icon4}
          color="blue"
        />
      </div>
    </CardLayout>
  );
};

export default ReportsBoxs;
