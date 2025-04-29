import { useEffect, useRef } from "react";
import BulkBar from "../Items/BulkBarWithDispatch";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { handleFileExport } from "../../Store/Common/downloadFiles";
import { module_id, URL } from "../../Url/url";
import {
  deletePropertyType,
  deletePropertyTypesBulk,
  editPropertyType,
  fetchSettingsPropertyType,
  openPropertyTypeModal,
  setFilter,
  setNextUnitTypePage,
  setPreviousUnitTypePage,
  toggleAllSettingTypeSelection,
  toggleSettingsTypeSelection,
} from "../../Store/settingsPropertyType/settingsPropertyTypeSlice";
import AddPropertyType from "../../components/Settings/Property/AddPropertyType";
import { deletePropertiesBulk } from "../../Store/propertyiesSlice/propertyiesSlice";
import SettingsTable from "../../components/Settings/Lead/SettingsTable";

const importedFileURL = `${URL}modules/${module_id()}/property-types/export`;

const SettingsPropertiesType = () => {
  const columns = ["@", " # ", "ID", "Type of Unit", "Option"];
  const componentRef = useRef();
  const dispatch = useDispatch();

  // Table Data - Bulk Ids
  const {
    settingsPropertyType,
    settingsPropertyTypeBulk,
    error,
    loading,
    pagination,
    filters,
  } = useSelector((state) => state.propertyType);

  useEffect(() => {
    dispatch(
      fetchSettingsPropertyType({ ...filters, page: pagination.currentPage })
    ); // Fetch data on component mount
  }, [dispatch, filters, pagination.currentPage]);

  const handleEditPropertyType = (row) => {
    dispatch(editPropertyType(row));
  };

  const tableData = settingsPropertyType.map((type) => ({
    id: type.id,
    status: type.name, // Ensure the correct property names
  }));

  const openModal = () => dispatch(openPropertyTypeModal());

  const nextPage = () => {
    dispatch(setNextUnitTypePage());
  };

  const previousPage = () => {
    dispatch(setPreviousUnitTypePage());
  };

  // Delete Property Type
  const handleDeletePropertyType = (propertyType) => {
    dispatch(deletePropertyType(propertyType.id)).then(() =>
      toast.success(
        `Delete Property Type ${propertyType.type_name} Successfully`
      )
    );
  };

  // Delete Bulk Property Types
  const deleteBulk = () => {
    if (settingsPropertyTypeBulk.length !== 0) {
      dispatch(
        deletePropertyTypesBulk({ propertyTypeIds: settingsPropertyTypeBulk })
      );
    } else {
      toast.error("No Property Types to delete");
    }
  };

  const searchInput = (values) => {
    dispatch(setFilter({ ...filters, search: values.search }));
  };

  return (
    <div className="flex flex-col">
      {/* Filter Bulk */}
      <BulkBar
        withOutImport={true}
        componentRef={componentRef}
        item="Type"
        setIsModalOpen={openModal}
        deleteBulk={deleteBulk}
        searchInput={searchInput}
        importPDF={() => handleFileExport(`${importedFileURL}/pdf`)}
        importCSV={() => handleFileExport(`${importedFileURL}/csv`)}
        importXLSX={() => handleFileExport(`${importedFileURL}/xlsx`)}
        withAssign={false}
      />

      {/* Modal */}
      <AddPropertyType />

      {/* Table */}
      <div className="mt-2 flex-grow">
        <SettingsTable
          loading={loading}
          deleteSettings={handleDeletePropertyType}
          nextPage={nextPage}
          previousPage={previousPage}
          pagination={pagination}
          columns={columns}
          toggleAllSelection={toggleAllSettingTypeSelection}
          toggleSelection={toggleSettingsTypeSelection}
          componentRef={componentRef}
          handleEdit={handleEditPropertyType}
          openModal={openModal}
          tableData={tableData} // Use the Redux-fetched data
          checkedList={settingsPropertyTypeBulk} // Selected items
        />
      </div>
    </div>
  );
};

export default SettingsPropertiesType;
