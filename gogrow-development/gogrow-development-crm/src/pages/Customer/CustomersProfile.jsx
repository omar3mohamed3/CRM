import BankInfo from "../../components/Customers/BankInfo";
import CompanyInfo from "../../components/Customers/CompanyInfo";
import PublicInfo from "../../components/Customers/PublicInfo";
import SocialInfo from "../../components/Customers/SocialInfo";

const CustomersProfile = () => {
  return (
    <div className=" grid grid-cols-12 gap-4">
      <div className="  col-span-6">
        <CompanyInfo />
      </div>
      <div className=" col-span-6 pb-2 ">
        <div className=" mb-4">
          <SocialInfo />
        </div>
        <div className=" mb-4">
          <PublicInfo />
        </div>
        <div>
          <BankInfo />
        </div>
      </div>
    </div>
  );
};

export default CustomersProfile;
