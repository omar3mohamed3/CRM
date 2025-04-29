import CardHeader from "../CardHeader";

const Table = ({ header, subHeader, count, children, columns }) => {
  return (
    <div className="bg-white rounded-[18px] h-full shadow-card p-6 ">
      {header && (
        <div className=" flex  mb-5 justify-between items-center">
          <CardHeader>{header}</CardHeader>
          <div className="flex gap-2 items-center">
            <span className="  text-[12px] font-bold px-[6px] py-[2px] border border-borderGray">
              {count}
            </span>
            <span>{subHeader}</span>
          </div>
        </div>
      )}
      <div className="  overflow-y-auto">
        {/* <div className=" h-[50vh] overflow-y-auto"> */}
        <table className=" w-full     overflow-y-auto  ">
          <thead>
            <tr className="border-b">
              {columns.map((col, index) => (
                <th
                  key={col}
                  className={` ${
                    index === 0 ? "text-left" : "text-center"
                  } pb-3 text-[20px] leading-[30px] font-semibold`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
