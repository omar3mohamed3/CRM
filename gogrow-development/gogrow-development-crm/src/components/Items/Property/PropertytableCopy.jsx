import React, { useEffect, useRef, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageProperty from "/public/Logo.png";
import {
  toggleAllServicesSelection,
  toggleServicesSelection,
} from "../../../Store/serviceSlice/serviceSlice";
import {
  toggleAllPropertiesSelection,
  togglePropertiesSelection,
} from "../../../Store/propertyiesSlice/propertyiesSlice";

const PropertyTable = ({ componentRef }) => {
  const [showLead, setShowLead] = useState(null);
  const [showSetting, setShowSetting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const propertiesServices = useSelector(
    (state) => state.properties.propertiesServices
  );

  // Refs for the elements
  const leadIconRefs = useRef([]);
  const settingButtonRefs = useRef([]);

  const columns = [
    "@",
    " # ",
    "Property",
    "Property ID",
    "Photo",
    "Property Details",
    "Type",
    "Price",
    "Last Action",
    "Created",
    "",
  ];

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // Pagination controls
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectAll = () => {
    const allIds = tableData.map((row) => row.id);
    dispatch(toggleAllPropertiesSelection(allIds));
  };

  const handleSelect = (id) => {
    dispatch(togglePropertiesSelection(id));
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

  return (
    <div
      ref={componentRef}
      className="bg-white rounded-[18px] min-h-[320px] shadow-card p-6">
      <div className="overflow-y-auto h-full">
        <table className="w-full  min-w-max lg:min-w-full  overflow-y-auto">
          <thead className=" block w-full">
            <tr className="border-b grid  gap-2 grid-cols-12">
              {columns.map((col, index) => (
                <th
                  key={col}
                  className={`${
                    index === 0 ? "text-left" : "text-left"
                  } pb-3 text-[16px]  ${
                    index === 5 && "col-span-2"
                  }   leading-[30px] font-bold`}>
                  {index === 0 ? (
                    <div className="px-4 flex justify-center">
                      <input
                        className=" w-[18px]  h-[18px]"
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={propertiesServices.length === tableData.length}
                      />
                    </div>
                  ) : (
                    col
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="overflow-y-auto  h-[50vh] block w-full">
            {tableData.map((row, index) => (
              <tr
                key={index}
                // onClick={() => navigate(`${row.id}`)}
                className="border-b text-[15px] w-full grid  grid-cols-12 text-primary font-medium cursor-pointer leading-[23px] last:border-b-0">
                <td
                  onClick={(e) => e.stopPropagation()}
                  className="py-4 text-left">
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      className=" w-[18px] h-[18px]"
                      checked={propertiesServices.includes(row.id)}
                      onChange={() => handleSelect(row.id)}
                    />
                  </div>
                </td>
                <td className="py-4   pr-4 text-center">{row.id}</td>
                <td className="py-4 px-2 text-left">{row.property}</td>
                <td className="py-4 px-2 text-left">{row.propertyID}</td>
                <td className="py-4 px-2 text-left">
                  <img
                    className=" w-[75px] h-[35px]"
                    src={row.photo}
                    alt=""
                  />
                </td>
                <td className="py-4 text-left pr-1 pl-2  col-span-2  max-w-[400px] text-gray-800">
                  {row.details.length > 45
                    ? row.details.slice(0, 45) + "..."
                    : row.details}
                </td>
                <td className="py-4 pl-2 text-left">{row.type}</td>
                <td className="py-4 pl-2 text-left">{row.price}</td>
                <td className="py-4 pl-2 text-left">{row.LastAction}</td>
                <td className="py-4 pl-2 text-left">{row.Created}</td>
                {row.status && (
                  <td className="py-4 pl-2 text-left">
                    <span className="bg-[#FFDFDF69] text-[#B70000] border border-[#B70000] text-xs font-medium px-3 py-[1px] rounded-[4px]">
                      {row.status}
                    </span>
                  </td>
                )}
                <td
                  onClick={(e) => e.stopPropagation()}
                  ref={(el) => (settingButtonRefs.current[row.id] = el)}
                  className="py-4 px-2 relative text-center">
                  <button
                    onClick={() => setShowSetting(row.id)}
                    className="setting-button text-gray-400 hover:text-gray-600">
                    <GoKebabHorizontal
                      className="text-[16px] rotate-90"
                      size={16}
                    />
                  </button>
                  {showSetting === row.id && (
                    <div className="z-10 absolute -left-20 text-center bg-white rounded-[8px] shadow-card border py-1">
                      <button
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                        className="hover:bg-gray-100 w-full px-2">
                        ReAssign
                      </button>
                      <button className="hover:bg-red-500 hover:text-white w-full px-2">
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className=" flex gap-2 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
              Next
            </button>
          </div>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
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

export default PropertyTable;

const tableData = [
  {
    id: "1",
    property: "Duplex 200m",
    propertyID: "#8854",
    photo: imageProperty,
    details: "Lorem ipsum, or lipsum as it is sometimes know..",
    type: "Rent",
    price: "15.000 K",
    LastAction: "Today",
    Created: "6 Days ago",
  },
  {
    id: "2",
    property: "Ahmed Nagy",
    propertyID: "Ahmed Nagy",
    photo: imageProperty,
    details: "Ahmed Nagy",
    type: "Ahmed Nagy",
    price: "15.000 K",
    LastAction: "Today",
    Created: "6 Days ago",
  },
  {
    id: "3",
    property: "Ahmed Nagy",
    propertyID: "Ahmed Nagy",
    photo: imageProperty,
    details: "Ahmed Nagy",
    type: "Ahmed Nagy",
    price: "15.000 K",
    LastAction: "Today",
    Created: "6 Days ago",
  },
  {
    id: "4",
    property: "Ahmed Nagy",
    propertyID: "Ahmed Nagy",
    photo: imageProperty,
    details: "Ahmed Nagy",
    type: "Ahmed Nagy",
    price: "15.000 K",
    LastAction: "Today",
    Created: "6 Days ago",
  },
  {
    id: "5",
    property: "Ahmed Nagy",
    propertyID: "Ahmed Nagy",
    photo: imageProperty,
    details: "Ahmed Nagy",
    type: "Ahmed Nagy",
    price: "15.000 K",
    LastAction: "Today",
    Created: "6 Days ago",
  },
  {
    id: "6",
    property: "Ahmed Nagy",
    propertyID: "Ahmed Nagy",
    photo: imageProperty,
    details: "Ahmed Nagy",
    type: "Ahmed Nagy",
    price: "15.000 K",
    LastAction: "Today",
    Created: "6 Days ago",
  },
  {
    id: "7",
    property: "Ahmed Nagy",
    propertyID: "Ahmed Nagy",
    photo: imageProperty,
    details: "Ahmed Nagy",
    type: "Ahmed Nagy",
    price: "15.000 K",
    LastAction: "Today",
    Created: "6 Days ago",
  },
];
