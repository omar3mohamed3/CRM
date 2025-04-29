import { useRef, useState } from "react";

import UsersTable from "../../components/User/UsersTablecop";
import { useNavigate } from "react-router-dom";
import BulkBar from "../Items/BulkBarWithDispatch";
import Hashtag from "../../components/Hashtag";
import {
  deleteUsersBulk,
  fetchUsers,
  setSearch,
} from "../../Store/usersSlice/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { handleFileExport } from "../../Store/Common/downloadFiles";
import { module_id, URL } from "../../Url/url";

const importedFileURL = `${URL}modules/${module_id()}/users/export`;
const Users = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentRef = useRef();
  const { selectedUsers, pagination, search } = useSelector(
    (state) => state.users
  );
  // Delete Bulk of Leads
  const deleteBulk = () => {
    //Guard
    if (selectedUsers.length !== 0) {
      dispatch(deleteUsersBulk(selectedUsers))
        .unwrap()
        .then(() => {
          toast.success(`Deleted Users Successfully`);
          // Refetch users after deletion
          dispatch(
            fetchUsers({ page: pagination.currentPage, search: search })
          );
        })
        .catch((error) => {
          toast.error(`Failed to delete team: ${error.message}`);
        });
    } else {
      toast.error("No Lead to delete ");
    }
  };

  const searchInput = (values) => {
    dispatch(setSearch(values.search));
  };
  const navigate = useNavigate();
  return (
    <div className=" h-full  ">
      {/* Bulk Actions */}
      <Hashtag># Users</Hashtag>
      <BulkBar
        item="User Member"
        componentRef={componentRef}
        searchInput={searchInput}
        deleteBulk={deleteBulk}
        withAssign={false}
        importPDF={() => handleFileExport(`${importedFileURL}/pdf`)}
        importCSV={() => handleFileExport(`${importedFileURL}/csv`)}
        importXLSX={() => handleFileExport(`${importedFileURL}/excel`)}
        setIsModalOpen={() => navigate("/users/adduser")}
      />

      {/* Table */}
      <div className=" py-2">
        <UsersTable componentRef={componentRef} />
      </div>
    </div>
  );
};

export default Users;
