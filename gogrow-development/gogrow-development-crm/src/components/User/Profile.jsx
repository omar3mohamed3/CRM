import { useState } from "react";
import logo from "/Logo.png";

import { Field } from "formik";
import { MdOutlineModeEditOutline } from "react-icons/md";
import UserField from "./UserField";
import UserPasswordField from "./UserPasswordField";

const Profile = ({ setFieldValue }) => {
  const [previewImage, setPreviewImage] = useState(logo);

  return (
    <div>
      {/* Image */}
      <div className=" text-[14px] leading-[21px] font-bold">Profile Image</div>
      <div className="flex items-center justify-center">
        <div className="relative">
          <img
            src={previewImage || logo}
            className="rounded-full h-[30vh] w-[30vh]"
            alt="Company Logo"
          />
          <Field name="userImage">
            {({ field, form, meta }) => (
              <div className="hidden">
                <input
                  id="userImage"
                  name="userImage"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("userImage", file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mt-1"
                />
                {meta.touched && meta.error && <div>{meta.error}</div>}
              </div>
            )}
          </Field>
          {/* Edit Image */}
          <label
            htmlFor="userImage"
            className="bottom-2 cursor-pointer border-[2px] border-white right-4 z-10 flex absolute justify-center w-6 h-6 items-center p-4 rounded-full bg-[#1492E6]">
            <div className="bottom-0 border-[1px] border-white right-0 flex z-20 justify-center w-5 p-3 h-5 items-center rounded-full bg-[#1492E6]">
              <MdOutlineModeEditOutline className="absolute text-white" />
            </div>
          </label>
        </div>
      </div>
      {/* INFO */}
      <div>
        <UserField
          label={"First Name"}
          name={"firstName"}
          id={"firstName"}
          placeholder={"Ahmed"}
          type={"text"}
        />
        <UserField
          label={"Last Name"}
          name={"lastName"}
          id={"lastName"}
          placeholder={"Hany"}
          type={"text"}
        />
        <UserField
          label={"Email"}
          name={"email"}
          id={"email"}
          placeholder={"Ahmedhany2@gmail.com"}
          type={"text"}
        />
        <UserField
          label={"Phone"}
          name={"phone"}
          id={"phone"}
          placeholder={"01241254541"}
          type={"text"}
        />
        <UserField
          label={"Facebook"}
          name={"facebook"}
          id={"facebook"}
          placeholder={"https://www.facebook.com/gogogrow/"}
          type={"text"}
        />
        <UserField
          label={"LinkedIn"}
          name={"linkedIn"}
          id={"linkedIn"}
          placeholder={"https://www.facebook.com/gogogrow/"}
          type={"text"}
        />
        <UserPasswordField
          label={"Password"}
          name={"password"}
          id={"password"}
          placeholder={" "}
          type={"password"}
        />
      </div>
    </div>
  );
};

export default Profile;
