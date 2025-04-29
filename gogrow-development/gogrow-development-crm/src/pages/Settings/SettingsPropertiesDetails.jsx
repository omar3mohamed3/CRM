import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  editPropertyDetails,
  fetchSettingsPropertyDetails,
  openPropertyDetailsModal,
  toggleAllSettingDetailsSelection,
  toggleSettingsDetailsSelection,
} from "../../Store/settingsPropertyDetails/settingsPropertyDetailsSlice";
import SettingsTable from "../../components/Settings/Lead/SettingsTable";
import AddPropertyDetails from "../../components/Settings/Property/AddPropertyDetails";
import BulkBar from "../Items/BulkBarWithDispatch";

const SettingsPropertiesDetails = () => {
  const columns = ["@", " # ", "ID", "Other Details", "Option"];
  const componentRef = useRef();
  const dispatch = useDispatch();

  // Table Data - Bulk Ids
  const {
    settingsPropertyDetails,
    settingsPropertyDetailsBulk,
    error,
    loading,
  } = useSelector((state) => state.propertyDetails);

  useEffect(() => {
    dispatch(fetchSettingsPropertyDetails()); // Fetch data on component mount
  }, [dispatch]);

  const handleEditPropertyDetails = (row) => {
    dispatch(editPropertyDetails(row));
  };

  const openModal = () => dispatch(openPropertyDetailsModal());
  return (
    <div>
      {/* Filter Bulk */}
      <BulkBar
        withOutImport={true}
        componentRef={componentRef}
        item="Details"
        setIsModalOpen={openModal}
      />

      {/* Modal */}
      <AddPropertyDetails />

      {/* Table */}
      <div className="mt-2">
        <SettingsTable
          columns={columns}
          toggleAllSelection={toggleAllSettingDetailsSelection}
          toggleSelection={toggleSettingsDetailsSelection}
          componentRef={componentRef}
          handleEdit={handleEditPropertyDetails}
          openModal={openModal}
          tableData={settingsPropertyDetails} // Use the Redux-fetched data
          checkedList={settingsPropertyDetailsBulk} // Selected items
        />
      </div>
    </div>
  );
};

export default SettingsPropertiesDetails;
