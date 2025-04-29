import { MdKeyboardArrowDown } from "react-icons/md";
import CardHeader from "../../components/CardHeader";
import ColumnChart from "../../components/ModulesControl/Sales/ColumnChart";
import NormalFont from "../../components/NormalFont";

const ModuleSales = () => {
  return (
    <div className="   w-full ">
      <div className=" shadow-card rounded-card      px-4 py-2   bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardHeader>Sales</CardHeader>
          </div>
          <button className="flex items-center px-2 py-1 rounded-full border space-x-2 text-gray-600">
            <div className=" ">March 2023</div>
            <MdKeyboardArrowDown />
          </button>
        </div>
        <ColumnChart />
      </div>
    </div>
  );
};

export default ModuleSales;
