import UserTime from "../../components/User/UserTime";
// import UserProfile from "../../components/User/UserProfile";
import UserNote from "../../components/User/UserNote";

import { useParams } from "react-router-dom";
import { useRef } from "react";
import UserProfile from "../../components/User/UserProfile1";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const { id } = useParams(); // for data
  const componentRef = useRef(); // To print Table
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      {/* Four Boxs */}
      <UserTime />
      <div className=" py-2 ">
        <span className=" font-bold">{user?.name}</span> - Last Active:{" "}
        {user?.last_login} ago
      </div>
      <div className=" grid grid-cols-2 gap-3">
        <UserProfile />
        <div className="    h-full   gap-6 ">
          {/* <div className="   row-span-2"> */}
          <UserNote />
          {/* </div> */}
          {/* <div className="  flex-grow row-span-3">
            <UserAssign />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
