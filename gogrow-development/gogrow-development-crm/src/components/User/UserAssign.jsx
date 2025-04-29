import CardLayout from "../CardLayout";
import UserBulkAction from "./UserBulkAction";
import AssignTable from "./UserAssignTable";

const UserAssign = () => {
  return (
    <div className=" mt-6   ">
      <span className="text-lg font-bold leading-6">Assigned</span>
      <div className=" h-full px-1 py-2 shadow-card rounded-card  bg-white">
        <UserBulkAction />
        <AssignTable />
      </div>
    </div>
  );
};

export default UserAssign;
