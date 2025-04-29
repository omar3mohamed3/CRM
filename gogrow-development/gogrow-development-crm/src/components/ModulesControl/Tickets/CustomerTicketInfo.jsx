import React from "react";

import { Link } from "react-router-dom";

const CustomerTicketInfo = () => {
  return (
    <div className="bg-white p-4  max-w-sm mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
        <div className="text-sm space-y-2">
          <p className=" flex justify-between items-center">
            <span className="font-semibold">Email: </span>
            <Link
              to="mailto:info@gogogrow.com"
              className="text-blue-600">
              info@gogogrow.com
            </Link>
          </p>
          <p className=" flex justify-between items-center">
            <span className="font-semibold ">Phone: </span>01213141819
          </p>
          <p className=" flex justify-between items-center">
            <span className="font-semibold">Location: </span>Maadi, Cairo
          </p>
          <p className=" flex justify-between items-center">
            <span className="font-semibold">Local time: </span>06:30am
          </p>
          <p className=" flex justify-between items-center">
            <span className="font-semibold">Language: </span>English
          </p>
        </div>
      </div>
      <div className=" border-t pt-1">
        <h2 className="text-lg font-semibold mb-2">Device Info</h2>
        <div className="text-sm space-y-1">
          <p className=" flex justify-between items-center">
            <span className="font-semibold">ID </span>
            <Link
              to="#"
              className="text-blue-600">
              #60650-5050-5050
            </Link>
          </p>
          <p className=" flex justify-between items-center">
            <span className="font-semibold">IP </span>107.116.91.201
          </p>
          <p className=" flex justify-between items-center">
            <span className="font-semibold">Browser </span>Google Chrome
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerTicketInfo;
