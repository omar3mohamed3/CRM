import { useEffect, useRef } from "react";

import BulkBar from "../Items/BulkBarWithDispatch";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLeadStatus,
  deleteLeadStatusesBulk,
  editLeadStatus,
  fetchSettingsLeadStatus,
  openLeadStatusModal,
  setFilter,
  setNextStatusPage,
  setPreviousStatusPage,
  toggleAllSettingStatusSelection,
  toggleSettingsStatusSelection,
} from "../../Store/settingsLeadStatusSlice/settingsLeadStatusSlice";

import AddLeadStatus from "../../components/Settings/Lead/AddLeadStatus";
import SettingsTable from "../../components/Settings/Lead/SettingsTable";
import toast from "react-hot-toast";
import { handleFileExport } from "../../Store/Common/downloadFiles";
import { module_id, URL } from "../../Url/url";
const importedFileURL = `${URL}modules/${module_id()}/lead-statuses/export`;
const SettingsLeadStatus = () => {
  const columns = ["@", " # ", "ID", "Status Name", "Option"];
  const componentRef = useRef();
  const dispatch = useDispatch();

  // Table Data - Bulk Ids
  const {
    settingsLeadsStatus,
    settingsLeadsStatusBulk,
    error,
    loading,
    pagination,
    filters,
  } = useSelector((state) => state.leadStatus);

  useEffect(() => {
    dispatch(
      fetchSettingsLeadStatus({ ...filters, page: pagination.currentPage })
    ); // Fetch data on component mount
  }, [dispatch, filters, pagination.currentPage]);

  const handleEditLeadStatus = (row) => {
    dispatch(editLeadStatus(row));
  };

  const tableData = settingsLeadsStatus.map((status) => ({
    id: status.id,
    status: status.status_name,
  }));

  const openModal = () => dispatch(openLeadStatusModal());

  const nextpage = () => {
    dispatch(setNextStatusPage());
  };

  const previouspage = () => {
    dispatch(setPreviousStatusPage());
  };

  // Delete Status
  const handleDeleteStatus = (status) => {
    dispatch(deleteLeadStatus(status.id)).then(() =>
      toast.success(`Delete Lead ${status.name} Successfully`)
    );
  };
  // Delete Bulk of Leads
  const deleteBulk = () => {
    //Guard

    if (settingsLeadsStatusBulk.length !== 0) {
      dispatch(deleteLeadStatusesBulk({ statusIds: settingsLeadsStatusBulk }));
    } else {
      toast.error("No Services to delete ");
    }
  };
  const searchInput = (values) => {
    // Dispatching the filter with the new search value
    dispatch(setFilter({ ...filters, search: values.search }));
  };
  return (
    <div className=" flex flex-col">
      {/* Filter Bulk */}
      <BulkBar
        withOutImport={true}
        componentRef={componentRef}
        item="Status"
        setIsModalOpen={openModal}
        deleteBulk={deleteBulk}
        searchInput={searchInput}
        importPDF={() => handleFileExport(`${importedFileURL}/pdf`)}
        importCSV={() => handleFileExport(`${importedFileURL}/csv`)}
        importXLSX={() => handleFileExport(`${importedFileURL}/xlsx`)}
        withAssign={false}
      />

      {/* Modal */}
      <AddLeadStatus />

      {/* Table */}
      <div className="mt-2 flex-grow">
        <SettingsTable
          loading={loading}
          deleteSettings={handleDeleteStatus}
          nextpage={nextpage}
          previouspage={previouspage}
          pagination={pagination}
          columns={columns}
          toggleAllSelection={toggleAllSettingStatusSelection}
          toggleSelection={toggleSettingsStatusSelection}
          componentRef={componentRef}
          handleEdit={handleEditLeadStatus}
          openModal={openModal}
          tableData={tableData} // Use the Redux-fetched data
          checkedList={settingsLeadsStatusBulk} // Selected items
        />
      </div>
    </div>
  );
};

export default SettingsLeadStatus;
