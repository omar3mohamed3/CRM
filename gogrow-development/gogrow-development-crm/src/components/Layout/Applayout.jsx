import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import { useState } from "react";

const Applayout = () => {
  const location = useLocation();
  const [toggleSide, setToggleSide] = useState(true);
  return (
    <div className=" bg-page flex h-screen  gap-1  py-[25px]">
      <div className=" pl-[10px]    ">
        <Sidebar toggleSide={toggleSide} />
      </div>
      <div className="h-full flex-grow-1  grid grid-cols-12    w-full">
        {/* <div className=" col-span-1"></div> */}
        <div className=" col-span-12   w-[100%]">
          <div className=" px-[10px]   mb-1  w-full">
            <Navbar setToggleSide={setToggleSide} />
          </div>
          <main
            className={`w-full h-[83vh] overflow-y-auto ${
              (location.pathname.startsWith("/modules-control") &&
                location.pathname !== "/modules-control") ||
              (location.pathname.startsWith("/customers") &&
                location.pathname !== "/customers")
                ? "pr-[10px]"
                : "px-[9px]"
            }  `}>
            <Outlet />
          </main>
          {/* <div className=" col-span-1"></div> */}
        </div>
      </div>
    </div>
  );
};
// const Applayout = () => {
//   return (
//     <div className=" grid grid-cols-12 bg-page h-screen  gap-5  py-[36px]">
//       <div className=" px-4   col-span-2">
//         <Sidebar />
//       </div>
//       <div className="h-full bg-page col-span-10 w-[90%]   mx-auto">
//         <div>
//           <Navbar />
//         </div>
//         <main>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

export default Applayout;
