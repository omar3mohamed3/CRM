import { GoKebabHorizontal } from "react-icons/go";
import Switch from "../Formik/Switch";
import Table from "../Dashboard/Table";
import moduleIcon from "/images.png";
import { useNavigate } from "react-router-dom";

const CustomersTable = () => {
  const navigate = useNavigate();
  const toModule = () => {
    navigate("profile");
  };
  const columns = ["Customer", "Modules", "Date Deal", "Action", ""];
  const tableData = [
    {
      icon: moduleIcon,
      customer: "Ahmed Hany",
      module: "Modules Sales",
      latestDeal: "March, 2024",
      action: false,
    },
    {
      icon: moduleIcon,
      customer: "Ahmed Hany",
      module: "Modules Sales",
      latestDeal: "March, 2024",
      action: false,
    },
    {
      icon: moduleIcon,
      customer: "Ahmed Hany",
      module: "Modules Sales",
      latestDeal: "March, 2024",
      action: false,
    },
    {
      icon: moduleIcon,
      module: "Modules Sales",
      customer: "Ahmed Hany",
      latestDeal: "March, 2024",
      action: false,
    },
    {
      icon: moduleIcon,
      module: "Modules Sales",
      customer: "Ahmed Hany",
      latestDeal: "March, 2024",
      action: false,
    },
  ];

  const handleButtonClick = (e) => {
    e.stopPropagation();
    console.log("test"); // Prevent row's onClick event
    // Handle button-specific logic here if needed
  };
  return (
    <Table
      columns={columns}
      header="Modules Control"
      subHeader="Modules"
      count={5}>
      {tableData.map((row, index) => (
        <tr
          onClick={toModule}
          key={index}
          className="border-b  cursor-pointer last:border-b-0 text-[15px] font-medium leading-[23px]">
          <td className="py-5 ">
            <div className=" flex gap-2 items-center">
              <img
                src={row.icon}
                alt="modules"
                className=" w-10 rounded-full"
              />
              {row.customer}
            </div>
          </td>
          <td className="py-5 text-center ">{row.module}</td>
          <td className="py-5 text-center">{row.latestDeal}</td>
          {row.status && (
            <td className="py-5 text-center ">
              <span className="bg-green-100  text-green-400 border border-green-400 text-xs font-medium px-3 py-[1px] rounded-full">
                {row.status}
              </span>
            </td>
          )}
          <td
            onClick={handleButtonClick}
            className="py-5  cursor-default text-center">
            <Switch name={`actions[${index}]`} />
          </td>
          <td className="py-5 text-center">
            <button className="text-gray-400 hover:text-gray-600">
              <GoKebabHorizontal
                className=" text-[16px] rotate-90"
                size={16}
              />
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default CustomersTable;
