const MinColumn = ({ h1 = 20, h2 = 80, amount = 30, month = "Jun" }) => {
  return (
    <div className=" h-[120px] flex flex-col  items-center gap-1">
      <div>{amount}</div>
      <div className={`  ${h2} w-2 bg-[#EBEFF2] rounded-full `} />
      <div className={`  ${h1} w-2 bg-[#0688DC] rounded-full `} />
      <div className=" text-[12px]">{month}</div>
    </div>
  );
};

export default MinColumn;
