import Switch from "../../components/Formik/Switch";

import Table from "../../components/Dashboard/Table";
import moduleIcon from "/images.png";
import ModuleHeader from "../../components/ModulesControl/Main/ModuleHeader";
import { TbUsersPlus } from "react-icons/tb";

const ModuleCustomers = () => {
  const columns = ["Modules", "Customers", "Latest Deal", "Action"];

  const tableData = [
    {
      icon: moduleIcon,
      customer: "Ahmed Hany",
      module: "Sales",
      StartDate: 2,
      action: false,
    },
    {
      icon: moduleIcon,
      customer: "Ahmed Hany",
      module: "Sales",
      StartDate: 2,
      action: false,
    },
    {
      icon: moduleIcon,
      customer: "Ahmed Hany",
      module: "Sales",
      StartDate: 2,
      action: false,
    },
    {
      icon: moduleIcon,
      customer: "Ahmed Hany",
      module: "Sales",
      StartDate: 2,
      action: false,
    },
    {
      icon: moduleIcon,
      customer: "Ahmed Hany",
      module: "Sales",
      StartDate: 2,
      action: false,
    },
    {
      icon: moduleIcon,
      customer: "Ahmed Hany",
      module: "Sales",
      StartDate: 2,
      action: false,
    },
    {
      icon: moduleIcon,
      customer: "Ahmed Hany",
      module: "Sales",
      StartDate: 3,
      action: false,
    },
    {
      icon: moduleIcon,
      customer: "Ahmed Hany",
      module: "Sales",
      StartDate: 2,
      action: false,
    },
  ];

  return (
    <div className="    h-full     ">
      <div>
        <ModuleHeader
          icon={<TbUsersPlus />}
          title={"Add New Customer"}
        />
      </div>
      <div className="   pb-5 mt-5">
        <Table
          columns={columns}
          header="Modules Customers"
          subHeader="Customers"
          count={5}>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className="border-b last:border-b-0 text-[15px] font-medium leading-[23px]">
              <td className="py-3 ">
                <div className=" flex gap-2 items-center">
                  <img
                    src={row.icon}
                    alt="modules"
                    className=" w-10 rounded-full"
                  />
                  {row.customer}
                </div>
              </td>
              <td className="py-3 text-center ">{row.module}</td>
              <td className="py-3 text-center">{row.StartDate}</td>
              {row.status && (
                <td className="py-3 text-center ">
                  <span className="bg-green-100  text-green-400 border border-green-400 text-xs font-medium px-3 py-[1px] rounded-full">
                    {row.status}
                  </span>
                </td>
              )}
              <td className="py-3 text-center">
                <Switch name={`actions[${index}]`} />
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default ModuleCustomers;
