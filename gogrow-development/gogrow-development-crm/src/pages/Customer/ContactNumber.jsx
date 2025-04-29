import React from "react";
import moduleIcon from "/images.png";
import customerImage from "/public/customer.png";

const ContactNumber = () => {
  return (
    <div className=" grid grid-cols-2 gap-4">
      <div className=" grid gap-4 grid-rows-2 ">
        <div className="  bg-white shadow-card rounded-card p-8">
          <div>
            <h3 className=" leading-[30px] text-[18px]  font-medium">
              First Name
            </h3>
            <div className=" px-2 py-1  w-full border rounded-lg border-borderGray">
              Ahmed
            </div>
          </div>
          <div className=" mt-2">
            <h3 className=" leading-[30px] text-[18px] font-medium">
              Last Name
            </h3>
            <div className=" px-2 py-1  w-full border rounded-lg border-borderGray">
              Hany
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-center gap-3 bg-white shadow-card rounded-card p-8 divide-y divide-borderGray py-2">
          <div className=" flex gap-2 items-center">
            <img
              src={moduleIcon}
              alt="modules"
              className=" w-10 rounded-full"
            />
            <div>
              <div className=" text-[22px] font-bold  leading-[33px]">
                Email
              </div>
              <div>ahmedhany12@gmail.com</div>
            </div>
          </div>
          <div className=" flex gap-2 items-center">
            <img
              src={moduleIcon}
              alt="modules"
              className=" w-10 rounded-full"
            />
            <div>
              <div className=" text-[22px] font-bold  leading-[33px]">
                Phone
              </div>
              <div>012454474122</div>
            </div>
          </div>
        </div>
      </div>
      <div className=" p-8  bg-white shadow-card rounded-card">
        <img
          src={customerImage}
          alt="customer"
          className=" w-full h-[400px]"
        />
      </div>
    </div>
  );
};

export default ContactNumber;
