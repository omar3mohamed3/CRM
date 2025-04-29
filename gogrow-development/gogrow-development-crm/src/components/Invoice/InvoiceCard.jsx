import React from "react";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { IoClose } from "react-icons/io5";

const InvoiceCard = ({ setShowInvoice }) => {
  return (
    <div className="   w-full    ">
      <div className="flex items-center justify-between space-x-4 mb-6">
        <div className="flex items-center space-x-4  ">
          <div className="bg-pink-100 p-3 rounded-full">
            <span className="text-xl font-bold">GG</span>
          </div>
          <div className="  ">
            <p className="text-[28px] leading-[44px] font-bold">Go Grow</p>
            <p className="text-sm font-medium text-gray-500">Sales Modules</p>
          </div>
        </div>
        <button
          onClick={() => setShowInvoice(null)}
          className=" p-2 hover:bg-slate-100 rounded-md">
          <IoClose className=" text-[18px]" />
        </button>
      </div>

      <div className="mb-6 text-primary px-3">
        <div className=" border-b border-borderGray  border-opacity-50  mb-2">
          <h3 className="text-sm font-bold mb-2">CUSTOMER INFO</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className=" font-medium flex gap-1 items-center">
              <IoIosMail />
              Work:
            </span>
            <Link
              href="mailto:info@go-gogrow.com"
              className="text-blue-500">
              info@go-gogrow.com
            </Link>
          </div>
          <div className="flex justify-between pl-5">
            <span className="font-medium">Personal:</span>
            <Link
              href="mailto:mahran12@gmail.com"
              className="text-blue-500">
              mahran12@gmail.com
            </Link>
          </div>
          <div className="flex justify-between">
            <span className="font-medium flex gap-2 items-center">
              <BsFillTelephoneFill className=" text-[14px]" />
              Work:
            </span>
            <span>0221844450</span>
          </div>
          <div className="flex justify-between pl-5">
            <span className="font-medium">Personal:</span>
            <span>01240040050</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium flex gap-2 items-center">
              <ImLocation className=" text-[14px]" />
              Location:
            </span>
            <span>71 St AlNasr Maadi, Cairo</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-primary mb-6 px-3">
        <div className="flex justify-between pl-5">
          <span className="font-medium">Modules:</span>
          <span>Sales</span>
        </div>
        <div className="flex justify-between pl-5">
          <span className="font-medium">Date Subscribe:</span>
          <span>12 March, 2024</span>
        </div>
        <div className="flex justify-between pl-5">
          <span className="font-medium">Invoice Date:</span>
          <span>12 April, 2024</span>
        </div>
        <div className="flex justify-between pl-5">
          <span className="font-medium">Amount:</span>
          <span>20,000 EGP</span>
        </div>
        <div className="flex justify-between pl-5">
          <span className="font-medium">Terms:</span>
          <span>Cash - Visa</span>
        </div>
        <div className="flex justify-between pl-5">
          <span className="font-medium">Due Date:</span>
          <span>Duration 5 days</span>
        </div>
      </div>

      <div className="flex justify-between py-3 px-3 pl-6 mx-2 border border-opacity-50 border-borderGray border-l-0 border-r-0 items-center mb-6">
        <span className="font-medium">Payment Date:</span>
        <div className="text-blue-500">13 April 2024</div>
      </div>

      <div className="  ">
        <span className="text-sm font-bold">EXPORT INVOICE</span>
        <div className=" flex justify-center mt-9">
          <button className="text-gray-700  justify-center    hover:text-black flex flex-col items-center">
            <FiDownload className=" text-[#707070] text-[100px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
