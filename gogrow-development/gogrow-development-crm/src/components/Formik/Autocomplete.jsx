import { ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";

const Autocomplete = ({
  stepTwo,
  value,
  label,
  name,
  options,
  errors,
  touched,
  formik,
  setDistrictList,
  placeholder,
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState(
    value || formik?.values?.[name] || ""
  );

  useEffect(() => {
    setUserInput(value || formik?.values?.[name] || "");
  }, [value || formik?.values?.[name]]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleChange = (e) => {
    const input = e.currentTarget.value;
    const filtered = options.filter((option) =>
      option.key.toLowerCase().includes(input.toLowerCase())
    );
    setUserInput(input);
    setFilteredOptions(filtered);
    setShowOptions(true);
    formik.setFieldValue(name, input);

    if (name === "city") {
      setDistrictList(input);
    }
  };

  const handleClick = (option) => {
    setUserInput(option.key);
    setFilteredOptions(options);
    setShowOptions(false);
    formik.setFieldValue(name, option.value);

    if (name === "city") {
      setDistrictList(option.key);
    }
  };

  return (
    <div className="relative">
      <label
        className="font-bold text-[14px]"
        htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={userInput}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={() => setShowOptions(false)}
        onFocus={() => setShowOptions(true)}
        className={`bg-white border ${
          errors[name] && touched[name] ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-sm mt-[5px] gap-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
      />
      {showOptions && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-y-auto">
          {filteredOptions.length ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onMouseDown={() => handleClick(option)}>
                {option.key}
              </li>
            ))
          ) : (
            <li className="p-2">لا توجد خيارات</li>
          )}
        </ul>
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500"
      />
    </div>
  );
};

export default Autocomplete;
