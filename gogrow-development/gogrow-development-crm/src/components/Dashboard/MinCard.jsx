import NormalFont from "../NormalFont";

import CardHeader from "../CardHeader";

const MinCard = ({
  header,
  subHeader,
  color = "green",
  persentage,
  count,
  children,
}) => {
  return (
    <div className=" flex  h-full justify-between   flex-col bg-white shadow-card rounded-[18px] py-[38px] px-[28px]">
      <div className=" flex   items-center justify-between">
        <div>
          <CardHeader>{header}</CardHeader>
          <NormalFont>{subHeader}</NormalFont>
        </div>
        <div>
          {count && (
            <div className=" text-[18px] text-center leading-[26px]">
              {count}
            </div>
          )}
          {persentage && (
            <div
              className={` rounded-full ${
                color === "green"
                  ? " text-[#4BD08B] bg-[#DFFFF3] border-[#4BD08B]"
                  : " text-[#FACA7D] border-[#F8C076] bg-[#FFF6EA]"
              }  border py-[2px] px-[12px]  `}>
              {persentage}
            </div>
          )}
        </div>
      </div>
      {/* Cart */}
      {children}
    </div>
  );
};

export default MinCard;
