import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAllUsersSelection,
  toggleUsersSelection,
} from "../../Store/usersSlice/usersSlice";
import CardLayout from "../CardLayout";
import Switch from "../Formik/Switch";

const UsersTable = ({ componentRef }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, usersServices } = useSelector((state) => state.users);

  const toModule = (id) => {
    navigate(`${id}`);
  };

  const columns = [
    { name: "Select", width: "w-16" },
    { name: "Full name", width: "w-1/4" },
    { name: "Email", width: "w-1/4" },
    { name: "Roles", width: "w-1/6" },
    { name: "Last login", width: "w-1/6" },
    { name: "Action", width: "w-1/6" },
  ];

  const handleSelectAll = () => {
    const allIds = users.map((row) => row.id);

    dispatch(toggleAllUsersSelection(allIds));
  };

  const handleSelect = (id) => {
    dispatch(toggleUsersSelection(id));
  };

  return (
    <CardLayout>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-primary uppercase">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3  `}>
                  {index === 0 ? (
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={usersServices.length === users.length}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  ) : (
                    col.name
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((row, index) => (
              <tr
                key={row.id}
                className="bg-white border-b hover:bg-gray-50"
                onClick={() => toModule(row.id)}>
                <td
                  onClick={(e) => e.stopPropagation()}
                  className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={usersServices.includes(row.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelect(row.id);
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="w-10 h-10 rounded-full mr-3"
                      src={row.icon}
                      alt={`${row.fullName} avatar`}
                    />
                    <span>{row.fullName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{row.email}</td>
                <td className="px-6 py-4">{row.role}</td>
                <td className="px-6 py-4">{row.LastLogin}</td>
                <td
                  onClick={(e) => e.stopPropagation()}
                  className="px-6 py-4">
                  <Switch name={`actions[${index}]`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardLayout>
  );
};

export default UsersTable;
