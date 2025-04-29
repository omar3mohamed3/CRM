import { ErrorMessage, Field } from "formik";
import MainItemText from "../Items/MainItemText";

const ItemTotalPriceField = ({
  name,
  id,
  label,
  placeholder,
  type,
  readOnly = false,
  values,
  apiError,
}) => {
  return (
    <div className={`  grid grid-cols-12    `}>
      <label
        htmlFor={id}
        className="  col-span-3">
        <MainItemText>{label}:</MainItemText>
      </label>
      <div className="  col-span-9">
        <Field
          className="   py-1 px-2 placeholder:text-[18px] leading-[26px] font-medium w-full border max-w-[270px] border-borderGray rounded-[3px] focus:outline-none"
          type={type}
          value={values}
          readOnly={readOnly}
          placeholder={placeholder}
          name={name}
          id={id}
        />
        <ErrorMessage
          name={name}
          component={"div"}
          className=" text-red-500"
        />
        {apiError && <div className=" text-red-500">{apiError}</div>}
      </div>
    </div>
  );
};

export default ItemTotalPriceField;
