import React, { useEffect, useRef, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { TfiSearch } from "react-icons/tfi";
import ReactToPrint from "react-to-print";

const UserBulkAction = ({ componentRef }) => {
  const [toggleImport, setToggleImport] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const importButtonRef = useRef(null);

  const handleImport = () => {
    setToggleImport((prev) => !prev);
  };

  const handleBulkActions = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleClickOutside = (event) => {
    if (
      importButtonRef.current &&
      !importButtonRef.current.contains(event.target)
    ) {
      setToggleImport(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className=" flex justify-between text-[12px] py-2 px-4 items-center">
      <div className=" flex gap-2 items-center">
        {/* <select className=" text-center border rounded-[4px] border-borderGray ">
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={""}>All</option>
        </select> */}
        <div className=" flex  items-center">
          <div
            className=" relative"
            ref={importButtonRef}>
            <button
              onClick={handleImport}
              className=" flex gap-1 border-borderGray items-center   px-1 py-[1px] border rounded-l-[4px]">
              Export
            </button>
            {toggleImport && (
              <div className=" z-20  absolute top-10 text-center bg-white rounded-[8px] shadow-card  border  py-1">
                <button className=" hover:bg-gray-100 w-full px-2">EXC</button>
                <button className=" hover:bg-gray-100 w-full px-2">CSV</button>
                <button className=" hover:bg-gray-100 w-full px-2">DPF</button>
                <ReactToPrint
                  trigger={() => (
                    // <button className="hover:bg-white border border-borderGray p-1 bg-[#F2F2F2] rounded-[4px]">
                    //   <AiOutlinePrinter />
                    // </button>
                    <button className=" hover:bg-gray-100 w-full px-2">
                      Print
                    </button>
                  )}
                  content={() => componentRef.current}
                />
              </div>
            )}
          </div>
          {/* Open Bulk Change */}
          <button
            onClick={handleBulkActions}
            className=" flex gap-1 border-borderGray items-center mr-3 px-1 py-[1px] border  rounded-r-[4px]">
            <span className=" border-r-[1px] border-borderGray px-1">
              Bulk Actions
            </span>
            <FaArrowsRotate />
          </button>
        </div>
      </div>
      <div className="relative mr-5  flex gap-2 items-center">
        <input
          type="text"
          placeholder="Try to Searching..."
          className="w-[140px] p-1 pl-8 placeholder:text-primary bg-white rounded-[4px]  border-borderGray border   focus:outline-none"
        />
        <TfiSearch className="absolute left-3 text-gray-400" />
        {/* Add Service - Product - Units */}
      </div>
    </div>
  );
};

export default UserBulkAction;
