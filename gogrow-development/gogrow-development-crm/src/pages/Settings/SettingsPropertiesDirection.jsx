import { useEffect, useRef } from "react";
import BulkBar from "../Items/BulkBarWithDispatch";
import { useDispatch, useSelector } from "react-redux";
import SettingsTable from "../../components/Settings/Lead/SettingsTable";
import {
  editPropertyDirection,
  fetchSettingsPropertyDirection,
  openPropertyDirectionModal,
  toggleAllSettingDirectionSelection,
  toggleSettingsDirectionSelection,
} from "../../Store/settingsPropertyDirection/settingsPropertyDirectionSlice";
import AddPropertyDirection from "../../components/Settings/Property/AddPropertyDirection";

const SettingsPropertiesDirection = () => {
  const columns = ["@", " # ", "ID", "Direction Property", "Option"];
  const componentRef = useRef();
  const dispatch = useDispatch();

  // Table Data - Bulk Ids
  const {
    settingsPropertyDirection,
    settingsPropertyDirectionBulk,
    error,
    loading,
  } = useSelector((state) => state.propertyDirection);

  useEffect(() => {
    dispatch(fetchSettingsPropertyDirection()); // Fetch data on component mount
  }, [dispatch]);

  const handleEditPropertyDirection = (row) => {
    dispatch(editPropertyDirection(row));
  };

  const openModal = () => dispatch(openPropertyDirectionModal());
  return (
    <div>
      {/* Filter Bulk */}
      <BulkBar
        withOutImport={true}
        componentRef={componentRef}
        item="Direction"
        setIsModalOpen={openModal}
      />

      {/* Modal */}
      <AddPropertyDirection />

      {/* Table */}
      <div className="mt-2">
        <SettingsTable
          columns={columns}
          toggleAllSelection={toggleAllSettingDirectionSelection}
          toggleSelection={toggleSettingsDirectionSelection}
          componentRef={componentRef}
          handleEdit={handleEditPropertyDirection}
          openModal={openModal}
          tableData={settingsPropertyDirection} // Use the Redux-fetched data
          checkedList={settingsPropertyDirectionBulk} // Selected items
        />
      </div>
    </div>
  );
};

export default SettingsPropertiesDirection;
