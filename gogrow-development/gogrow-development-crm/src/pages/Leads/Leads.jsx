import { useRef } from "react";
import LeadsFilter from "./LeadsFilter";
import LeadsTable from "./LeadsTable";

const Leads = () => {
  const componentRef = useRef();
  return (
    <div className=" py-2">
      <LeadsFilter componentRef={componentRef} />
      <div className="   pt-2  ">
        <LeadsTable componentRef={componentRef} />
      </div>
    </div>
  );
};

export default Leads;
