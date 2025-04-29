import { FaPlus } from "react-icons/fa";
import { TfiSearch } from "react-icons/tfi";
import { Link } from "react-router-dom";

const ModuleHeader = ({
  title = "Add New Modules",
  icon = <FaPlus />,
  to = "#",
}) => {
  return (
    <div className=" flex   mt-2  gap-3  items-center        ">
      {/* <div className=" flex justify-between shadow-card items-center px-12 bg-white py-3  rounded-card"> */}
      <Link
        to="addlead"
        className=" text-white rounded-[8px]  flex gap-3 items-center  bg-customBlue py-1 px-3">
        <FaPlus /> Add New Leed
      </Link>
      <Link
        to="importleads"
        className=" text-white rounded-[8px]  flex gap-3 items-center  bg-customBlue py-1 px-3">
        <FaPlus /> Import Leads
      </Link>
      {/* Middle Section */}
      {/* <div className="relative mr-5  flex items-center">
        <input
          type="text"
          placeholder="Try to Searching..."
          className="w-[180px] p-1 pl-10 placeholder:text-primary bg-white rounded-full  border-borderGray border   focus:outline-none"
        />
        <TfiSearch className="absolute left-3 text-gray-400" />
      </div> */}
    </div>
  );
};

export default ModuleHeader;
