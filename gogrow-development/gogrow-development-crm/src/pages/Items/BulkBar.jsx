import { useEffect, useRef, useState } from "react";
import { FaArrowsRotate, FaPlus } from "react-icons/fa6";
import { TfiSearch } from "react-icons/tfi";

import ReactToPrint from "react-to-print";

const BulkBar = ({
  componentRef,
  item = "Service",
  setIsModalOpen: setAddModal,
}) => {
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
    <div className="bg-white rounded-lg   w-full shadow-md p-2">
      <div className=" flex justify-between items-center">
        <div className=" flex gap-2 items-center">
          {/* <select className=" text-center border rounded-lg border-borderGray ">
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
                className=" flex gap-1 border-borderGray items-center   px-1 py-[1px] border rounded-l-lg">
                Export
              </button>
              {toggleImport && (
                <div className=" z-20  absolute top-10 text-center bg-white rounded-[8px] shadow-card  border  py-1">
                  <button className=" hover:bg-gray-100 w-full px-2">
                    EXC
                  </button>
                  <button className=" hover:bg-gray-100 w-full px-2">
                    CSV
                  </button>
                  <button className=" hover:bg-gray-100 w-full px-2">
                    DPF
                  </button>
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
              className=" flex gap-1 border-borderGray items-center mr-3 px-1 py-[1px] border  rounded-r-lg">
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
            className="w-[180px] p-1 pl-10 placeholder:text-primary bg-white rounded-full  border-borderGray border   focus:outline-none"
          />
          <TfiSearch className="absolute left-3 text-gray-400" />
          {/* Add Service - Product - Units */}
          <button
            onClick={() => {
              setAddModal(true);
            }}
            className=" text-white rounded-[18px]  flex gap-3 items-center  bg-customBlue py-1 px-3">
            <FaPlus /> Add New {item}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkBar;
