import { Outlet } from "react-router-dom";
import SubSidebar from "../../components/Layout/sidebar/SubSidebar";
import MenuItem from "../../components/Layout/sidebar/MenuItem";
import Hashtag from "../../components/Hashtag";
import { useSelector } from "react-redux";

const ItemsControler = () => {
  const { userInfo } = useSelector((states) => states.auth);
  return (
    <div className=" flex mt-1  gap-2">
      {/* Sidebar */}
      <div>
        <Hashtag># Items</Hashtag>
        <SubSidebar width={" w-[122px]"}>
          {userInfo?.services && (
            <MenuItem
              noPadding
              label="Services"
              to={"services"}
            />
          )}
          {userInfo?.products && (
            <MenuItem
              label="Product"
              noPadding
              to={"product"}
            />
          )}
          {/* <MenuItem
            label="Categories"
            noPadding
            to={"categories"}
          /> */}
          {userInfo?.properties && (
            <MenuItem
              label="Property"
              noPadding
              to={"property"}
            />
          )}
        </SubSidebar>
      </div>
      <div
        className={` ${
          location.pathname === "/leads"
            ? " flex-grow h-[80vh] "
            : " flex-grow h-[82vh]      overflow-auto"
        } `}>
        <Outlet />
      </div>
    </div>
  );
};

export default ItemsControler;
