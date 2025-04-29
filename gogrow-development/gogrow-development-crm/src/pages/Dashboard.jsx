import CustomersChart from "../components/Dashboard/CustomersChart";
import LatestDealChart from "../components/Dashboard/LatestDealChart";
import MainCard from "../components/Dashboard/MainCard";
import CustomersOverViewTable from "../components/Dashboard/CustomersOverViewTable";

import PaymentChart from "../components/Dashboard/PaymentChart";
import Productchart from "../components/Dashboard/Productchart";
import SalesChart from "../components/Dashboard/SalesChart";
import TeamsTable from "../components/Dashboard/TeamsTable";
import Hashtag from "../components/Hashtag";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardSummary } from "../Store/DashBoard/dashboardSlice";
import { useEffect } from "react";
import Loader from "../components/Layout/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Handle Load Dashboard Request
  const { summary, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="   h-full   overflow-x-hidden  pb-10">
      <Hashtag># Dashboard</Hashtag>
      <div className="grid grid-cols-2 gap-3    ">
        {/* Main Card */}

        <MainCard />

        {/* 4 Cards */}
        <div className=" grid grid-rows-2 grid-cols-2 gap-x-3 gap-y-[11px]">
          <PaymentChart deals_by_month={summary?.deals_by_month} />
          <Productchart />
          <LatestDealChart
            total_target_and_achieved={summary?.total_target_and_achieved}
            team_targets_achieved={summary?.team_targets_achieved}
          />
          <CustomersChart canceled_customers={summary?.canceled_customers} />
        </div>
      </div>
      <div className="grid grid-cols-12 mt-4 gap-3">
        {/* Table */}
        <div className="  col-span-8">
          <TeamsTable />
        </div>
        {/* Sales Rate Chart  */}
        <div className=" h-full col-span-4">
          <SalesChart teamsTargets={summary?.team_targets_rate} />
        </div>
      </div>
      <div className=" pt-4  pb-1">
        <CustomersOverViewTable />
      </div>
    </div>
  );
};

export default Dashboard;
