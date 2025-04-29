import { useEffect, useRef, useState } from "react";

import TableFooter from "../../TableFooter";

import { GoKebabHorizontal } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteCategory,
  editCategory,
  fetchCategories,
  openCategoriesModal,
  setNextCategoryPage,
  setPreviousCategoryPage,
  toggleAllCategoriesSelection,
  toggleCategoriesSelection,
} from "../../../Store/categorySlice/categorySlice";
import Loader from "../../Layout/Loader";
import toast from "react-hot-toast";

const CategoriesTable = ({ componentRef }) => {
  const [showLead, setShowLead] = useState(null);
  const [showSetting, setShowSetting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); //ReAssign Modal

  // Categories Data
  const {
    categories,
    loading,
    error,
    selectedcategories,
    pagination,
    filters,
  } = useSelector((state) => state.categories);

  // Fetch Categories
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories({ ...filters, page: pagination.currentPage }));
  }, [dispatch, pagination.currentPage, filters]);

  const handleEditCategory = (row) => {
    dispatch(editCategory(row));
  };

  // Refs for the elements
  const leadIconRefs = useRef([]);
  const settingButtonRefs = useRef([]);

  const columns = ["@", " # ", "Name", "Assigned", "Created", ""];

  const handleSelectAll = () => {
    const allIds = categories.map((row) => row.id);
    dispatch(toggleAllCategoriesSelection(allIds));
  };

  const handleSelect = (id) => {
    dispatch(toggleCategoriesSelection(id));
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

  const nextpage = () => {
    dispatch(setNextCategoryPage());
  };

  const previouspage = () => {
    dispatch(setPreviousCategoryPage());
  };

  // Delete Category
  const handleDeleteCategory = (category) => {
    dispatch(deleteCategory(category.id))
      .unwrap()
      .then(() => toast.success(`Delete Lead ${category.name} Successfully`))
      .catch((error) => console.log(error));
  };

  return (
    <div
      ref={componentRef}
      className="bg-white rounded-[18px] min-h-[320px] shadow-card p-6">
      <div className="overflow-y-auto min-h-[76vh] flex flex-col">
        <table className="w-full  ">
          <thead>
            <tr className="border-b">
              {columns.map((col, index) => (
                <th
                  key={col}
                  className={`${
                    index === 0 ? "text-left max-w-5 " : "text-left"
                  } pb-3 text-[20px]    leading-[30px] font-semibold`}>
                  {index === 0 ? (
                    <div className="  flex justify-left">
                      <input
                        className=" w-[18px]  h-[18px]"
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedcategories?.length === categories?.length
                        }
                      />
                    </div>
                  ) : (
                    col
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {loading ? (
              <tr className=" h-full">
                <td
                  colSpan={columns.length}
                  className="py-4 h-[400px] text-center">
                  <Loader />
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr className=" h-full">
                <td
                  colSpan={columns.length}
                  className="py-4 h-[400px] text-center">
                  No Categories
                </td>
              </tr>
            ) : (
              categories.map((row, index) => (
                <tr
                  key={index}
                  // onClick={() => navigate(`${row.id}`)}
                  className="border-b text-[15px] text-primary font-medium   leading-[23px] last:border-b-0">
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className="py-4 text-left">
                    <div className="max-w-5  flex justify-center items-center">
                      <input
                        type="checkbox"
                        className=" w-[18px] h-[18px]"
                        checked={selectedcategories?.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                      />
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-left">
                    {/* {row.id} */}
                    {index +
                      1 +
                      (pagination.currentPage - 1) * pagination.perPage}
                  </td>
                  <td className="py-4 text-left">{row.name}</td>

                  <td className="py-4 text-left flex flex-wrap  gap-2">
                    {row.teams.map((team) => team.team_name).join(" - ") ||
                      " No Team Assigned  "}
                  </td>

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
                      <div className="z-10 absolute -left-20 text-center bg-white rounded-[8px] shadow-card border py-1">
                        <button
                          onClick={() => {
                            dispatch(openCategoriesModal());
                            handleEditCategory(row);
                          }}
                          className="hover:bg-gray-100   w-full px-2">
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteCategory(row)}
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
        <div className=" mt-auto">
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

export default CategoriesTable;
