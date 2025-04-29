import UserTime from "../../components/User/UserTime";
import UserProfile from "../../components/User/UserProfile";
import UserNote from "../../components/User/UserNote";
import UserAssign from "../../components/User/UserAssign";
import { useParams } from "react-router-dom";
import { useRef } from "react";

// IMportant
//////////////////////// GO TO UserInfo1.jsx ///////////////////////////
const UserInfo = () => {
  const { id } = useParams(); // for data
  const componentRef = useRef(); // To print Table
  return (
    <div>
      {/* Four Boxs */}
      <UserTime />
      <div className=" py-2 ">
        <span className=" font-bold">Ahmed Hany</span> - Last Active: 5 months
        ago
      </div>
      <div className=" grid grid-cols-2 gap-3">
        <UserProfile />
        <div className=" grid grid-rows-2 ">
          <div className=" row-span-3 ">
            <UserNote />
          </div>
          <UserAssign />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
