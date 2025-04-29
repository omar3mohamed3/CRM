import { useEffect, useRef, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactToPrint from "react-to-print";

import SingleSelectFilterDropdown from "../../pages/Leads/SingleSelectFilterDropdown";
import { teamsList } from "../../pages/Leads/FakeLists";
import {
  convertLeadToCustomer,
  fetchLeadInfo,
  toggleLeadStatus,
} from "../../Store/leadsSlice/leadInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
import { updateLead } from "../../Store/leadsSlice/leadsSlice";
import { fetchAssignedUsers } from "../../Store/leadsSlice/AssignedUsersSlice";
import { fetchLeadStatuses } from "../../Store/leadsSlice/statusSlice/statusSlice";
import { fetchLeadsSources } from "../../Store/leadsSlice/sourceSlice";
import { fetchCountries } from "../../Store/leadsSlice/countriesSlice";
import { fetchProductTypes } from "../../Store/leadsSlice/ProductTypeSlice";
import { fetchProductDetails } from "../../Store/leadsSlice/productDetailsSlice";
import { fetchCities } from "../../Store/leadsSlice/citiesSlice";

const LeadProfile = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const { id: leadId } = useParams();
  const dispatch = useDispatch();
  const { loading, lead, convertLeadLoading, progressFailedLoading } =
    useSelector((state) => state.leadInfo);
  const { users } = useSelector((state) => state.assignedUsers);
  const { statuses } = useSelector((state) => state.leadsStatus);
  const { sources } = useSelector((state) => state.leadsSoruce);
  const { countries } = useSelector((state) => state.countries);
  const { productTypes } = useSelector((state) => state.productType);
  const { products } = useSelector((state) => state.productDetails);
  const { cities } = useSelector((state) => state.cities);

  const productTypeWithOutCategories = productTypes.filter(
    (type) => type.id != 1
  );

  // Fetch lead info with ID 9
  useEffect(() => {
    dispatch(fetchLeadInfo(leadId));
    //Lists
    dispatch(fetchAssignedUsers());
    dispatch(fetchLeadStatuses());
    dispatch(fetchLeadsSources());
    dispatch(fetchCountries());
    dispatch(fetchProductTypes());
  }, [dispatch, leadId]);

  useEffect(() => {
    if (countryId) {
      dispatch(fetchCities({ countryId }));
    }
  }, [dispatch, countryId]);

  useEffect(() => {
    if (productId == null) return;
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const [editMode, setEditMode] = useState(false);
  const [leadStatus, setLeadStatus] = useState(false);
  const componentRef = useRef();

  const initialValues = {
    name: lead?.name || "",
    position: lead?.position || "-",
    email: lead?.email || "-",
    website: lead?.website || "-",
    phone: lead?.phone || "01021111123",
    lead_value: lead?.lead_value || "-",
    company: lead?.company || "-",
    address: lead?.address || "-",
    city: lead?.city || "-",
    state: lead?.state || "-",
    country: lead?.country || "-",
    zip_code: lead?.zip_code || "-",
    status_id: lead?.status.id || "New",
    source_id: lead?.source.id || "Direct Lead",
    // defaultLanguage: "System Default",
    assigned_to: lead?.assigned_to.id || "Team #1",
    // created: "2 hour ago",
    // lastContact: "2 hour ago",
    product_related_id: lead?.product_details?.id || "-",
    product_type_id: lead?.product_type_id || "-",
  };

  const handleSubmit = (values) => {
    setEditMode(false); // Exit edit mode after saving
    dispatch(
      updateLead({
        leadId,
        leadData: values,
        productType: values.product_type_id,
      })
    )
      .unwrap()
      .then(() => navigate("/leads"));
  };

  const handleConvert = () => {
    dispatch(convertLeadToCustomer(leadId));
  };

  const handleToggleClick = () => {
    dispatch(toggleLeadStatus(leadId));
  };

  if (loading) return <Loader />;
  // TODO

  return (
    <div className=" h-[60vh]  overflow-y-auto">
      <div className="py-2 flex justify-end items-center gap-2 no-print">
        <button
          disabled={progressFailedLoading}
          onClick={() => {
            setLeadStatus((status) => !status);
            handleToggleClick();
          }}
          className={`hover:bg-[#40bb6e] ${
            lead?.success === "failed" || lead?.success === "Failed"
              ? "bg-[#c54b22] hover:bg-[#df3a15]"
              : "bg-[#d8d143] hover:bg-[#b1bb40]"
          }  rounded-[4px] text-white flex gap-1 items-center px-2 py-px`}>
          <FaRegUserCircle />
          {lead?.success}
        </button>
        <button
          disabled={convertLeadLoading}
          onClick={handleConvert}
          className="hover:bg-[#47da7d] bg-[#22C55E] rounded-[4px] text-white flex gap-1 items-center px-2 py-px">
          <FaRegUserCircle />
          Convert to Customer
        </button>
        <button
          className="hover:bg-white border border-borderGray p-1 bg-[#F2F2F2] rounded-[4px]"
          onClick={() => setEditMode(!editMode)}>
          <BiEdit />
        </button>
        <ReactToPrint
          trigger={() => (
            <button className="hover:bg-white border border-borderGray p-1 bg-[#F2F2F2] rounded-[4px]">
              <AiOutlinePrinter />
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}>
        {({ values, setFieldValue, setFieldTouched }) => (
          <div ref={componentRef}>
            <Form
              id="leadForm"
              className="print-area  h-[54vh]  overflow-y-auto  ">
              {/* <div className="grid  relative grid-cols-2   print-section"> */}
              <div className="  relative      justify-between  gap-8 flex print-section">
                {/* Lead Information */}
                <div className=" flex-grow">
                  <h3 className="text-[16px] w-full bg-[#9BCDFF] bg-opacity-20 mr-7 round-[6px] leading-[30px] font-medium">
                    <span className="px-7">Lead Information</span>
                  </h3>
                  <div className="grid grid-cols-2 w-full">
                    {/* Lead's Info */}
                    <div className="flex flex-col gap-2">
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Name</h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="name"
                          />
                        ) : (
                          <div className="text-[18px]">{values.name}</div>
                        )}
                      </div>
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Position</h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="position"
                          />
                        ) : (
                          <div className="text-[18px]">{values.position}</div>
                        )}
                      </div>
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Email Address</h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="email"
                          />
                        ) : (
                          <div className="text-[18px]">{values.email}</div>
                        )}
                      </div>
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Website</h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="website"
                          />
                        ) : (
                          <div className="text-[18px]">{values.website}</div>
                        )}
                      </div>
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Phone</h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="phone"
                          />
                        ) : (
                          <div className="text-[18px]">{values.phone}</div>
                        )}
                      </div>
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Lead value</h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="lead_value"
                            type="number"
                          />
                        ) : (
                          <div className="text-[18px]">{values.lead_value}</div>
                        )}
                      </div>
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Company</h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="company"
                          />
                        ) : (
                          <div className="text-[18px]">{values.company}</div>
                        )}
                      </div>
                    </div>
                    {/* Lead's Address INFO */}
                    <div className="flex flex-col gap-2">
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Address</h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="address"
                          />
                        ) : (
                          <div className="text-[18px]">{values.address}</div>
                        )}
                      </div>
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">City</h4>
                        {editMode ? (
                          // <Field
                          //   className="text-[18px] border rounded-md p-1"
                          //   name="city"
                          // />
                          <div className="  col-span-9">
                            {/* Select Team For Service */}
                            <SingleSelectFilterDropdown
                              setFieldValues={(value) =>
                                setFieldValue("city", value)
                              }
                              placeholder="City"
                              setTouched={() => setFieldTouched("city", true)}
                              filters={cities}
                              width=" w-full max-w-[180px]"
                            />
                          </div>
                        ) : (
                          <div className="text-[18px]">{values.city}</div>
                        )}
                      </div>
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">State</h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="state"
                          />
                        ) : (
                          <div className="text-[18px]">{values.state}</div>
                        )}
                      </div>
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Country</h4>
                        {editMode ? (
                          // <Field
                          //   className="text-[18px] border rounded-md p-1"
                          //   name="country"
                          // />       <div className=" grid grid-cols-12      ">
                          <div className="  col-span-9">
                            {/* Select Team For Service */}
                            <SingleSelectFilterDropdown
                              setFieldValues={(value) => {
                                setFieldValue("country", value);
                                setCountryId(value);
                              }}
                              placeholder="Country"
                              setTouched={() => {
                                setFieldTouched("country", true);
                              }}
                              filters={countries}
                              width=" w-full max-w-[180px]"
                            />
                          </div>
                        ) : (
                          // <div className="text-[18px]">{values.country}</div>
                          <div className="text-[18px]">{lead?.country}</div>
                        )}
                      </div>
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Zip Code</h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="zip_code"
                          />
                        ) : (
                          <div className="text-[18px]">{values.zip_code}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 h-[90%] translate-y-[-50%] top-[50%] w-[1px] left-[45%] bg-black"></div>

                {/* Lead Details */}
                <div className=" flex-grow">
                  <h3 className="text-[16px]   bg-[#9BCDFF] bg-opacity-20   round-[6px] leading-[30px] font-medium">
                    <span className="px-7">Lead Details</span>
                  </h3>
                  <div className="grid grid-cols-2 w-full">
                    <div className="flex flex-col gap-2">
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Lead Status</h4>
                        {editMode ? (
                          <div className=" grid grid-cols-12 ">
                            <div className="  col-span-9">
                              {/* Select Team For Service */}
                              <SingleSelectFilterDropdown
                                setFieldValues={(value) =>
                                  setFieldValue("status_id", value)
                                }
                                placeholder="Status"
                                setTouched={() =>
                                  setFieldTouched("status_id", true)
                                }
                                filters={statuses}
                                width=" w-full max-w-[270px]"
                              />
                            </div>
                          </div>
                        ) : (
                          // <div className="text-[18px]">{values.status}</div>
                          <div className="text-[18px]">
                            {lead?.status?.status_name}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Source</h4>
                        {editMode ? (
                          <div className=" grid grid-cols-12      ">
                            <div className="  col-span-9">
                              {/* Select Team For Service */}
                              <SingleSelectFilterDropdown
                                setFieldValues={(value) =>
                                  setFieldValue("source_id", value)
                                }
                                placeholder="Source"
                                setTouched={() =>
                                  setFieldTouched("source_id", true)
                                }
                                filters={sources}
                                width=" w-full max-w-[270px]"
                              />
                            </div>
                          </div>
                        ) : (
                          // <div className="text-[18px]">{values.source}</div>
                          <div className="text-[18px]">
                            {" "}
                            {lead?.source?.source_name}
                          </div>
                        )}
                      </div>
                      {/* <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">
                          Default Language
                        </h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="defaultLanguage"
                          />
                        ) : (
                          <div className="text-[18px]">
                            {values.defaultLanguage}
                          </div>
                        )}
                      </div> */}
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Assigned</h4>
                        {editMode ? (
                          <div className=" grid grid-cols-12      ">
                            <div className="  col-span-9">
                              {/* Select Team For Service */}
                              <SingleSelectFilterDropdown
                                setFieldValues={(value) =>
                                  setFieldValue("assigned_to", value)
                                }
                                placeholder="Assigned"
                                setTouched={() =>
                                  setFieldTouched("assigned_to", true)
                                }
                                filters={users}
                                width=" w-full max-w-[270px]"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-[18px]">
                            {lead?.assigned_to?.name}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="mt-3 px-7">
                        <h4
                          className={` text-[18px] font-bold ${
                            editMode && "p-1 "
                          }`}>
                          Created
                        </h4>
                        {/* {editMode ? (
                          <Field
                          className="text-[18px] border rounded-md p-1"
                          name="created"
                          />
                          ) : ( */}
                        <div className="text-[18px]">
                          {lead?.created_at ? lead?.created_at : "-"}
                        </div>
                        {/* )} */}
                      </div>
                      <div className="mt-3 px-7">
                        <h4
                          className={` text-[18px] font-bold ${
                            editMode && "p-1 "
                          }`}>
                          Last Contact
                        </h4>
                        {/* <h4 className="text-[18px] font-bold">Last Contact</h4>
                        {editMode ? (
                          <Field
                            className="text-[18px] border rounded-md p-1"
                            name="lastContact"
                          />
                        ) : ( */}
                        <div className="text-[18px]">
                          {lead?.last_content ? lead?.last_content : "-"}
                        </div>
                        {/* )} */}
                      </div>
                      <div
                        className={` ${editMode ? " mt-[25px]" : "mt-3"} px-7`}>
                        <h4 className="text-[18px] font-bold">Product Type</h4>
                        {editMode ? (
                          <div className=" grid grid-cols-12       ">
                            <div className="  col-span-9">
                              {/* Select Team For Service */}
                              <SingleSelectFilterDropdown
                                setFieldValues={(value) => {
                                  setFieldValue("product_type_id", value);
                                  setProductId(value);
                                }}
                                placeholder="Product Type"
                                setTouched={() =>
                                  setFieldTouched("product_type_id", true)
                                }
                                filters={productTypeWithOutCategories}
                                width=" w-full max-w-[270px]"
                              />
                            </div>
                            <ErrorMessage
                              component={"div"}
                              name="product_type_id"
                              className=" text-red-500"
                            />
                          </div>
                        ) : (
                          <div className="text-[18px]">
                            {lead?.product_type}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 px-7">
                        <h4 className="text-[18px] font-bold">Product</h4>
                        {editMode ? (
                          <div className=" grid grid-cols-12      ">
                            <div className="  col-span-9">
                              {/* Select Team For Service */}
                              <SingleSelectFilterDropdown
                                setFieldValues={(value) =>
                                  setFieldValue("product_related_id", value)
                                }
                                placeholder="Product"
                                setTouched={() =>
                                  setFieldTouched("product_related_id", true)
                                }
                                filters={products}
                                width=" w-full max-w-[270px]"
                              />
                            </div>
                            <ErrorMessage
                              component={"div"}
                              name="product_related_id"
                              className=" text-red-500"
                            />
                          </div>
                        ) : (
                          // <div className="text-[18px]">{values.product}</div>
                          <div className="text-[18px]">
                            {lead?.product_details?.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {editMode && (
                <div className="flex justify-end mt-4 mr-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save
                  </button>
                </div>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LeadProfile;
