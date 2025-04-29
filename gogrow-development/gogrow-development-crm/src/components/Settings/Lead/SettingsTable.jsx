import { useDispatch } from "react-redux";
import TableFooter from "../../TableFooter";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import Loader from "../../Layout/Loader";

const SettingsTable = ({
  componentRef,
  columns,
  tableData,
  toggleAllSelection,
  toggleSelection,
  checkedList,
  openModal,
  handleEdit,
  pagination,
  nextpage,
  previouspage,
  deleteSettings,
  loading,
}) => {
  const dispatch = useDispatch();

  const handleSelectAll = () => {
    const allIds = tableData?.map((row) => row.id);
    dispatch(toggleAllSelection(allIds));
  };

  const handleSelect = (id) => {
    dispatch(toggleSelection(id));
  };

  return (
    <div
      ref={componentRef}
      className="bg-white rounded-[18px]  mb-1  shadow-card p-6">
      <div className="overflow-y-auto  relative min-h-[550px]">
        <table className="w-full ">
          <thead className="">
            <tr className="border-b ">
              {columns.map((col, index) => (
                <th
                  key={col}
                  className={`${
                    index === 0 ? "text-left" : "text-left"
                  } pb-3 text-[16px]    leading-[30px] font-bold`}>
                  {index === 0 ? (
                    <div className="px-4   flex justify-center">
                      <input
                        className=" w-[18px]  h-[18px]"
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={checkedList?.length === tableData?.length}
                      />
                    </div>
                  ) : (
                    col
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" ">
            {loading ? (
              <tr className=" h-full">
                <td
                  colSpan={columns.length}
                  className="py-4 h-[400px] text-center">
                  <Loader />
                </td>
              </tr>
            ) : tableData.length === 0 ? (
              <tr className=" h-full">
                <td
                  colSpan={columns.length}
                  className="py-4 h-[400px] text-center">
                  No Settings
                </td>
              </tr>
            ) : (
              tableData?.map((row, index) => (
                <tr
                  key={index}
                  className="border-b text-[15px] text-primary font-medium   leading-[23px] last:border-b-0">
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className="py-4 w-[80px] text-left">
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        className=" w-[18px] h-[18px]"
                        checked={checkedList?.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                      />
                    </div>
                  </td>
                  <td className="py-4 text-left">
                    {/* {row.count} */}
                    {index +
                      1 +
                      (pagination?.currentPage - 1) * pagination?.perPage}
                  </td>
                  <td className="py-4 text-left">{row.id}</td>
                  <td className="py-4 text-left">{row.status}</td>
                  <td className="py-3   ">
                    <div className="flex  pl-4  text-[14px] gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          handleEdit(row); //Add row
                          openModal();
                        }}
                        className="text-[#515151] hover:text-blue-700">
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteSettings(row)}
                        type="button"
                        className=" text-[#515151] hover:text-red-700">
                        <IoTrashOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
      </div>
      <div className=" mt-auto">
        <TableFooter
          loading={loading}
          next={nextpage}
          previous={previouspage}
          from={pagination?.from}
          to={pagination?.to}
          currentPage={pagination?.currentPage}
          totalPages={pagination?.lastPage}
          total={pagination?.total}
        />
      </div>
    </div>
  );
};

export default SettingsTable;
