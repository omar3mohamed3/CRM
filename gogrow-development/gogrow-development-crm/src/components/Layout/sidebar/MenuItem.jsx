import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";

const MenuItem = ({
  icon,
  label,
  toggleSide = true,
  to = "#",
  button,
  setSubSide,
  children,
  noPadding,
}) => {
  const location = useLocation();
  // Links
  const [popup, setPopup] = useState(false);
  // Button
  const [open, setOpen] = useState(false);

  return button ? (
    <div>
      <button
        onMouseLeave={() => setPopup(false)}
        onClick={() => setOpen((open) => !open)}
        onMouseEnter={() => setPopup(true)}
        className={`flex  justify-between items-center relative px-3 ${
          noPadding ? " " : " pl-[27px] "
        } py-3 space-x-3 ${
          //  Color location
          location.pathname.includes(to)
            ? " hove:bg-yellowprimary bg-yellowlight "
            : " "
        } cursor-pointer ${
          toggleSide ? " w-[90%] " : " justify-end w-[80%] "
        } rounded-r-[23px] h-[45px] hover:bg-yellowlight  bg-opacity-45 text-primary   transition-colors`}>
        {/* Show label when sidebar is grow */}
        <div className=" w-full flex justify-between items-center">
          {toggleSide && (
            <div className=" text-[17px] leading-[25px]">{label}</div>
          )}

          {/* Arrow */}
          <TiArrowSortedDown
            className={`${
              open ? "  rotate-180 " : " "
            } duration-200 ease-linear transition-all `}
          />
        </div>
      </button>
      {open && children}
    </div>
  ) : (
    <Link
      to={to}
      onMouseLeave={() => setPopup(false)}
      onMouseEnter={() => setPopup(true)}
      className={`flex items-center relative px-3 ${
        noPadding ? " " : " pl-[27px] "
      } py-3 space-x-3 ${
        //  Color location
        location.pathname.includes(to)
          ? " hove:bg-yellowprimary bg-yellowlight "
          : " "
      } cursor-pointer ${
        toggleSide ? " w-[90%] " : " justify-end w-[80%] "
      } rounded-r-[23px] h-[45px] hover:bg-yellowlight  bg-opacity-45 text-primary   transition-colors`}>
      {/* Icon */}
      {icon && <div>{icon}</div>}

      {/* Show label when sidebar is grow */}
      {toggleSide && <div className=" text-[17px] leading-[25px]">{label}</div>}

      {/* Show Popup when sidebar is small */}
      {/* {popup && !toggleSide && (
        <div className=" z-50 text-[12px]   bg-white left-[70px]  px-2 py-1 rounded-lg   border">
          {label}
        </div>
      )} */}
    </Link>
  );
};

export default MenuItem;
