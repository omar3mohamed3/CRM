import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SingleSelectFilterDropdown = ({
  filters, //The Options of list
  width = "w-64", //style
  setFieldValues, //setFieldValues for formik
  padding = " px-4 py-[10px] ", // stype
  setTouched, // touch validation
  placeholder = " Assigned ", // place holder on button
  up, // direction of open list
  editedValues, // Initial Value as object
  reset = false,
  setResetDropdown = () => {},
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(editedValues || null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setTouched && setTouched();
    setIsOpen(!isOpen);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setResetDropdown(false);

    // The Select in Lead City only
    if (placeholder === "City") {
      setFieldValues && setFieldValues(filter.label);
    } else {
      setFieldValues && setFieldValues(filter.id);
    }
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = filters?.filter((filter) =>
    filter.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset the dropdown when `reset` is true
  useEffect(() => {
    if (reset) {
      setSelectedFilter(null); // Reset the selected filter
    }
  }, [reset]);

  return (
    <div
      className={`relative inline-block text-left ${width} `}
      ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={` inline-flex justify-between items-center w-full ${padding} text-sm font-medium text-gray-700 bg-white border  border-borderGray rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black `}>
        <span className="truncate">
          {selectedFilter ? selectedFilter.label : placeholder}
        </span>
        <ChevronDown className="w-5 h-5 ml-2 flex-shrink-0" />
      </button>

      {isOpen && (
        <div
          className={` absolute  ${
            up ? " flex    bottom-[50px]  flex-col-reverse " : " "
          }    z-10 w-full mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          {/* Search  */}
          <div className=" p-2 ">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Text here"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
          {/*  gray space */}
          <div className="grid grid-cols-1 px-2 py-1 border-t border-gray-200">
            <div
              className="text-sm  bg-[#EDEDED]  w-full py-3
              rounded-[4px]  "></div>
          </div>

          {/* Select List */}
          <div className="max-h-56 overflow-y-auto bg-white">
            {filteredOptions?.map((filter) => (
              <button
                type="button"
                key={filter.id}
                onClick={() => handleFilterSelect(filter)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                <span className="flex-grow text-left">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSelectFilterDropdown;
