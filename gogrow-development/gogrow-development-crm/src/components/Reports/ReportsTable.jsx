import { useEffect } from "react";
import TableFooter from "../TableFooter";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../../Store/reportsSlice/reportsSlice";

const ReportsTable = ({ componentRef }) => {
  // reports Data
  const { reports, loading, error } = useSelector((state) => state.reports);
  const dispatch = useDispatch();

  // Fetch reports
  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const columns = [
    " # ",
    "Photo",
    "Name",
    "Category",
    "Price",
    "Assigned",
    "Description",
    "Last Action",
    "Created",
    "",
  ];

  return (
    <div
      ref={componentRef}
      className="bg-white rounded-[18px] min-h-[320px] shadow-card p-6">
      <div className="overflow-y-auto ">
        <table className="w-full overflow-y-auto">
          <thead>
            <tr className="border-b">
              {columns.map((col, index) => (
                <th
                  key={col}
                  className={` text-left 
                   pb-3 text-[16px] leading-[30px] font-semibold`}>
                  <div className="pr-4">{col}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="      ">
            {reports?.map((row, index) => (
              <tr
                key={index}
                className="border-b text-[15px] text-primary font-medium leading-[23px] last:border-b-0">
                <td className="py-4 pr-4 text-left">{row.id}</td>
                <td className="py-4  pr-4 text-left">
                  <img
                    className="w-[43px] h-[43px]"
                    src={row.Photo}
                    alt=""
                  />
                </td>
                <td className="py-4  pr-4 text-left">{row.name}</td>
                <td className="py-4  pr-4 text-left">{row.Category}</td>
                <td className="py-4  pr-4 text-left">{row.price}</td>
                <td className="py-4  pr-4 text-left">{row.assigned}</td>
                <td className="py-4 text-left pr-4  max-w-[200px] text-gray-800">
                  {row.description.length > 45
                    ? row.description.slice(0, 45) + "..."
                    : row.description}
                </td>
                <td className="py-4 pr-4 text-left">{row.LastAction}</td>
                <td className="py-4 pr-4 text-left">{row.Created}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <TableFooter />
      </div>
    </div>
  );
};

export default ReportsTable;
