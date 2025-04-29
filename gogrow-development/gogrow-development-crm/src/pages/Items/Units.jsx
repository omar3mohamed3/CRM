import { useEffect, useRef, useState } from "react";
import Hashtag from "../../components/Hashtag";

import ItemsFilter from "./ItemsFilter";

import PropertyTable from "../../components/Items/Property/PropertyTable";
import AddProperty from "../../components/Items/Property/AddProperty";
import {
  deletePropertiesBulk,
  deleteProperty,
  fetchAllProperties,
  openPropertyModal,
  resetFilters,
  setFilter,
} from "../../Store/propertyiesSlice/propertyiesSlice";
import { useDispatch, useSelector } from "react-redux";
import BulkBar from "./BulkBarWithDispatch";
import { deleteProductsBulk } from "../../Store/productsSlice/productsSlice";
import toast from "react-hot-toast";
import { handleFileExport } from "../../Store/Common/downloadFiles";
import { module_id, URL } from "../../Url/url";

const importedFileURL = `${URL}modules/${module_id()}/properties/export`;

const Units = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentRef = useRef();
  const dispatch = useDispatch();

  const { filters, propertiesServices, allProperties } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    dispatch(fetchAllProperties());
  }, [dispatch]);

  // Delete Bulk of Leads
  const deleteBulk = () => {
    //Guard
    if (propertiesServices.length !== 0) {
      dispatch(deletePropertiesBulk({ propertyIds: propertiesServices }));
    } else {
      toast.error("No Properties to delete ");
    }
  };

  const searchInput = (values) => {
    // Dispatching the filter with the new search value
    dispatch(setFilter({ ...filters, search: values.search }));
  };

  return (
    <div>
      {/* Bulk Actions */}

      <Hashtag># Property</Hashtag>
      <BulkBar
        item="Property"
        deleteBulk={deleteBulk}
        withAssign={false}
        searchInput={searchInput}
        importPDF={() => handleFileExport(`${importedFileURL}/pdf`)}
        importCSV={() => handleFileExport(`${importedFileURL}/csv`)}
        importXLSX={() => handleFileExport(`${importedFileURL}/excel`)}
        componentRef={componentRef}
        setIsModalOpen={() => dispatch(openPropertyModal())}
      />

      <div className="  mt-2">
        {/* Filter Items  */}
        <Hashtag># All Property</Hashtag>
        <ItemsFilter
          middleFilterTitle="Type"
          allItems={allProperties}
          resetFilters={resetFilters}
          setFilter={setFilter}
          search={filters.search}
        />
      </div>

      {/* Modal */}
      <AddProperty />

      {/* Table */}
      <div className=" my-2">
        <PropertyTable componentRef={componentRef} />
      </div>
    </div>
  );
};

export default Units;
