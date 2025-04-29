import { Link, useLocation } from "react-router-dom";

const LeadsButtons = ({ linksList, path = "lead" }) => {
  const location = useLocation();

  return (
    <ul className=" ">
      {linksList.map((item) => (
        <li
          key={item.id}
          className={` mt-[9px]  text-[12px] leading-[15px]  w-fit  ${
            `/settings/${path}/${item.link}` === location.pathname
              ? " border-borderGray"
              : " border-transparent"
          }   pl-[15px] border-b  pr-2    `}>
          <Link
            to={`${path}/${item.link}`}
            className=" w-full">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LeadsButtons;
