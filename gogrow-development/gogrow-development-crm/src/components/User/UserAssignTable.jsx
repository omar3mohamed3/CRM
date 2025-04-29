import { IoTrashOutline } from "react-icons/io5";
import logo from "/Logo.png";
import { useParams } from "react-router-dom";
import TableFooter from "../TableFooter";

const UserAssignTable = () => {
  const { id } = useParams();
  return (
    <div className="overflow-y-auto h-full w-full text-primary">
      <table className="w-full border-none bg-white border border-gray-200">
        <thead className=" block w-full">
          <tr className="bg-gray-100 w-full flex justify-around">
            <th className="py-3 px-2 text-left text-sm font-medium">Photo</th>
            <th className="py-3 px-2 text-left text-sm font-medium">Name</th>
            <th className="py-3 px-2 text-left text-sm font-medium">
              Category
            </th>
            <th className="py-3 px-2 text-left text-sm font-medium">Price</th>
            <th className="py-3 px-2 text-left text-sm font-medium">Target</th>
            <th className="py-3 px-2 text-left text-sm font-medium">Created</th>
            <th className="py-3 px-2 text-left text-sm font-medium">Options</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto  h-[60vh] block w-full">
          {id &&
            userData.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50 flex w-full">
                <td className="py-3 pl-2 flex items-center w-1/6">
                  <img
                    src={user.photo}
                    alt="photo"
                    className="w-10 h-10 object-cover"
                  />
                </td>
                <td className="py-3 pl-2 text-sm w-1/6">{user.name}</td>
                <td className="py-3 pl-2 text-sm w-1/6">{user.category}</td>
                <td className="py-3 pl-2 text-sm w-1/6">{user.price}</td>
                <td className="py-3 pl-2 text-sm w-1/6">{user.target}</td>
                <td className="py-3 pl-2 text-sm w-1/6">{user.created}</td>
                <td className="py-3 pl-2 text-sm text-center w-1/6">
                  <span className="cursor-pointer flex justify-center hover:text-red-500">
                    <IoTrashOutline />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
        <div className=" mt-auto">
          <TableFooter />
        </div>
      </table>
    </div>
  );
};

export default UserAssignTable;

const userData = [
  {
    id: 1,
    photo: logo,
    name: "Crm",
    category: "Development",
    price: "15.000 K",
    target: "15020 K",
    created: "6 Days ago",
  },
  {
    id: 2,
    photo: logo,
    name: "Crm",
    category: "Development",
    price: "15.000 K",
    target: "15020 K",
    created: "6 Days ago",
  },
  {
    id: 3,
    photo: logo,
    name: "Crm",
    category: "Development",
    price: "15.000 K",
    target: "15020 K",
    created: "6 Days ago",
  },
  {
    id: 4,
    photo: logo,
    name: "Crm",
    category: "Development",
    price: "15.000 K",
    target: "15020 K",
    created: "6 Days ago",
  },
  {
    id: 5,
    photo: logo,
    name: "Crm",
    category: "Development",
    price: "15.000 K",
    target: "15020 K",
    created: "6 Days ago",
  },
  {
    id: 6,
    photo: logo,
    name: "Crm",
    category: "Development",
    price: "15.000 K",
    target: "15020 K",
    created: "6 Days ago",
  },
  {
    id: 7,
    photo: logo,
    name: "Crm",
    category: "Development",
    price: "15.000 K",
    target: "15020 K",
    created: "6 Days ago",
  },
  {
    id: 8,
    photo: logo,
    name: "Crm",
    category: "Development",
    price: "15.000 K",
    target: "15020 K",
    created: "6 Days ago",
  },
  {
    id: 9,
    photo: logo,
    name: "Crm",
    category: "Development",
    price: "15.000 K",
    target: "15020 K",
    created: "6 Days ago",
  },
  {
    id: 10,
    photo: logo,
    name: "Crm",
    category: "Development",
    price: "15.000 K",
    target: "15020 K",
    created: "6 Days ago",
  },
];
