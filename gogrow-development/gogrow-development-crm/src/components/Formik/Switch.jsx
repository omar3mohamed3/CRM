import { useState } from "react";

const Switch = ({ check, active }) => {
  const [checked, setChecked] = useState(
    active == "active" ? true : false || false
  );
  const handleSwitch = () => {
    setChecked((check) => !check);
    check();
  };
  return (
    <label className="relative mt-2 inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={handleSwitch}
        checked={checked}
      />
      <div className="w-11 h-6  bg-borderGray peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300   rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all   peer-checked:bg-[#6CD08B]"></div>
    </label>
  );
};
export default Switch;
