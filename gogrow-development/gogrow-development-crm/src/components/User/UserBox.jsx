import CardLayout from "../CardLayout";

const UserBox = ({ title, time }) => {
  return (
    <CardLayout>
      <div className=" font-bold text-[14px] leading-[21px] text-[#2697E0] text-opacity-75">
        {title}
      </div>
      <div className=" font-bold text-[14px] leading-[21px]  ">{time}</div>
    </CardLayout>
  );
};

export default UserBox;
