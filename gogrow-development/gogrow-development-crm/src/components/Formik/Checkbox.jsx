import { Field } from "formik";

const Checkbox = ({ id, name, label }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <Field
            type="checkbox"
            name={name}
            id={id}
            className="w-2 h-2 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
          />
        </div>
        <div className="ml-1 text-sm">
          <label
            htmlFor={id}
            className=" text-primary text-[12px]   leading-[16px]">
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
