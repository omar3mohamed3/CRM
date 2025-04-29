import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const MultiSelectFilterDropdown = ({
  filters,
  placeholder = "Select filters",
  setFieldValues,
  setTouched,
  fieldName,
  reset,
  editedValues = [],
  setResetDropdown = () => {},
  refresh = false,
  up,
  width = "w-64",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(editedValues || []);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setTouched && setTouched();
    setIsOpen(!isOpen);
  };

  // Select item from list
  const handleFilterSelect = (filter) => {
    setResetDropdown(false); // able to show selected items
    setSelectedFilters((prev) => {
      const updatedFilters = prev.some((f) => f.id === filter.id)
        ? prev.filter((f) => f.id !== filter.id)
        : [...prev, filter];

      // Use the passed setFieldValues prop to update the Formik state
      setFieldValues(updatedFilters);

      return updatedFilters; // Return the new state
    });
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // HandleFilter
  const filteredOptions = filters.filter((filter) =>
    filter.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  Select All Item  in list
  const selectAll = () => {
    setResetDropdown(false);
    setSelectedFilters(filters);
  };

  // Deselect all  items in list
  const deselectAll = () => {
    setSelectedFilters([]);
  };

  // For DropList
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

  const displaySelectedFilters = () => {
    // Return PlaceHolder

    if (selectedFilters.length === 0 || reset) return placeholder;
    if (selectedFilters.length <= 2)
      return selectedFilters.map((f) => f.label).join(", ");
    return `${selectedFilters[0].label}, ${selectedFilters[1].label}...`;
  };

  // Reset the dropdown when `reset` is true
  useEffect(() => {
    if (reset) {
      setSelectedFilters([]); // Reset the selected filter
    }
  }, [reset]);

  return (
    <div
      className={`relative inline-block text-left   ${width} `}
      ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-between items-center w-full px-4 py-[10px] text-sm font-medium text-gray-700 bg-white border  border-borderGray rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span className="truncate">{displaySelectedFilters()}</span>
        <ChevronDown className="w-5 h-5 ml-2 flex-shrink-0" />
      </button>

      {isOpen && (
        <div
          className={`  ${
            up ? " flex    bottom-[50px]  flex-col-reverse " : " "
          } absolute z-10 w-full mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <div className="p-2">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Filter..."
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 px-2 py-1 border-t border-gray-200">
            <button
              type="button"
              onClick={selectAll}
              className="text-sm text-[#141414] border  w-full  py-1 rounded-l-[4px] hover:text-indigo-800">
              Select All
            </button>
            <button
              type="button"
              onClick={deselectAll}
              className="text-sm text-[#141414] border w-full py-1  rounded-r-[4px] hover:text-indigo-800">
              Deselect All
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((filter) => (
              <button
                type="button"
                key={filter.id}
                onClick={() => handleFilterSelect(filter)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <span className="flex-grow text-left">{filter.label}</span>
                {selectedFilters.some((f) => f.id === filter.id) && (
                  <Check className="w-5 h-5 text-indigo-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectFilterDropdown;
