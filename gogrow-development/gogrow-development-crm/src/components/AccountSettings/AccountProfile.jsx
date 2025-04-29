import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import logo from "/Logo.png";
import {
  fetchProfile,
  updateProfilePicture,
} from "../../Store/AccountSettings/profileSlice";

const AccountProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const [profilePicture, setProfilePicture] = useState(logo);

  // Fetch the profile picture on component mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Update profilePicture state when profile is fetched
  useEffect(() => {
    if (profile) {
      setProfilePicture(profile.photo_url || logo); // Ensure to use photo_url
    }
  }, [profile]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      // Dispatch action to update profile picture
      dispatch(updateProfilePicture(formData));

      // Preview the uploaded image
      const reader = new FileReader();
      reader.onload = (e) => setProfilePicture(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="w-full h-[50%] shadow-card bg-opacity-15 rounded-card z-0 absolute top-0 left-0 bg-borderGray" />
      <div className="relative z-10">
        <h2 className="text-lg font-bold">Change Profile</h2>
        <p className="text-sm text-gray-600 mb-4">
          Change your profile picture from here
        </p>
        <div className="flex justify-center mb-4">
          {loading ? (
            <div className="loader">Loading...</div> // Loading state
          ) : (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-[35vh] h-[35vh] rounded-full"
            />
          )}
        </div>
        <div className="flex justify-center space-x-2">
          <label className="bg-[#2697E0] w-[111px] flex items-center justify-center text-center h-[32px] text-white rounded cursor-pointer hover:bg-[#1d8ad3]">
            Upload
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*"
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Allowed JPG, GIF or PNG. Max size of 800K
        </p>
        {error && <p className="text-red-500">{error}</p>}{" "}
      </div>
    </>
  );
};

export default AccountProfile;
