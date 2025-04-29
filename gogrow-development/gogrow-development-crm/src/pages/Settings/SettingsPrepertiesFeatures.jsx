import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import BulkBar from "../Items/BulkBarWithDispatch";
import SettingsTable from "../../components/Settings/Lead/SettingsTable";
import AddPropertyFeatures from "../../components/Settings/Property/AddPropertyFeatures";
import {
  deletePropertyFeature,
  deletePropertyFeaturesBulk,
  editPropertyFeature,
  fetchSettingsPropertyFeatures,
  openPropertyFeaturesModal,
  setFilter,
  setNextFeaturePage,
  setPreviousFeaturePage,
  toggleAllSettingFeaturesSelection,
  toggleSettingsFeatureSelection,
} from "../../Store/settingsPropertyFeatures/settingsPropertyFeaturesSlice";

const SettingsPropertiesFeatures = () => {
  const columns = ["@", " # ", "ID", "Other Features", "Option"];
  const componentRef = useRef();
  const dispatch = useDispatch();

  // Table Data - Bulk Ids
  const {
    settingsPropertyFeatures,
    settingsPropertyFeaturesBulk,
    error,
    loading,
    filters,
    pagination,
  } = useSelector((state) => state.propertyFeatures);

  useEffect(() => {
    dispatch(
      fetchSettingsPropertyFeatures({
        ...filters,
        page: pagination.currentPage,
      })
    ); // Fetch data on component mount
  }, [dispatch, filters, pagination.currentPage]);

  const tableData = settingsPropertyFeatures.map((type) => ({
    id: type.id,
    status: type.name, // Ensure the correct property names
  }));

  const handleEditPropertyFeatures = (row) => {
    dispatch(editPropertyFeature(row));
  };

  const openModal = () => dispatch(openPropertyFeaturesModal());

  const nextPage = () => {
    dispatch(setNextFeaturePage());
  };

  const previousPage = () => {
    dispatch(setPreviousFeaturePage());
  };

  // Delete Property Type
  const handleDeletePropertyFeature = (propertyType) => {
    dispatch(deletePropertyFeature(propertyType.id)).then(() =>
      toast.success(
        `Delete Property Type ${propertyType.type_name} Successfully`
      )
    );
  };
  const deleteBulk = () => {
    if (settingsPropertyFeaturesBulk.length !== 0) {
      dispatch(
        deletePropertyFeaturesBulk({
          propertyFeatureIds: settingsPropertyFeaturesBulk,
        })
      )
        // .then(() => toast.success("Bulk delete successful!"))
        .catch((err) => toast.error(`Error: ${err.message}`));
    } else {
      toast.error("No Features to delete");
    }
  };

  const searchInput = (values) => {
    // Implement search functionality if needed

    dispatch(setFilter({ ...filters, search: values.search }));
  };

  return (
    <div className="flex flex-col">
      {/* Filter Bulk */}
      <BulkBar
        withOutImport={true}
        componentRef={componentRef}
        item="Features"
        setIsModalOpen={openModal}
        deleteBulk={deleteBulk}
        searchInput={searchInput}
        withAssign={false} // Adjust as needed
      />

      {/* Modal */}
      <AddPropertyFeatures />

      {/* Table */}
      <div className="mt-2 flex-grow">
        <SettingsTable
          loading={loading}
          columns={columns}
          nextpage={nextPage}
          pagination={pagination}
          previouspage={previousPage}
          deleteSettings={handleDeletePropertyFeature}
          toggleAllSelection={toggleAllSettingFeaturesSelection}
          toggleSelection={toggleSettingsFeatureSelection}
          componentRef={componentRef}
          handleEdit={handleEditPropertyFeatures}
          openModal={openModal}
          tableData={tableData} // Use the Redux-fetched data
          checkedList={settingsPropertyFeaturesBulk} // Selected items
        />
      </div>
    </div>
  );
};

export default SettingsPropertiesFeatures;
