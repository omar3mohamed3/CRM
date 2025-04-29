import { LuDownload } from "react-icons/lu";
import { TbArrowsExchange } from "react-icons/tb";
import { TfiSearch } from "react-icons/tfi";

const InvoiceTableHead = () => {
  return (
    <div className=" flex mb-1 justify-between items-center">
      <div className=" flex  gap-1 items-center">
        <div className="relative   flex items-center">
          <input
            type="text"
            placeholder="Try to Searching..."
            className="w-[180px] text-[11px] p-1 py-2 pl-10 placeholder:text-primary bg-white rounded-[8px]  border-borderGray border   focus:outline-none"
          />
          <TfiSearch className="absolute left-3 text-gray-400" />
        </div>
        <button className=" bg-[#1492E6] font-medium text-white rounded-[8px] flex gap-3 px-3 py-2 text-[11px]">
          Export Pdf <LuDownload className=" text-[14px]" />
        </button>
      </div>
      <button className=" border-borderGray border  bg-white font-medium  text-primary rounded-[8px] flex gap-3 px-3 py-2 text-[11px]">
        <TbArrowsExchange className=" rotate-90 text-[14px]" />
        Sort by
      </button>
    </div>
  );
};

export default InvoiceTableHead;
