import { useEffect, useRef, useState } from "react";
import Hashtag from "../../components/Hashtag";
import BulkBar from "./BulkBarWithDispatch";
import { useDispatch, useSelector } from "react-redux";
import ItemsFilter from "./ItemsFilter";
import { deleteServicesBulk } from "../../Store/serviceSlice/serviceSlice";

import CategoriesTable from "../../components/Items/ProductCategory/CategoriesTable";
import AddCategory from "../../components/Items/ProductCategory/AddCategory";
import {
  deleteCategoriesBulk,
  fetchAllCategories,
  openCategoriesModal,
  resetFilters,
  setFilter,
} from "../../Store/categorySlice/categorySlice";
import { Link } from "react-router-dom";
import { handleFileExport } from "../../Store/Common/downloadFiles";
import { module_id, URL } from "../../Url/url";
import toast from "react-hot-toast";

const importedFileURL = `${URL}modules/${module_id()}/categories/export`;
const ProductCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Edit Modal
  const dispatch = useDispatch();

  const componentRef = useRef();

  const { selectedCategories, filters, allCategories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Delete Bulk of Leads
  const deleteBulk = () => {
    //Guard

    if (selectedCategories.length !== 0) {
      dispatch(deleteCategoriesBulk({ categoryIds: selectedCategories }));
    } else {
      toast.error("No Categories to delete ");
    }
  };
  const searchInput = (values) => {
    // Dispatching the filter with the new search value
    dispatch(setFilter({ ...filters, search: values.search }));
  };

  return (
    <div>
      <div className=" flex  items-center gap-3">
        <Link
          to={"/items/product"}
          className=" bg-blue-400  hover:bg-blue-500 text-center text-white w-[100px] rounded-md">
          Products
        </Link>
        <Link
          to={"/items/product/categories"}
          className=" bg-blue-400  hover:bg-blue-500 text-center text-white w-[100px] rounded-md">
          Categories
        </Link>
      </div>
      {/* Bulk Actions */}

      <Hashtag># Product Categories</Hashtag>
      <BulkBar
        item="Category"
        deleteBulk={deleteBulk}
        searchInput={searchInput}
        importPDF={() => handleFileExport(`${importedFileURL}/pdf`)}
        importCSV={() => handleFileExport(`${importedFileURL}/csv`)}
        importXLSX={() => handleFileExport(`${importedFileURL}/xlsx`)}
        withAssign={false}
        setIsModalOpen={() => dispatch(openCategoriesModal())}
      />

      <div className="  mt-2">
        {/* Filter Items  */}
        <Hashtag># All Categories</Hashtag>
        <ItemsFilter
          allItems={allCategories}
          resetFilters={resetFilters}
          setFilter={setFilter}
          search={filters.search}
          middleFilterTitle="Type"
        />
      </div>

      {/* Modal */}
      <AddCategory
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />

      {/* Table */}
      <div className=" my-2">
        <CategoriesTable
          setIsModalOpen={setIsModalOpen}
          componentRef={componentRef}
        />
      </div>
    </div>
  );
};

export default ProductCategories;
