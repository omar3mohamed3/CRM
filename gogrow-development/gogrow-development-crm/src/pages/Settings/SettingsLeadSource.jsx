import { useEffect, useRef } from "react";
import BulkBar from "../Items/BulkBarWithDispatch";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLeadSource,
  deleteLeadSourcesBulk,
  editLeadSource,
  fetchSettingsLeadSource,
  openLeadSourceModal,
  setFilter,
  setNextSourcePage,
  setPreviousSourcePage,
  toggleAllSettingSourceSelection,
  toggleSettingsSourceSelection,
} from "../../Store/settingsLeadSourceSlice/settingsLeadSourceSlice";
import AddLeadSource from "../../components/Settings/Lead/AddLeadSource";
import SettingsTable from "../../components/Settings/Lead/SettingsTable";
import toast from "react-hot-toast";
import { handleFileExport } from "../../Store/Common/downloadFiles";
import { module_id, URL } from "../../Url/url";
const importedFileURL = `${URL}modules/${module_id()}/lead-sources/export`;

const SettingsLeadSource = () => {
  const columns = ["@", " # ", "ID", "Source Name", "Option"];
  const componentRef = useRef();
  const dispatch = useDispatch();

  // Table Data - Bulk Ids
  const {
    settingsLeadsSource,
    settingsLeadsSourceBulk,
    error,
    loading,
    pagination,
    filters,
  } = useSelector((state) => state.leadSource);

  useEffect(() => {
    dispatch(
      fetchSettingsLeadSource({ ...filters, page: pagination?.currentPage })
    ); // Fetch data on component mount
  }, [dispatch, filters, pagination.currentPage]);

  const handleEditLeadSource = (row) => {
    dispatch(editLeadSource(row));
  };

  const tableData = settingsLeadsSource.map((source) => ({
    id: source.id,
    status: source.source_name,
  }));

  const openModal = () => dispatch(openLeadSourceModal());

  const nextpage = () => {
    dispatch(setNextSourcePage());
  };

  const previouspage = () => {
    dispatch(setPreviousSourcePage());
  };

  // Delete Source
  const handleDeleteSource = (source) => {
    dispatch(deleteLeadSource(source.id)).then(() =>
      toast.success(`Deleted Lead Source ${source.source_name} Successfully`)
    );
  };

  // Delete Bulk of Sources
  const deleteBulk = () => {
    if (settingsLeadsSourceBulk.length !== 0) {
      dispatch(deleteLeadSourcesBulk({ sourceIds: settingsLeadsSourceBulk }));
    } else {
      toast.error("No Sources to delete");
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
        item="Source"
        setIsModalOpen={openModal}
        deleteBulk={deleteBulk}
        searchInput={searchInput}
        importPDF={() => handleFileExport(`${importedFileURL}/pdf`)}
        importCSV={() => handleFileExport(`${importedFileURL}/csv`)}
        importXLSX={() => handleFileExport(`${importedFileURL}/xlsx`)}
        withAssign={false}
      />

      {/* Modal */}
      <AddLeadSource />

      {/* Table */}
      <div className="mt-2 flex-grow">
        <SettingsTable
          loading={loading}
          deleteSettings={handleDeleteSource}
          nextpage={nextpage}
          previouspage={previouspage}
          pagination={pagination}
          columns={columns}
          toggleAllSelection={toggleAllSettingSourceSelection}
          toggleSelection={toggleSettingsSourceSelection}
          componentRef={componentRef}
          handleEdit={handleEditLeadSource}
          openModal={openModal}
          tableData={tableData} // Use the Redux-fetched data
          checkedList={settingsLeadsSourceBulk} // Selected items
        />
      </div>
    </div>
  );
};

export default SettingsLeadSource;
