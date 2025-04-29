import { Formik, Form } from "formik";
import * as Yup from "yup";
import SampleDataTable from "./SampleDataTable";
import SingleSelectFilterDropdown from "../../../pages/Leads/SingleSelectFilterDropdown";
import { fetchLeadStatuses } from "../../../Store/leadsSlice/statusSlice/statusSlice";
import { fetchLeadsSources } from "../../../Store/leadsSlice/sourceSlice";
import { fetchAssignedUsers } from "../../../Store/leadsSlice/AssignedUsersSlice";
import { fetchProductTypes } from "../../../Store/leadsSlice/ProductTypeSlice";
import { fetchProductDetails } from "../../../Store/leadsSlice/productDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { importLeads } from "../../../Store/leadsSlice/importLeadsSlice";
import { fetchCountries } from "../../../Store/leadsSlice/countriesSlice";

const ImportForm = () => {
  const [productId, setProductId] = useState(null);
  const dispatch = useDispatch();
  const { statuses } = useSelector((state) => state.leadsStatus);
  const { sources } = useSelector((state) => state.leadsSoruce);
  const { users } = useSelector((state) => state.assignedUsers);
  const { productTypes } = useSelector((state) => state.productType);
  const { products } = useSelector((state) => state.productDetails);

  const { importLoading, importError, skipped_leads } = useSelector(
    (state) => state.importleads
  );

  const productTypeWithOutCategories = productTypes.filter(
    (type) => type.id != 1
  );

  const { countries } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchLeadStatuses());
    dispatch(fetchLeadsSources());
    dispatch(fetchAssignedUsers());
    dispatch(fetchProductTypes());
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (productId == null) return;
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required("Required"),
    status: Yup.string().required("Required"),
    source: Yup.string().required("Required"),
    product_type_id: Yup.string().required("Required"),
    product_related_id: Yup.string().required("Required"),
    assigned: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    // Create FormData to send the file and other fields
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("source_id", values.source);
    formData.append("status_id", values.status);
    formData.append("assigned_to", values.assigned);
    formData.append("country_id", values.country_id);
    formData.append("product_type_id", values.product_type_id);
    formData.append("product_related_id", values.product_related_id);

    // Dispatch the importLeads thunk
    dispatch(importLeads(formData));

    if (importError) console.error(" Error ", importError);
  };

  return (
    <div>
      <SampleDataTable />
      <Formik
        initialValues={{
          file: null,
          status: "",
          source: "",
          assigned: "",
          product_type_id: "",
          product_related_id: "",
          country_id: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ setFieldValue, errors, touched, setFieldTouched }) => (
          <Form>
            <div className=" grid grid-cols-2">
              <div>
                <div className="mt-4">
                  <label className="block mb-1">Choose CSV File</label>
                  <input
                    type="file"
                    name="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                    className="border p-2 w-[400px]"
                  />
                  {errors.file && touched.file && (
                    <div className="text-red-600">{errors.file}</div>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block mb-1">Status (fallback)</label>

                  <SingleSelectFilterDropdown
                    setFieldValues={(value) => setFieldValue("status", value)}
                    setTouched={() => setFieldTouched("status", true)}
                    filters={statuses}
                    placeholder="status"
                    width="w-[400px]"
                  />

                  {errors.status && touched.status && (
                    <div className="text-red-600">{errors.status}</div>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block mb-1">Product Type (fallback)</label>

                  <SingleSelectFilterDropdown
                    setFieldValues={(value) => {
                      setFieldValue("product_type_id", value);
                      setProductId(value);
                    }}
                    setTouched={() => setFieldTouched("product_type_id", true)}
                    filters={productTypeWithOutCategories}
                    placeholder="Item Type"
                    up=" text "
                    width="w-[400px]"
                  />

                  {errors.product_type_id && touched.product_type_id && (
                    <div className="text-red-600">{errors.product_type_id}</div>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block mb-1">Product (fallback)</label>

                  <SingleSelectFilterDropdown
                    setFieldValues={(value) => {
                      setFieldValue("product_related_id", value);
                    }}
                    setTouched={() =>
                      setFieldTouched("product_related_id", true)
                    }
                    filters={products}
                    placeholder="Item"
                    up=" text "
                    width="w-[400px]"
                  />

                  {errors.product_related_id && touched.product_related_id && (
                    <div className="text-red-600">
                      {errors.product_related_id}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block mb-1">Source (fallback)</label>

                  <SingleSelectFilterDropdown
                    setFieldValues={(value) => setFieldValue("source", value)}
                    setTouched={() => setFieldTouched("source", true)}
                    filters={sources}
                    placeholder="source"
                    up=" text "
                    width="w-[400px]"
                  />

                  {errors.source && touched.source && (
                    <div className="text-red-600">{errors.source}</div>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block mb-1">Responsible (Assigned)</label>

                  <SingleSelectFilterDropdown
                    setFieldValues={(value) => setFieldValue("assigned", value)}
                    setTouched={() => setFieldTouched("assigned", true)}
                    filters={users}
                    width="w-[400px]"
                    up=" text "
                    placeholder="Assigned"
                  />

                  {errors.assigned && touched.assigned && (
                    <div className="text-red-600">{errors.assigned}</div>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block mb-1">Country</label>

                  <SingleSelectFilterDropdown
                    setFieldValues={(value) =>
                      setFieldValue("country_id", value)
                    }
                    setTouched={() => setFieldTouched("country_id", true)}
                    filters={countries}
                    width="w-[400px]"
                    up=" text "
                    placeholder="country_id"
                  />

                  {errors.country_id && touched.country_id && (
                    <div className="text-red-600">{errors.country_id}</div>
                  )}
                </div>
              </div>
              <div>
                {skipped_leads.length > 0 && (
                  <div className=" mt-5 ">
                    <h3>Skipped Leads</h3>
                    <ul className="  h-[560px]   overflow-y-auto   space-y-2">
                      {skipped_leads.map((lead, index) => (
                        <li
                          className=" rounded-md border px-2 py-1"
                          key={index}>
                          <div>
                            {index + 1} - Name : {lead?.name}
                          </div>
                          <div>
                            <span className=" text-red-500">Reason</span> :{" "}
                            {lead?.reason}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                disabled={importLoading}
                type="submit"
                className=" w-[111px] h-[32px] bg-[#2697E0] text-white rounded">
                Import
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ImportForm;
