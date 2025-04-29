import Hashtag from "../../components/Hashtag";
import AccountProfile from "../../components/AccountSettings/AccountProfile";
import AccountDevices from "../../components/AccountSettings/AccountDevices";
import AccountDetails from "../../components/AccountSettings/AccountDetails";

const AccountSettings = () => {
  return (
    <div className="container mx-auto   py-1  ">
      <Hashtag># Account Setting</Hashtag>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Change Profile Section */}
        <div className="bg-white p-4 relative  rounded-card  shadow-card">
          <AccountProfile />
        </div>
        {/* Devices Section */}
        <div className="bg-white p-4  rounded-card  shadow-card">
          <AccountDevices />
        </div>
      </div>

      {/* Personal Details Section */}
      <div className="bg-white p-4   mt-4 rounded-card  shadow-card">
        <AccountDetails />
      </div>
    </div>
  );
};

export default AccountSettings;
