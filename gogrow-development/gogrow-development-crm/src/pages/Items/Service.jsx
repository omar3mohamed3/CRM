import { useEffect, useRef, useState } from "react";
import Hashtag from "../../components/Hashtag";
import ItemsFilter from "./ItemsFilter";
import ServiceTable from "../../components/Items/Service/ServiceTable";
import AddService from "../../components/Items/Service/AddService";
import BulkBar from "./BulkBarWithDispatch";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteServicesBulk,
  fetchAllService,
  fetchService,
  openModal,
  resetFilters,
  setFilter,
} from "../../Store/serviceSlice/serviceSlice";
import toast from "react-hot-toast";
import { handleFileExport } from "../../Store/Common/downloadFiles";
import { module_id, URL } from "../../Url/url";

const importedFileURL = `${URL}modules/${module_id()}/lead-services/export`;

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Edit Modal
  const dispatch = useDispatch();

  const componentRef = useRef();
  const { selectedServices, filters, allServices } = useSelector(
    (state) => state.services
  );

  useEffect(() => {
    dispatch(fetchAllService());
  }, [dispatch]);

  // Delete Bulk of Leads
  const deleteBulk = () => {
    //Guard

    if (selectedServices.length !== 0) {
      dispatch(deleteServicesBulk({ serviceIds: selectedServices }));
    } else {
      toast.error("No Services to delete ");
    }
  };
  const searchInput = (values) => {
    // Dispatching the filter with the new search value
    dispatch(setFilter({ ...filters, search: values.search }));
  };
  return (
    <div>
      {/* Bulk Actions */}
      <Hashtag># Service</Hashtag>
      <BulkBar
        deleteBulk={deleteBulk}
        item="Service"
        componentRef={componentRef}
        searchInput={searchInput}
        importPDF={() => handleFileExport(`${importedFileURL}/pdf`)}
        importCSV={() => handleFileExport(`${importedFileURL}/csv`)}
        importXLSX={() => handleFileExport(`${importedFileURL}/excel`)}
        withAssign={false}
        setIsModalOpen={() => dispatch(openModal())}
      />

      <div className="  mt-2  ">
        {/* Filter Items  */}
        <Hashtag># All Service</Hashtag>
        <ItemsFilter
          allItems={allServices}
          resetFilters={resetFilters}
          setFilter={setFilter}
          search={filters.search}
          middleFilterTitle="Type"
          noAssign={true}
        />
      </div>

      {/* Modal */}
      <AddService
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />

      {/* Table */}
      <div className=" my-2">
        <ServiceTable
          setIsModalOpen={setIsModalOpen}
          componentRef={componentRef}
        />
      </div>
    </div>
  );
};

export default Service;
