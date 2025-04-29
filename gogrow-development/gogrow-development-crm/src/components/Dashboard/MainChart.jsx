import CardHeader from "../CardHeader";
import NormalFont from "../NormalFont";
import { MdKeyboardArrowDown } from "react-icons/md";
import LineChart from "./ChartLine";
import { useState } from "react";

const MainChart = ({ year, setYear, header, subHeader, datasets }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  // const [year, setYear] = useState(new Date().getFullYear());

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const years = [];
  const currentYear = new Date().getFullYear();

  // You can adjust the range of years (e.g., 1900 to the current year)
  for (let i = currentYear; i >= 2023; i--) {
    years.push(i);
  }
  const handleYearClick = (selectedYear) => {
    setYear(selectedYear);
    setShowDropdown(false); // Close dropdown after selection
  };
  return (
    <div className="    border-t p-[35px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <CardHeader>{header}</CardHeader>
          <NormalFont>{subHeader}</NormalFont>
        </div>
        <div className="relative inline-block">
          {/* Button that looks like the year picker */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center  justify-between px-2 w-[100px] py-1 rounded-md border space-x-2 text-gray-600">
            <div>{year}</div>
            <MdKeyboardArrowDown />
          </button>

          {/* Dropdown for selecting year */}
          {showDropdown && (
            <ul className="absolute mt-2 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto">
              {years.map((yearOption) => (
                <li
                  key={yearOption}
                  onClick={() => handleYearClick(yearOption)}
                  className="px-4  text-center py-2 cursor-pointer hover:bg-gray-100">
                  {yearOption}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <LineChart datasets={datasets} />
    </div>
  );
};

export default MainChart;
