import { Field } from "formik";

import SingleSelectFilterDropdown from "../../pages/Leads/SingleSelectFilterDropdown";

const Permissions = ({ permissions, setFieldValue }) => {
  return (
    <div className="px-4 py-2">
      <div className="mb-4 flex flex-col gap-1">
        <label className="text-[14px] leading-[21px] font-bold">Role</label>
        <SingleSelectFilterDropdown
          filters={[
            { label: "Admin", id: 0 },
            { label: "User", id: 1 },
          ]}
          placeholder="Admin"
          width="w-full"
          setFieldValues={(value) => setFieldValue("role", value)}
        />
      </div>

      <div className="w-full">
        <table className="w-full border-collapse font-normal text-[15px] leading-[23px] text-[#737B8B]">
          <thead>
            <tr className="bg-white   ">
              <th className="border font-normal  text-[15px] leading-[23px] border-gray-300 px-4 py-2 text-left">
                Feature
              </th>
              <th className="border font-normal text-[15px] leading-[23px]  border-gray-300 px-4 py-2 text-left">
                Capabilities
              </th>
            </tr>
          </thead>
          <tbody>
            {permissions?.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-white"}>
                {/* className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}> */}
                <td className="border  border-gray-300 align-top px-4 py-2  ">
                  <div>{item.feature}</div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="  gap-2">
                    {item.capabilities.map((capability, capIndex) => (
                      <div
                        key={capIndex}
                        className="flex items-center">
                        <Field
                          type="checkbox"
                          id={`${item.feature}-${capability}`}
                          name={`${item.feature}.${capability}`}
                          className="mr-2"
                        />
                        <label
                          htmlFor={`${item.feature}-${capability}`}
                          className="text-sm">
                          {capability}
                        </label>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Permissions;
