import NormalFont from "../NormalFont";
import CardHeader from "../CardHeader";
import MainChart from "./MainChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchLeadStatistics } from "../../Store/DashBoard/leadStatisticsSlice";

const MainCard = () => {
  const { summary, loading, error } = useSelector((state) => state.dashboard);
  const [year, setYear] = useState(new Date().getFullYear());
  // Sample data for the chart

  const dispatch = useDispatch();
  const {
    statistics,
    loading: loadingLead,
    error: errorLead,
  } = useSelector((state) => state.leadStatistics);

  // Filter With  Years
  useEffect(() => {
    dispatch(fetchLeadStatistics({ year }));
  }, [dispatch, year]);

  const datasets = [
    {
      label: "converted",
      data: statistics?.converted_customers,
      borderColor: "#FF425E",
      backgroundColor: "#FF425E",
      fill: true,
      tension: 0.4, //Make line smoth
    },
    {
      label: "Processings",
      data: statistics?.leads_in_processing,
      borderColor: "#c7c7c9",
      backgroundColor: "#c7c7c9",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Losted",
      data: statistics?.lost_leads,
      borderColor: "#4066FF",
      backgroundColor: "#4066FF",
      fill: true,
      tension: 0.4,
    },
  ];

  return (
    <div className="  bg-white  shadow-card rounded-card">
      {/* Header Section */}
      <div className=" pt-[19px] px-[36px] pb-0">
        {/* <CardHeader>Congratulations Mike</CardHeader>
        <NormalFont>You have done 38% more sales</NormalFont> */}
      </div>

      {/* Orders Summary Section */}
      <div className="grid px-[36px] pt-0 grid-cols-1 my-[20px] gap-4">
        <OrderSummary
          count={summary?.converted_customers}
          label="Lead"
          status="Leads converted to customer"
          color="bg-[#FF425E] "
        />
        <OrderSummary
          count={summary?.leads_in_processing}
          label="lead"
          status="Processings"
          color="bg-[#c7c7c9]  "
        />
        <OrderSummary
          count={summary?.lost_leads}
          label="Lead"
          status="Losted Leads"
          color="bg-[#4066FF] "
        />
      </div>

      {/* Chart Section */}
      <MainChart
        year={year}
        setYear={setYear}
        datasets={datasets}
        header={"Total Leads"}
        subHeader={"Monthly Order Updates"}
      />
    </div>
  );
};

const OrderSummary = ({ count, label, status, color }) => {
  return (
    <div className=" flex gap-1 items-center">
      <div className={`  rounded-full ${color} w-[46px] h-[46px] `} />
      <div>
        <div className=" flex items-center text-[18px] font-medium gap-1 text-primary">
          <div className="  font-bold">{count}</div>
          <div className=" ">{label}</div>
        </div>
        <NormalFont>{status}</NormalFont>
      </div>
    </div>
  );
};

export default MainCard;
