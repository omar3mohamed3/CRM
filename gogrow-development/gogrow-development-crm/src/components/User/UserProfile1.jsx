import { useState } from "react";
import Permissions from "./Permissions1";
import Profile from "./Profile1";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [status, setStatus] = useState("profile");
  const { userInfo } = useSelector((states) => states.auth);

  return (
    <div className="  rounded-card py-3  shadow-card bg-white">
      <div className=" border-b px-4 ">
        <button
          onClick={() => setStatus("profile")}
          className={`  text-[16px] font-bold leading-[23px] border-b-[2px] ${
            status === "profile" ? "border-[#2697E0]" : " border-transparent"
          }
           border-opacity-75 mr-[43px]`}>
          Profile
        </button>
        {userInfo?.identity === "admin" && (
          <button
            onClick={() => setStatus("permissions")}
            className={`  text-[16px] font-bold leading-[23px] border-b-[2px] ${
              status === "permissions"
                ? "border-[#2697E0]"
                : " border-transparent"
            }  border-opacity-75 mr-[43px]`}>
            Permissions
          </button>
        )}
      </div>
      {status === "profile" && <Profile setStatus={setStatus} />}
      {status === "permissions" && userInfo?.identity === "admin" && (
        <Permissions />
      )}
    </div>
  );
};
export default UserProfile;
