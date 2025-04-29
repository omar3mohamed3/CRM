import React from "react";

const SampleDataTable = () => {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100 border-b border-gray-300">
          {[
            "Name",
            "Position",
            "Email Address",
            "Website",
            "Phone",
            "Lead Value",
            "Company",
            "City",
            "Address",
            "State",
            "Zip Code",
          ].map((header) => (
            <th
              key={header}
              className="p-2 border border-borderGray text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          {Array(11)
            .fill("Sample Data")
            .map((data, index) => (
              <td
                key={index}
                className="p-2 border border-borderGray">
                {data}
              </td>
            ))}
        </tr>
      </tbody>
    </table>
  );
};

export default SampleDataTable;
