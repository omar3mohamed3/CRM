import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { GoKebabHorizontal } from "react-icons/go";

import LeadReassignModal from "../../Leads/LeadReassignModal";
import TableFooter from "../../TableFooter";
import { CodeSquare } from "lucide-react";
import {
  deleteService,
  editService,
  fetchService,
  openModal,
  setNextServicePage,
  setPreviousServicePage,
  toggleAllServicesSelection,
  toggleServicesSelection,
} from "../../../Store/serviceSlice/serviceSlice";
import Loader from "../../Layout/Loader";
import toast from "react-hot-toast";
import { formatNumber } from "../../../Url/url";

const ServiceTable = ({ componentRef }) => {
  const [showLead, setShowLead] = useState(null);
  const [showSetting, setShowSetting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { services, selectedServices, loading, error, pagination, filters } =
    useSelector((state) => state.services);

  // Fetch Leads With Filter or not
  useEffect(() => {
    dispatch(fetchService({ ...filters, page: pagination.currentPage }));
  }, [dispatch, pagination.currentPage, filters]);

  const handleEditService = (id) => {
    dispatch(editService(id)); // Send id to it
  };

  // Refs for the elements
  const leadIconRefs = useRef([]);
  const settingButtonRefs = useRef([]);

  const columns = [
    "@",
    " # ",
    "Name",
    "Price",
    "Assigned",
    "Description",
    "Last Action",
    "Created",
    "",
  ];

  const handleSelectAll = () => {
    const allIds = services.map((row) => row.id);
    dispatch(toggleAllServicesSelection(allIds));
  };

  const handleSelect = (id) => {
    dispatch(toggleServicesSelection(id));
  };

  const handleClickOutside = (event) => {
    // Check if click is outside of any lead icon
    if (
      !leadIconRefs.current.some((ref) => ref && ref.contains(event.target))
    ) {
      setShowLead(null);
    }
    // Check if click is outside of any setting button
    if (
      !settingButtonRefs.current.some(
        (ref) => ref && ref.contains(event.target)
      )
    ) {
      setShowSetting(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLead, showSetting]);

  // Delete Service
  const handleDeleteService = (service) => {
    dispatch(deleteService(service.id)).then(() =>
      toast.success(`Delete Lead ${service.name} Successfully`)
    );
  };

  const nextpage = () => {
    dispatch(setNextServicePage());
  };

  const previouspage = () => {
    dispatch(setPreviousServicePage());
  };

  return (
    <div
      ref={componentRef}
      className="bg-white rounded-[18px]  shadow-card p-6">
      <div className="overflow-y-auto  min-h-[76vh] flex flex-col">
        <table className="w-full   ">
          <thead>
            <tr className="border-b">
              {columns.map((col, index) => (
                <th
                  key={col}
                  className={`${
                    index === 0 ? " text-left max-w-5 " : " text-left "
                  } pb-3 text-[16px]    leading-[30px] font-semibold`}>
                  {index === 0 ? (
                    <div className="  flex justify-left">
                      <input
                        className=" w-[18px]  h-[18px]"
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedServices.length === services?.length}
                      />
                    </div>
                  ) : (
                    col
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="      ">
            {loading ? (
              <tr className=" h-full">
                <td
                  colSpan={columns.length}
                  className="py-4 h-[400px] text-center">
                  <Loader />
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr className=" h-full">
                <td
                  colSpan={columns.length}
                  className="py-4 h-[400px] text-center">
                  No Services
                </td>
              </tr>
            ) : (
              services?.map((row, index) => (
                <tr
                  key={index}
                  // onClick={() => navigate(`${row.id}`)}
                  className="border-b text-[15px] text-primary font-medium   leading-[23px] last:border-b-0">
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className="py-4 text-left">
                    <div className="max-w-5 flex justify-center items-center">
                      <input
                        type="checkbox"
                        className=" w-[18px] h-[18px]"
                        checked={selectedServices.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                      />
                    </div>
                  </td>
                  <td className="py-4   text-left">
                    {/* {" "} */}
                    {index +
                      1 +
                      (pagination.currentPage - 1) * pagination.perPage}
                    {/* {row.id} */}
                  </td>
                  <td className="py-4 text-left">{row.name}</td>
                  <td className="py-4 text-left">{formatNumber(row.price)}</td>
                  <td className="py-4 text-left">
                    {row.teams.map((team) => (
                      <div key={team.id}>{team.team_name}</div>
                    ))}
                  </td>
                  <td className="py-4 text-left pr-1  max-w-[200px] text-gray-800">
                    {row.description.length > 20
                      ? row.description.slice(0, 20) + "..."
                      : row.description}
                  </td>
                  <td className="py-4 text-left">{row.updated_at}</td>
                  <td className="py-4 text-left">{row.created_at}</td>

                  {row.status && (
                    <td className="py-4 text-left">
                      <span className="bg-[#FFDFDF69] text-[#B70000] border border-[#B70000] text-xs font-medium px-3 py-[1px] rounded-[4px]">
                        {row.status}
                      </span>
                    </td>
                  )}
                  <td
                    onClick={(e) => e.stopPropagation()}
                    ref={(el) => (settingButtonRefs.current[row.id] = el)}
                    className="py-4 relative text-center">
                    <button
                      // onClick={() => setShowSetting(row.id)}
                      onClick={() => {
                        if (showSetting === row.id) {
                          setShowSetting((item) => null);
                        } else {
                          setShowSetting((item) => row.id);
                        }
                      }}
                      className="setting-button text-gray-400 hover:text-gray-600">
                      <GoKebabHorizontal
                        className="text-[16px] rotate-90"
                        size={16}
                      />
                    </button>
                    {/* Edit - Delete - Reassign */}
                    {showSetting === row.id && (
                      <div className="z-10 absolute top-2 -left-28 text-center bg-white rounded-[8px] shadow-card border py-1">
                        <button
                          onClick={() => {
                            dispatch(openModal());
                            handleEditService(row);
                          }}
                          className="hover:bg-gray-100   w-full px-2">
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteService(row)}
                          className="hover:bg-red-500 hover:text-white w-full px-2">
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="mt-auto">
          <TableFooter
            loading={loading}
            next={nextpage}
            previous={previouspage}
            from={pagination.from}
            to={pagination.to}
            currentPage={pagination.currentPage}
            totalPages={pagination.lastPage}
            total={pagination.total}
          />
        </div>

        {/* Bulk Action Modal */}
        {/* <LeadReassignModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        /> */}
      </div>
    </div>
  );
};

export default ServiceTable;
