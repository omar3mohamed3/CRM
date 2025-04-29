import icon1 from "/arrowup.png";

const ReportBox = ({
  mainText = "10000 K",
  subText = "Today`s Sale",
  image = icon1,
  color,
}) => {
  return (
    <div className=" px-4 py-5  flex justify-between border-borderGray border rounded-lg ">
      <div>
        <div
          className={`  text-[20px] font-bold ${
            color ? " text-[#0085DB]" : " text-[#84CC16] "
          }`}>
          {mainText}
        </div>
        <div className=" text-[15px] font-bold  text-primary">{subText}</div>
      </div>
      <div>
        <img
          src={image}
          alt="icon1"
          className=" w-[48px] h-[48px]"
        />
      </div>
    </div>
  );
};

export default ReportBox;
