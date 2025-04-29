import MinColumn from "./MinColumn";
import MinCard from "./MinCard";
import { useSelector } from "react-redux";

const PaymentChart = ({ deals_by_month }) => {
  return (
    <MinCard
      header="Deals Value"
      // subHeader="Last 7 days"
      // color="orange"
      // persentage="-3.8%"
      // count="12.389"
    >
      <div className=" grid grid-cols-6   gap-y-3    justify-between  items-center">
        {/* <div className=" flex    justify-around  items-center"> */}
        {deals_by_month?.map((month) => (
          <MinColumn
            key={month.month}
            amount={(month.total_amount * 1).toFixed(0)}
            month={month?.Name_month}
            h1={" h-[50%] "}
            h2={" h-[100%] "}
          />
        ))}
      </div>

      {/* Footer */}
      {/* <div>
   
        <div className=" flex justify-between items-center">
          <div className=" flex  gap-2 items-center">
            <div className=" h-[14px] rounded-full border-[#0688DC] border w-[14px]" />
            <NormalFont>Cash</NormalFont>
          </div>
          <NormalFont>52%</NormalFont>
        </div>
        
        <div className=" flex justify-between items-center">
          <div className=" flex  gap-2 items-center">
            <div className=" h-[14px] rounded-full border-[#212121] border w-[14px]" />
            <NormalFont>Credit Card</NormalFont>
          </div>
          <NormalFont>48%</NormalFont>
        </div>
      </div> */}
    </MinCard>
  );
};

export default PaymentChart;
