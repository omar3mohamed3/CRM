import { useState, useEffect, useRef } from "react";
import MultiSelectFilterDropdown from "./MultiSelectFilterDropdown";
import SingleSelectFilterDropdown from "./SingleSelectFilterDropdown";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css"; // You can use other Flatpickr themes

import { FaArrowsRotate } from "react-icons/fa6";
import { TfiSearch } from "react-icons/tfi";
import BulkActionModal from "../../components/Leads/BulkActions";
import ReactToPrint from "react-to-print";
import { IoCalendarOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLeadsBulk,
  fetchLeads,
  resetFilters,
  setFilter,
  updateLeadsBulk,
} from "../../Store/leadsSlice/leadsSlice";
import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";
import { fetchLeadStatuses } from "../../Store/leadsSlice/statusSlice/statusSlice";
import { fetchLeadsSources } from "../../Store/leadsSlice/sourceSlice";
import { fetchAssignedUsers } from "../../Store/leadsSlice/AssignedUsersSlice";
import { handleFileExport } from "../../Store/Common/downloadFiles";
import { module_id, URL } from "../../Url/url";

const importedFileURL = `${URL}modules/${module_id()}/leads/import`;
const LeadsFilter = ({ componentRef }) => {
  // Date From - To
  const flatpickrRef = useRef(null);
  const [toggleImport, setToggleImport] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const [resetDropdown, setResetDropdown] = useState(false);

  const importButtonRef = useRef(null);

  // Bulk Modal
  const dispatch = useDispatch();
  // Select Bulk of Ids
  const { selectedLeads, filters, pagination } = useSelector(
    (state) => state.leads
  );
  const { statuses } = useSelector((state) => state.leadsStatus);
  const { sources } = useSelector((state) => state.leadsSoruce);
  const { users } = useSelector((state) => state.assignedUsers);

  useEffect(() => {
    dispatch(fetchLeadStatuses());
    dispatch(fetchLeadsSources());
    dispatch(fetchAssignedUsers());
  }, [dispatch]);

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

  // Delete Bulk of Leads
  const deleteBulk = () => {
    //Guard
    if (selectedLeads.length !== 0) {
      dispatch(deleteLeadsBulk(selectedLeads))
        .unwrap()
        .then(() => {
          setIsModalOpen(false);
          console.log("Leads deleted successfully");
          dispatch(fetchLeads({ ...filters, page: pagination.data.currentPage }));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("No Lead to delete ");
    }
  };

  // Edit Bulk of Leads
  const editBulk = ({ status_id, assigned_to }) => {
    //Guard
    if (selectedLeads.length !== 0) {
      dispatch(
        updateLeadsBulk({ leadIds: selectedLeads, status_id, assigned_to })
      )
        .unwrap()
        .then(() => setIsModalOpen(false));
    } else {
      toast.error("No Lead to delete ");
    }
  };

  const initialValues = {
    assigned: null,
    status: [],
    source: null,
    dateRange: [],
    search: "",
  };
  const onSubmit = (values) => {
    const status_ids = values.status.map((status) => status.id);

    dispatch(
      setFilter({
        search: values.search,
        date_from: values?.dateRange[0],
        date_to: values?.dateRange[1],
        source_id: values.source,
        status_id: status_ids,
        assigned_to: values.assigned,
      })
    );
  };

  const handleResetFilters = (resetForm) => {
    dispatch(resetFilters());
    setResetDropdown(true);

    resetForm(); // Reset the form to its initial values
    // dispatch(fetchLeads({ page: 1 }));
    if (flatpickrRef.current && flatpickrRef.current.flatpickr) {
      flatpickrRef.current.flatpickr.clear();
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({ setFieldValue, values, resetForm }) => (
          <Form>
            <div className="bg-white rounded-lg w-full shadow-md p-4">
              <div className="flex gap-3 mb-1 items-center">
                <h2 className="text-lg font-bold">Filter by</h2>
                <button
                  type="submit"
                  className="rounded-lg   hover:bg-[#3e79cb] text-white bg-customBlue   px-2 py-px">
                  Search
                </button>
                <button
                  onClick={() => handleResetFilters(resetForm)}
                  type="reset"
                  // type="button"
                  className="rounded-lg border-borderGray hover:bg-slate-100 border px-2 py-px">
                  Reset
                </button>
              </div>
              <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-5 justify-between">
                {/* Assigned */}
                <div>
                  <Field name="assigned">
                    {({ field }) => (
                      <SingleSelectFilterDropdown
                        {...field}
                        filters={users}
                        placeholder="Assigned"
                        width="w-full"
                        setResetDropdown={setResetDropdown}
                        reset={resetDropdown} // Pass reset state here
                        setFieldValues={(value) =>
                          setFieldValue("assigned", value)
                        }
                      />
                    )}
                  </Field>
                </div>
                {/* Status */}
                <div>
                  <Field name="status">
                    {({ field }) => (
                      <MultiSelectFilterDropdown
                        {...field}
                        filters={statuses}
                        placeholder="status"
                        width="w-full"
                        setResetDropdown={setResetDropdown}
                        reset={resetDropdown}
                        setFieldValues={(value) =>
                          setFieldValue("status", value)
                        }
                      />
                    )}
                  </Field>
                </div>
                {/* Source */}
                <div>
                  <Field name="source">
                    {({ field }) => (
                      <SingleSelectFilterDropdown
                        {...field}
                        filters={sources}
                        placeholder="Source"
                        setResetDropdown={setResetDropdown}
                        reset={resetDropdown} // Pass reset state here
                        width="w-full"
                        setFieldValues={(value) =>
                          setFieldValue("source", value)
                        }
                      />
                    )}
                  </Field>
                </div>
                {/* Date Range */}
                <div className="relative">
                  {/* <Field name="dateRange">
                  {({ field }) => ( */}
                  <Flatpickr
                    ref={flatpickrRef}
                    value={values.dateRange || []}
                    onChange={(dates) => {
                      const formattedDates = dates.map(
                        (date) => date.toISOString().split("T")[0]
                      ); // Converts to "YYYY-MM-DD"
                      setFieldValue("dateRange", formattedDates);
                    }}
                    placeholder="Select Date From - To"
                    options={{
                      mode: "range",
                      dateFormat: "Y-m-d",
                    }}
                    className="input border border-borderGray placeholder:text-primary  rounded-lg py-2  w-full min-w-[200px] text-center "
                  />
                  {/* )}
                </Field> */}
                  <label
                    htmlFor="dateRange"
                    className="absolute top-[25%] right-[20px] z-10">
                    <IoCalendarOutline />
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg mt-2 w-full shadow-md p-2">
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
                        type="button"
                        onClick={handleImport}
                        className=" flex gap-1 border-borderGray items-center   px-1 py-[1px] border rounded-l-lg">
                        Export
                      </button>
                      {toggleImport && (
                        <div className="  absolute top-10 text-center bg-white rounded-[8px] shadow-card  border  py-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleFileExport(importedFileURL, "excel")
                            }
                            className=" hover:bg-gray-100 w-full px-2">
                            EXC
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleFileExport(importedFileURL, "csv")
                            }
                            className=" hover:bg-gray-100 w-full px-2">
                            CSV
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleFileExport(importedFileURL, "pdf")
                            }
                            className=" hover:bg-gray-100 w-full px-2">
                            PDF
                          </button>
                          <ReactToPrint
                            trigger={() => (
                              // <button className="hover:bg-white border border-borderGray p-1 bg-[#F2F2F2] rounded-[4px]">
                              //   <AiOutlinePrinter />
                              // </button>
                              <button
                                type="button"
                                className=" hover:bg-gray-100 w-full px-2">
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
                      type="button"
                      onClick={handleBulkActions}
                      className=" flex gap-1 border-borderGray items-center mr-3 px-1 py-[1px] border  rounded-r-lg">
                      <span className=" border-r-[1px] border-borderGray px-1">
                        Bulk Actions
                      </span>
                      <FaArrowsRotate />
                    </button>
                  </div>
                </div>
                <div className="relative mr-5  flex items-center">
                  <Field
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Try to Searching..."
                    className="w-[180px] p-1 pl-10 placeholder:text-primary bg-white rounded-full  border-borderGray border   focus:outline-none"
                  />
                  <TfiSearch className="absolute left-3 text-gray-400" />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {/* Bulk Action Modal */}
      <BulkActionModal
        editBulk={editBulk}
        handleDelete={deleteBulk}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LeadsFilter;
