import { ErrorMessage, Field } from "formik";
import { PiArrowsCounterClockwiseBold } from "react-icons/pi";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";

const UserPasswordField = ({ id, label, placeholder, name, apiError }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-2  flex flex-col gap-1">
      <label
        htmlFor={id}
        className="  text-primary text-[14px] leading-[21px] font-bold">
        {label}
      </label>
      <div className=" w-full relative">
        <Field
          className="border w-full rounded placeholder:text-opacity-50 border-borderGray py-1 px-2 pr-[70px]"
          name={name}
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
        />
        <div className=" absolute right-0 top-[50%] translate-y-[-50%]">
          {/*   Show Password */}
          <button
            type="button"
            onClick={() => setShow((show) => !show)}
            className=" border-l-[0.5px] border-opacity-45  border-borderGray py-2 px-2">
            {show ? (
              <FiEye className=" text-[#555555]" />
            ) : (
              <GoEyeClosed className=" text-[#555555]" />
            )}
          </button>
          <button
            type="button"
            className=" border-l-[0.5px] border-borderGray  border-opacity-45 py-2 px-2">
            <PiArrowsCounterClockwiseBold className=" text-[#555555]" />
          </button>
        </div>
      </div>
      <div className="text-[9px] leading-[14px] font-medium">
        Note: if you populate this field, password will be changed on this
        member.
      </div>
      <ErrorMessage
        component={"div"}
        name={name}
        className=" text-red-500"
      />
      {apiError && <div className=" text-red-500">{apiError}</div>}
    </div>
  );
};

export default UserPasswordField;
