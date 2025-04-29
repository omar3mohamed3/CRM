import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { IoIosLaptop } from "react-icons/io";
import { SlScreenSmartphone } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDevices,
  signOutFromAllDevices,
  signOutFromDevice,
} from "../../Store/AccountSettings/devicesSlice";

const AccountDevices = () => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.devicesList);
  const loading = useSelector((state) => state.devices.loading);
  const [showPopup, setShowPopup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isAllDevices, setIsAllDevices] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    // Fetch devices on component mount
    dispatch(fetchDevices());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopup = (deviceId) => {
    setShowPopup((prevState) => (prevState === deviceId ? null : deviceId));
  };

  const handleSignOut = (device) => {
    setSelectedDevice(device);
    setIsAllDevices(false);
    setShowModal(true);
    setShowPopup(null);
  };

  const handleSignOutAllDevices = () => {
    setIsAllDevices(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDevice(null);
    setIsAllDevices(false);
  };

  const confirmSignOut = () => {
    if (isAllDevices) {
      dispatch(signOutFromAllDevices()).then(() => dispatch(fetchDevices()));
    } else {
      dispatch(signOutFromDevice(selectedDevice.token_id)).then(() =>
        dispatch(fetchDevices())
      );
    }
    closeModal();
  };

  // const devices = [
  //   { id: 0, title: "iPhone 14" },
  //   { id: 1, title: "Macbook Air" },
  //   { id: 2, title: "iPhone 14" },
  //   { id: 3, title: "Macbook Air" },
  // ];

  return (
    <div className="relative">
      <h2 className="text-lg font-bold mb-[2px]">Devices</h2>
      {/* <p className="text-sm text-gray-600 mb-4">
        Lorem ipsum dolor sit amet consectetur adipiscing elit frum.
      </p> */}
      <button
        onClick={handleSignOutAllDevices}
        className="bg-[#1492E6] text-white px-3 py-1 rounded-[24px] mb-4 hover:bg-[#1d8ad3]">
        Sign Out From All Devices
      </button>
      <ul className="space-y-2 max-h-[280px] overflow-y-auto">
        {devices.map((device) => (
          <li
            key={device.id}
            className="flex justify-between items-center py-2 border-b">
            <div className="flex items-center">
              <span className="text-xl mr-2">
                {device.device === "iPhone 14" ? (
                  <SlScreenSmartphone />
                ) : (
                  <IoIosLaptop className="text-[25px]" />
                )}
              </span>
              <div>
                <p className="font-medium">{device.device}</p>
                <p className="text-sm text-gray-500">
                  {device.location} , {device.last_login}
                </p>
              </div>
            </div>
            <div className="relative">
              <MoreVertical
                onClick={() => togglePopup(device.token_id)}
                className="text-primary cursor-pointer"
              />
              {showPopup === device.token_id && (
                <div
                  ref={popupRef}
                  className="absolute -left-[100px] w-[100px] top-0 bg-white border rounded-md shadow-md z-10">
                  <button
                    onClick={() => handleSignOut(device)}
                    className="text-sm w-full h-full text-primary hover:text-white rounded-md hover:bg-red-500">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Sign Out</h3>
            <p>
              Are you sure you want to sign out from{" "}
              <strong>
                {isAllDevices ? "all devices" : selectedDevice.title}
              </strong>
              ?
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded-md hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={confirmSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDevices;
