import * as Yup from "yup";
import LeadHeader from "./LeadHeader";
import { ErrorMessage, Form, Formik } from "formik";
import LeadField from "./leadField";
import SingleSelectFilterDropdown from "./SingleSelectFilterDropdown";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addLead } from "../../Store/leadsSlice/addLeadSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchLeadStatuses } from "../../Store/leadsSlice/statusSlice/statusSlice";
import { fetchLeadsSources } from "../../Store/leadsSlice/sourceSlice";
import { fetchAssignedUsers } from "../../Store/leadsSlice/AssignedUsersSlice";
import { fetchProductTypes } from "../../Store/leadsSlice/ProductTypeSlice";
import { fetchProductDetails } from "../../Store/leadsSlice/productDetailsSlice";
import { fetchCountries } from "../../Store/leadsSlice/countriesSlice";
import { fetchCities } from "../../Store/leadsSlice/citiesSlice";

const AddLead = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorApi, setErrorApi] = useState([]);
  const [productId, setProductId] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const { loading } = useSelector((state) => state.addLead);
  const { statuses } = useSelector((state) => state.leadsStatus);
  const { sources } = useSelector((state) => state.leadsSoruce);
  const { users } = useSelector((state) => state.assignedUsers);
  const { productTypes } = useSelector((state) => state.productType);
  const { products } = useSelector((state) => state.productDetails);
  const { countries } = useSelector((state) => state.countries);
  const { cities } = useSelector((state) => state.cities);

  const productTypeWithOutCategories = productTypes.filter(
    (type) => type.id != 1
  );

  useEffect(() => {
    dispatch(fetchLeadStatuses());
    dispatch(fetchLeadsSources());
    dispatch(fetchAssignedUsers());
    dispatch(fetchProductTypes());
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (countryId) {
      dispatch(fetchCities({ countryId }));
    }
  }, [dispatch, countryId]);

  useEffect(() => {
    if (productId == null) return;
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const initialValues = {
    status: "",
    source: "",
    assigned: "",
    name: "",
    position: "",
    email: "",
    website: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    zip_code: "",
    state: "",
    country: "",
    productType: "",
    product: "",
    leadValue: "",
    description: "",
  };

  const validationSchema = Yup.object({
    status: Yup.string().required("Status is required"),
    source: Yup.string().required("Source is required"),
    assigned: Yup.string().required("Assigned is required"),
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    position: Yup.string()
      .min(2, "Position must be at least 2 characters")
      .required("Position is required"),
    email: Yup.string().email("Invalid email format"),
    // .required("Email is required"),
    website: Yup.string(),
    // .url("Invalid URL"),
    // .required("website is required"),
    phone: Yup.string()
      .matches(/^\+?\d+$/, "Phone number must be digits or start with +")
      .required("Phone is required"),
    company: Yup.string().min(2, "Company must be at least 2 characters"),
    // .required("Company is required")
    zip_code: Yup.string().min(2, "Company must be at least 2 characters"),
    // .required("Company is required")
    state: Yup.string().min(2, "Company must be at least 2 characters"),
    // .required("Company is required")
    address: Yup.string().min(5, "Address must be at least 5 characters"),
    // .required("Address is required")
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    productType: Yup.string().required("Product Type is required"),
    product: Yup.string().required("Product Type is required"),
    leadValue: Yup.number()
      .positive("Lead Value must be greater than 0")
      .required("Lead Value is required"),
    description: Yup.string().min(
      10,
      "Description must be at least 10 characters"
    ),
  });

  const onSubmit = (values) => {
    const leadData = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      company: values.company,
      city: values.city,
      address: values.address,
      needs: values.description, // Assuming description maps to 'needs'
      lead_value: values.leadValue,
      position: values.position,
      // state: null, // Not useable
      country_id: parseInt(values.country, 10), // Assuming country is selected as an ID
      website: values.website,
      // zip_code: null, // Not useable
      source_id: parseInt(values.source, 10),
      status_id: parseInt(values.status, 10),
      assigned_to: parseInt(values.assigned, 10),
      product_related_id: parseInt(values.product, 10),
    };

    dispatch(addLead({ productType: values.productType, leadData }))
      .unwrap() // Unwraps the result from the asyncThunk
      .then(() => {
        toast.success("The lead has been added successfully.");
        navigate("/leads");
      })
      .catch((error) => {
        setErrorApi(error?.errors);
        toast.error(error?.message || error);
      });
  };

  return (
    <div className=" bg-white shadow-card rounded-card px-[20px] py-[23px]">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => {
            return (
              <Form>
                {/* Three Select */}
                <div className="flex justify-between pb-4 space-x-4">
                  <div className="flex flex-col gap-[14px]">
                    <LeadHeader>Status</LeadHeader>
                    <div>
                      <SingleSelectFilterDropdown
                        setFieldValues={(value) =>
                          setFieldValue("status", value)
                        }
                        setTouched={() => setFieldTouched("status", true)}
                        filters={statuses}
                        width="w-[305px]"
                        placeholder="Status"
                      />
                      <ErrorMessage
                        name={"status"}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                      {errorApi && <ShowError error={errorApi.status_id} />}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[14px]">
                    <LeadHeader>Source</LeadHeader>
                    <div>
                      <SingleSelectFilterDropdown
                        setTouched={() => setFieldTouched("source", true)}
                        setFieldValues={(value) =>
                          setFieldValue("source", value)
                        }
                        placeholder="Source"
                        width="w-[305px]"
                        filters={sources}
                      />
                      <ErrorMessage
                        name={"source"}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                      {errorApi && <ShowError error={errorApi.country_id} />}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[14px]">
                    <LeadHeader>Assigned</LeadHeader>
                    <div>
                      <SingleSelectFilterDropdown
                        setTouched={() => setFieldTouched("assigned", true)}
                        placeholder="Assign"
                        setFieldValues={(value) =>
                          setFieldValue("assigned", value)
                        }
                        width="w-[305px]"
                        filters={users}
                      />
                      <ErrorMessage
                        name={"assigned"}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                      {errorApi && <ShowError error={errorApi.assigned_to} />}
                    </div>
                  </div>
                </div>
                <div className="grid relative grid-cols-1 lg:grid-cols-2 border-t pt-2 gap-4">
                  <div className="flex flex-col pl-[20px] gap-5">
                    <div className="w-[450px]">
                      <LeadField
                        name="name"
                        id="name"
                        type="text"
                        label="Name"
                        placeholder="Ahmed Nagy"
                      />
                    </div>
                    <LeadField
                      name="position"
                      id="position"
                      type="text"
                      label="Position"
                      placeholder="Position"
                    />
                    <LeadField
                      name="email"
                      id="email"
                      type="text"
                      label="Email Address"
                      placeholder="none@gmail.com"
                    />
                    <LeadField
                      name="website"
                      id="website"
                      type="text"
                      label="Website"
                      placeholder="Website"
                    />
                    <LeadField
                      name="phone"
                      id="phone"
                      type="text"
                      label="Phone"
                      placeholder="0123456789"
                    />
                    <LeadField
                      name="company"
                      id="company"
                      type="text"
                      label="Company"
                      placeholder="GOGROW"
                    />
                    <LeadField
                      name="address"
                      id="address"
                      type="text"
                      label="Address"
                      placeholder="GOGROW"
                    />
                    <LeadField
                      name="state"
                      id="state"
                      type="text"
                      label="State"
                      placeholder="Cairo"
                    />
                    {/* <LeadField
                      name="city"
                      id="city"
                      type="text"
                      label="City"
                      placeholder="Cairo"
                    /> */}
                    <LeadField
                      name="zip_code"
                      id="zip_code"
                      type="text"
                      label="Zip Code"
                      placeholder="#1245"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-5">
                    <div className="flex flex-col">
                      <LeadHeader>Country</LeadHeader>
                      <div>
                        <SingleSelectFilterDropdown
                          width="w-[450px]"
                          placeholder="Country"
                          setTouched={() => setFieldTouched("country", true)}
                          setFieldValues={(value) => {
                            setFieldValue("country", value);
                            setCountryId(value);
                          }}
                          filters={countries}
                        />
                        <ErrorMessage
                          name={"country"}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                        {errorApi && <ShowError error={errorApi.country_id} />}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <LeadHeader>City</LeadHeader>
                      <div>
                        <SingleSelectFilterDropdown
                          width="w-[450px]"
                          placeholder="City"
                          setTouched={() => setFieldTouched("city", true)}
                          setFieldValues={(value) =>
                            setFieldValue("city", value)
                          }
                          filters={cities}
                        />
                        <ErrorMessage
                          name={"city"}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                        {errorApi && <ShowError error={errorApi.city_id} />}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <LeadHeader>Product Type</LeadHeader>
                      <div>
                        <SingleSelectFilterDropdown
                          setTouched={() =>
                            setFieldTouched("productType", true)
                          }
                          setFieldValues={(value) => {
                            setFieldValue("productType", value);
                            setProductId(value);
                          }}
                          placeholder="Product Type"
                          width="w-[450px]"
                          height="h-[45px]"
                          filters={productTypeWithOutCategories}
                        />
                        <ErrorMessage
                          name={"productType"}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <LeadHeader>Product</LeadHeader>
                      <div>
                        <SingleSelectFilterDropdown
                          setTouched={() => setFieldTouched("product", true)}
                          setFieldValues={(value) => {
                            setFieldValue("product", value);
                          }}
                          placeholder="Product"
                          width="w-[450px]"
                          height="h-[45px]"
                          filters={products}
                        />
                        <ErrorMessage
                          name={"product"}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                        {errorApi && (
                          <ShowError error={errorApi.product_related_id} />
                        )}
                      </div>
                    </div>
                    <div className="w-[450px]">
                      <LeadField
                        name="leadValue"
                        id="leadValue"
                        type="number"
                        label="Lead Value"
                        placeholder="1000"
                      />
                    </div>
                    <div className="w-[450px]">
                      <LeadField
                        name="description"
                        id="description"
                        type="text"
                        className="min-h-[295px]"
                        as="textarea"
                        label="Description"
                        placeholder=""
                      />
                    </div>
                    <div className="flex justify-end mt-auto w-full pr-[50px]">
                      <Link
                        to={"/leads"}
                        className="mr-2 w-[111px]  flex justify-center items-center h-[32px] bg-white border-[#707070] border rounded-md">
                        Cancel
                      </Link>
                      <button
                        disabled={loading}
                        type="submit"
                        className="mr-2 w-[111px] h-[32px] text-white bg-[#2697E0] rounded-md">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddLead;

const ShowError = ({ error }) => <div className=" text-red-500">{error}</div>;
