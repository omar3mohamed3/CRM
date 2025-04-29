import ModuleHeader from "../../components/ModulesControl/Main/ModuleHeader";
import SalesChart from "../../components/Dashboard/SalesChart";
import Productchart from "../../components/Dashboard/Productchart";
import MainChart from "../../components/Dashboard/MainChart";
import ModulesControlTable from "../../components/ModulesControl/Main/ModulesControlTable";

const ModulesControl = () => {
  return (
    <div className="     h-full     ">
      {/* header */}
      <ModuleHeader />
      {/* Charts */}
      <div className=" grid grid-cols-12 gap-6 mt-6">
        {/* Main Chart */}
        <div className="  bg-white shadow-card rounded-card col-span-6">
          <MainChart header={"Performance Modules"} />
        </div>
        <div className=" col-span-6   gap-6  grid grid-cols-2">
          <SalesChart />
          <Productchart />
        </div>
      </div>
      {/* Table */}
      <div className="  mt-6">
        <ModulesControlTable />
      </div>
    </div>
  );
};

export default ModulesControl;
