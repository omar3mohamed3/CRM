import { useEffect, useRef, useState } from "react";
import Hashtag from "../../components/Hashtag";

import ItemsFilter from "./ItemsFilter";
import ProductsTable from "../../components/Items/Product/ProductsTable";

import AddProduct from "../../components/Items/Product/AddProduct";
import BulkBar from "./BulkBarWithDispatch";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductsBulk,
  fetchAllProducts,
  openProductModal,
  resetFilters,
  setFilter,
} from "../../Store/productsSlice/productsSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { module_id, URL } from "../../Url/url";
import { handleFileExport } from "../../Store/Common/downloadFiles";
import toast from "react-hot-toast";
import { deleteServicesBulk } from "../../Store/serviceSlice/serviceSlice";
import { fetchAllCategories } from "../../Store/categorySlice/categorySlice";

const importedFileURL = `${URL}modules/${module_id()}/products/export`;

const Product = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();

  const { filters, productsServices } = useSelector((state) => state.products);
  const { allCategories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Delete Bulk of Leads
  const deleteBulk = () => {
    //Guard
    if (productsServices.length !== 0) {
      dispatch(deleteProductsBulk({ productIds: productsServices }));
    } else {
      toast.error("No Products to delete ");
    }
  };

  const searchInput = (values) => {
    // Dispatching the filter with the new search value
    dispatch(setFilter({ ...filters, search: values.search }));
  };

  return (
    <div>
      {/* Bulk Actions */}
      <div className=" flex  items-center gap-3">
        <Link
          to={"/items/product"}
          className=" bg-blue-400  hover:bg-blue-500  text-center text-white w-[100px] rounded-md">
          Products
        </Link>
        <Link
          to={"categories"}
          className=" bg-blue-400  hover:bg-blue-500 text-center text-white w-[100px] rounded-md">
          Categories
        </Link>
      </div>
      <Hashtag># Product</Hashtag>
      <BulkBar
        item="Product"
        deleteBulk={deleteBulk}
        searchInput={searchInput}
        importPDF={() => handleFileExport(`${importedFileURL}/pdf`)}
        importCSV={() => handleFileExport(`${importedFileURL}/csv`)}
        importXLSX={() => handleFileExport(`${importedFileURL}/excel`)}
        componentRef={componentRef}
        withAssign={false}
        setIsModalOpen={() => dispatch(openProductModal())}
      />

      {/* Filter Items  */}
      <div className="  mt-2">
        <Hashtag># All Product</Hashtag>
        <ItemsFilter
          noAssign={false}
          middleFilterTitle="Category"
          allItems={allCategories}
          resetFilters={resetFilters}
          setFilter={setFilter}
          search={filters.search}
        />
      </div>

      {/* Modal */}
      <AddProduct />

      {/* Table */}
      <div className=" my-2 ">
        <ProductsTable componentRef={componentRef} />
      </div>
    </div>
  );
};

export default Product;
