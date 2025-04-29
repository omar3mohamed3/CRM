import Switch from "../Formik/Switch";
import { useNavigate } from "react-router-dom";
import CardLayout from "../CardLayout";
import { useDispatch, useSelector } from "react-redux";
import TableFooter from "../TableFooter";
import {
  activeUser,
  deleteUser,
  fetchUsers,
  setNextUserPage,
  setPreviousUserPage,
  toggleAllUsersSelection,
  toggleUsersSelection,
} from "../../Store/usersSlice/usersSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../Layout/Loader";

const UsersTable = ({ componentRef }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, selectedUsers, search, pagination, loading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers({ page: pagination?.currentPage, search: search }));
  }, [dispatch, pagination?.currentPage, search]);

  const handleSelectAll = () => {
    const allIds = users.map((row) => row.id);
    dispatch(toggleAllUsersSelection(allIds));
  };

  const handleSelect = (id) => {
    dispatch(toggleUsersSelection(id));
  };

  const toModule = (id) => {
    navigate(`${id}`);
  };
  const columns = ["@", "Full name", "Email", "Roles", "Last login", "Action"];

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  const handledeleteTeam = (user) => {
    dispatch(deleteUser(user.id))
      .unwrap()
      .then(() => {
        toast.success(`Deleted user "${user.name}" Successfully`);
        // Refetch teams after deletion
        dispatch(fetchUsers({ page: pagination.currentPage, search: search }));
      })
      .catch((error) => {
        toast.error(`Failed to delete user: ${error.message}`);
      });
  };

  const nextpage = () => {
    dispatch(setNextUserPage());
  };

  const previouspage = () => {
    dispatch(setPreviousUserPage());
  };

  return (
    <CardLayout>
      <div
        ref={componentRef}
        className="relative min-h-[65vh] flex flex-col ">
        <table className="w-full  table-fixed">
          <thead>
            <tr className="border-b">
              {columns.map((col, index) => (
                <th
                  key={col}
                  className={`${
                    index === 0
                      ? "w-12"
                      : index !== columns.length - 1
                      ? "text-left"
                      : "text-center"
                  } pb-3 text-[20px] leading-[30px] font-semibold`}>
                  {index === 0 ? (
                    <div className="flex justify-center items-center h-full">
                      <input
                        className="w-4 h-4"
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedUsers?.length === users.length}
                      />
                    </div>
                  ) : (
                    <div className="pr-4">{col}</div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className=" h-full">
                <td
                  colSpan={columns.length}
                  className="py-4 h-[400px] text-center">
                  <Loader />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr className=" h-full">
                <td
                  colSpan={columns.length}
                  className="py-4 h-[400px] text-center">
                  No Users
                </td>
              </tr>
            ) : (
              users.map((row, index) => (
                <tr
                  onClick={() => toModule(row.id)}
                  key={index}
                  className="border-b cursor-pointer last:border-b-0 text-[14px] font-medium leading-[21px]">
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 py-4">
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selectedUsers?.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                      />
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex gap-2 items-center">
                      <img
                        src={row.photo}
                        alt="modules"
                        className="w-10 rounded-full"
                      />
                      {row.name}
                    </div>
                  </td>
                  <td className="py-5 text-left">{row.email}</td>
                  <td className="py-5 text-left">{row.role_name}</td>
                  <td className="py-5 text-left">{row.last_login}</td>
                  <td
                    onClick={handleButtonClick}
                    className="py-5 cursor-default text-center">
                    <Switch
                      active={row.status}
                      check={() =>
                        dispatch(activeUser(row.id))
                          .unwrap()
                          .catch((error) => toast.error(error.message))
                      }
                      name={`actions[${index}]`}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className=" mt-auto">
          <TableFooter
            loading={loading}
            next={nextpage}
            previous={previouspage}
            from={pagination.from}
            to={pagination.to}
            currentPage={pagination.currentPage}
            totalPages={pagination.lastPage}
            total={pagination.total}
          />
        </div>
      </div>
    </CardLayout>
  );
};

export default UsersTable;
