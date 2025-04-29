import { useEffect, useRef } from "react";
import Hashtag from "../../components/Hashtag";
import ReportsFilter from "../../components/Reports/ReportsFilter";
import ReportsBoxs from "../../components/Reports/ReportsBoxs";
import ReportSalesLosses from "../../components/Reports/ReportSalesLosses";
import ReportTeamRate from "../../components/Reports/ReportTeamRate";

import ReportedLeadsTable from "./ReportedLeadsTable";
import { fetchReportedLeads } from "../../Store/reportsSlice/reportedLeadsTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportedCharts } from "../../Store/reportsSlice/reportsCharts";

const Reports = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.reportedLeads); // Get filters from state

  // Charts and Boxs filter with leads
  useEffect(() => {
    dispatch(
      fetchReportedCharts({
        teamId: filters.teamId,
        memberId: filters.memberId,
        // date_from: filters.date_from,
        // date_to: filters.date_to,
      })
    );
  }, [dispatch, filters]); // Re-fetch data when filters change

  // Table filter leads with filters
  // useEffect(() => {
  //  dispatch(
  //   fetchReportedLeads({
  //    page: 1, // Example: fetch first page
  //    teamId: filters.teamId,
  //   memberId: filters.memberId,
  // date_from: filters.date_from,
  // date_to: filters.date_to,
  //    })
  //  );
  // }, [dispatch, filters]); // Re-fetch data when filters change
  return (
    <div>
      {/* Boxs Section */}
      <Hashtag># Reports</Hashtag>
      <ReportsFilter componentRef={componentRef} />
      <div className=" my-2 ">
        <ReportsBoxs />
      </div>

      {/* Chart Section */}
      <div className=" my-2 grid grid-cols-2 gap-3 ">
        <ReportSalesLosses />
        <ReportTeamRate />
      </div>

      {/* Table Section */}
      <Hashtag># Converted Leads</Hashtag>
      <ReportedLeadsTable />
    </div>
  );
};

export default Reports;
