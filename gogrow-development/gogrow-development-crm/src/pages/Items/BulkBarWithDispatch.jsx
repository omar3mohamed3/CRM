import { useEffect, useRef, useState } from "react";
import { FaArrowsRotate, FaPlus } from "react-icons/fa6";
import { TfiSearch } from "react-icons/tfi";

import ReactToPrint from "react-to-print";
import BulkActionModal from "../../components/Items/BulkActionsModal";
import { Field, Form, Formik } from "formik";

const BulkBar = ({
  withOutImport = false,
  deleteBulk = () => {},
  searchInput = () => {},
  withAssign = true,
  componentRef,
  item = "Service",
  setIsModalOpen: setAddModal,
  importPDF,
  importCSV,
  importXLSX,
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

  const onSubmit = (values) => {};

  return (
    <div className="bg-white rounded-lg   w-full shadow-md p-2">
      <div className=" flex justify-between items-center">
        <div className=" flex gap-2 items-center">
          <div className=" flex  items-center">
            {!withOutImport && (
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
                    <button
                      onClick={importXLSX}
                      className=" hover:bg-gray-100 w-full px-2">
                      EXC
                    </button>
                    <button
                      onClick={importCSV}
                      className=" hover:bg-gray-100 w-full px-2">
                      CSV
                    </button>
                    <button
                      onClick={importPDF}
                      className=" hover:bg-gray-100 w-full px-2">
                      PDF
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
            )}

            {/* Open Bulk Change */}
            <button
              onClick={handleBulkActions}
              className={` flex gap-1 border-borderGray items-center mr-3 px-1 py-[1px] border  ${
                withOutImport ? "rounded-lg" : "rounded-r-lg"
              } `}>
              <span className=" border-r-[1px] border-borderGray px-1">
                Bulk Actions
              </span>
              <FaArrowsRotate />
            </button>
          </div>
        </div>
        <div className="relative mr-5  flex gap-2 items-center">
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => searchInput(values)}>
            <Form>
              <Field
                type="text"
                name="search"
                id="search"
                placeholder="Try to Searching..."
                className="w-[180px] p-1 pl-10 placeholder:text-primary bg-white rounded-full  border-borderGray border   focus:outline-none"
              />
              <button
                type="submit"
                className="hidden">
                Submit
              </button>
            </Form>
          </Formik>
          <TfiSearch className="absolute left-3 text-gray-400" />
          {/* Add Service - Product - Units */}
          <button
            onClick={
              setAddModal //Open Modal
            }
            className=" text-white rounded-[18px] hover:bg-blue-500  flex gap-3 items-center  bg-customBlue py-1 px-3">
            <FaPlus /> Add New {item}
          </button>
        </div>
        <BulkActionModal
          deleteBulk={deleteBulk}
          withAssign={withAssign}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default BulkBar;
