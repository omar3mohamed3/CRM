const SubSidebar = ({ toggleSide, children, width }) => {
  return (
    <div
      // className={`fixed grid z-40 w-[280px] top-40 grid-cols-12 transition-left duration-500 ease-in-out ${
      className={`  grid z-40 ${
        width ? width : " w-[180px]"
      }  grid-cols-12 transition-left duration-500 ease-in-out ${
        toggleSide ? "left-[300px]" : "left-[90px]"
      }`}>
      <div className="space-y-2 col-span-12 py-4   text-[15px]   bg-white  shadow-card  rounded-card  ">
        {children}
      </div>
      <div className=" col-span-8"></div>
    </div>
  );
};

export default SubSidebar;
