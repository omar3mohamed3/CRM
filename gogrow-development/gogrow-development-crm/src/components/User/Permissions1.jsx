import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPermissions,
  fetchUserPermissions,
  postPermissions,
} from "../../Store/usersSlice/permissionsSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Permissions = () => {
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const { permissions, userPermissions, loading } = useSelector(
    (state) => state.permissions
  );

  // Fetch available permissions and user's permissions when component mounts
  useEffect(() => {
    dispatch(fetchPermissions());
    dispatch(fetchUserPermissions(userId));
  }, [dispatch, userId]);

  // Initial values based on userPermissions
  const initialValues =
    permissions.length > 0 && userPermissions.permissions
      ? {
          ...permissions.reduce((acc, permission) => {
            acc[permission.feature] = permission.capabilities.filter(
              (capability) =>
                userPermissions.permissions
                  .map((perm) => perm.toLowerCase()) // Normalize user permissions to lowercase
                  .includes(capability.toLowerCase()) // Compare with capability in lowercase
            );
            return acc;
          }, {}),
        }
      : {};

  // Validation schema
  const validationSchema = Yup.object().shape({
    ...permissions.reduce((acc, permission) => {
      acc[permission.feature] = Yup.array(); // Allow an array for each feature
      return acc;
    }, {}),
  });

  const onSubmit = (values) => {
    const selectedPermissions = Object.values(values).flat();
    dispatch(
      postPermissions({
        permissions: { permissions: selectedPermissions },
        userId,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("User Permissions have  been changed");
        dispatch(fetchUserPermissions(userId));
      });
  };

  const handleCheckboxChange = (setFieldValue, feature, capability, values) => {
    const selectedCapabilities = values[feature] || [];

    if (selectedCapabilities.includes(capability)) {
      const updatedArray = selectedCapabilities.filter(
        (item) => item !== capability
      );
      setFieldValue(feature, updatedArray);
    } else {
      setFieldValue(feature, [...selectedCapabilities, capability]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 h-full py-2">
      {permissions.length > 0 && (
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({ setFieldValue, values }) => (
            <Form className="px-4 flex flex-col justify-between h-full py-2">
              <div className="w-full">
                <table className="w-full border-collapse font-normal text-[15px] leading-[23px] text-[#737B8B]">
                  <thead>
                    <tr className="bg-white">
                      <th className="border font-normal text-[15px] leading-[23px] border-gray-300 px-4 py-2 text-left">
                        Feature
                      </th>
                      <th className="border font-normal text-[15px] leading-[23px] border-gray-300 px-4 py-2 text-left">
                        Capabilities
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-white"}>
                        <td className="border border-gray-300 align-top px-4 py-2">
                          <div>{item.feature}</div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="gap-2">
                            {item.capabilities.map((capability, capIndex) => (
                              <div
                                key={capIndex}
                                className="flex items-center">
                                <Field
                                  type="checkbox"
                                  id={`${item.feature}-${capability}`}
                                  name={`${item.feature}`}
                                  value={capability}
                                  checked={values[item.feature]?.includes(
                                    capability
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(
                                      setFieldValue,
                                      item.feature,
                                      capability,
                                      values
                                    )
                                  }
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
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="rounded-[8px] my-[30px] w-[100px] text-white px-1 py-1 bg-customBlue text-[14px] leading-[23px]">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Permissions;
