import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "../../Modal/Modal";
import ModalHeader from "../../Modal/ModalHeader";
import CardLayout from "../../CardLayout";
import LeadField from "../../../pages/Leads/leadField";
import MainItemText from "../MainItemText";
import SingleSelectFilterDropdown from "../../../pages/Leads/SingleSelectFilterDropdown";
import {
  rentTypesList,
  teamsList,
  unitTypesList,
} from "../../../pages/Leads/FakeLists";

import ModalFooter from "../../Modal/ModalFooter";
import RadioField from "./RadioField";
import { useDispatch, useSelector } from "react-redux";
import {
  closePropertyModal,
  createProperty,
  fetchProperties,
  updateProperty,
} from "../../../Store/propertyiesSlice/propertyiesSlice";
import { MdCloudUpload } from "react-icons/md";
import MultiSelectFilterDropdown from "../../../pages/Leads/MultiSelectFilterDropdown";
import { useEffect, useRef, useState } from "react";
import { fetchCountries } from "../../../Store/leadsSlice/countriesSlice";
import { fetchCities } from "../../../Store/leadsSlice/citiesSlice";
import { fetchSettingsAllPropertyFeatures } from "../../../Store/settingsPropertyFeatures/settingsPropertyFeaturesSlice";
import { fetchSettingsAllPropertyType } from "../../../Store/settingsPropertyType/settingsPropertyTypeSlice";

// Regex to match Google Maps URL
const googleMapsUrlRegex = /^(https:\/\/)?(www\.)?(google\.\w{2,3})\/maps\/.+$/;

const AddProperty = () => {
  // Edit Property
  const imageRef = useRef();
  const dispatch = useDispatch();
  const [countryId, setCountryId] = useState(null);
  const [apiError, setApiError] = useState({});
  const { countries } = useSelector((state) => state.countries);
  const { settingsAllPropertyType } = useSelector(
    (state) => state.propertyType
  );
  const { cities } = useSelector((state) => state.cities);

  const { editedProperty, isModalOpen, filters, pagination } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchSettingsAllPropertyType());
  }, [dispatch]);

  useEffect(() => {
    if (countryId) {
      dispatch(fetchCities({ countryId }));
    }
  }, [dispatch, countryId]);

  // Define validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    address: Yup.string().required("Address is required"),
    location: Yup.string()
      .url("Location must be a valid URL") // Ensures the input is a valid URL
      .matches(googleMapsUrlRegex, "Location must be a valid Google Maps URL") // Ensures it's a Google Maps URL
      .required("Location is required"), // Marks it as required,
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    district: Yup.string().required("District is required"),
    type: Yup.string().required("Type is required"),
    objective: Yup.string().required("Objective is required"),
    date: Yup.string().required("Date is required"),
    unitType: Yup.string().required("Unit Type is required"),
    price: Yup.number().required("Price is required"),
    rentType: Yup.string(),
    // assigned: Yup.string().required("Assigned is required"),
    direction: Yup.string().required("Direction is required"),
    description: Yup.string().required("Description is required"),
    features: Yup.array(),
    // details: Yup.array(),
    photo: Yup.mixed(),
  });

  // Table Data - Bulk Ids
  const { settingsAllPropertyFeatures } = useSelector(
    (state) => state.propertyFeatures
  );

  const transformedData = settingsAllPropertyFeatures.map((item) => ({
    id: item.id,
    label: item.name,
  }));

  useEffect(() => {
    dispatch(fetchSettingsAllPropertyFeatures()); // Fetch data on component mount
  }, [dispatch]);

  const dateStr = editedProperty?.available_date;
  const dateObj = new Date(dateStr);

  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const hours = String(dateObj.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  const initialValues = {
    title: editedProperty?.title || "",
    address: editedProperty?.address || "",
    location: editedProperty?.location || "",
    city: editedProperty?.propertiescity.id || "",
    country: editedProperty?.propertiescountry.id || "",
    district: editedProperty?.district || "",
    type: editedProperty?.type || "",
    objective: editedProperty?.objective || "",
    date: formattedDate || "",
    unitType: editedProperty?.unit_type.id || "",
    rentType: editedProperty?.rentType || "",
    // assigned: editedProperty?.assigned || "",
    price: editedProperty?.price || "",
    direction: editedProperty?.direction_of_property || "",
    description: editedProperty?.description || "",
    features: editedProperty?.feature?.map((feature) => feature.id) || [],
    developer_name: editedProperty?.developer_name || "",
    // details: editedProperty?.details || "",
    photo: "",
  };
  const onSubmit = (values) => {
    // Create a FormData object to handle file uploads
    const formData = new FormData();

    // Append product data to the FormData object
    formData.append("title", values.title);
    formData.append("address", values.address);
    formData.append("location", values.location);
    formData.append("propertiescity_id", values.city);
    formData.append("propertiescountry_id", values.country);
    formData.append("district", values.district);
    formData.append("price", values.price);
    formData.append("objective", values.objective);
    formData.append("available_date", values.date);
    formData.append("unit_type_id", values.unitType);
    formData.append("direction_of_property", values.direction);
    formData.append("description", values.description);

    formData.append("type", values.type);
    if (values.type === "Rent" && values.rentType) {
      formData.append("rental_type_id", values.rentType);
    }

    Array.from(imageRef.current.files).forEach((file, index) => {
      formData.append(`photos[${index}]`, file);
    });
    // values.features.forEach((feature, index) => {
    //   formData.append(`feature_ids[${index}]`, feature.id);
    // });

    if (values.features) {
      values.features?.map((feature, index) => {
        // const feturesIds = Array.isArray(values.item)
        //   ? values.item.map((item) =>
        //       typeof item === "object" && item !== null ? item.id : item
        //     )
        //   : [];
        formData.append(`feature_ids[${index}]`, feature.id);
      });
    }

    if (editedProperty) {
      // Dispatch the editProduct action with formData
      dispatch(
        updateProperty({
          propertyId: editedProperty.id,
          propertyData: formData, // Pass the FormData object
        })
      )
        .unwrap()
        .then(() => {
          dispatch(closePropertyModal());
          dispatch(
            fetchProperties({ ...filters, page: pagination.currentPage })
          );
        })
        .catch((error) => setApiError(error));
    } else {
      // Dispatch the createProduct action with formData
      dispatch(
        createProperty({
          propertyData: formData, // Pass the FormData object
        })
      )
        .unwrap()
        .then(() => {
          dispatch(closePropertyModal());
          dispatch(
            fetchProperties({ ...filters, page: pagination.currentPage })
          );
        })
        .catch((error) => setApiError(error));
    }
  };

  // Close Modal
  const closeModal = () => {
    dispatch(closePropertyModal());
  };

  const city = {
    id: editedProperty?.propertiescity?.id,
    label: editedProperty?.propertiescity?.name,
  };
  const country = {
    id: editedProperty?.propertiescountry?.id,
    label: editedProperty?.propertiescountry?.name,
  };
  const renttype = {
    id: editedProperty?.rental_type?.id,
    label: editedProperty?.rental_type?.name,
  };
  const unit_type = {
    id: editedProperty?.unit_type?.id,
    label: editedProperty?.unit_type?.name,
  };

  const features = editedProperty?.features?.map((item) => ({
    id: item?.id,
    label: item?.name,
  }));

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}>
      <div className=" mb-2">
        <ModalHeader
          title={`${editedProperty ? "Edit " : "Add "} Property`}
          setIsModalOpen={closeModal}
        />
      </div>
      <CardLayout>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({ setFieldValue, setFieldTouched, errors, values }) => {
            return (
              <Form>
                {/* Fields */}
                <div className=" py-4 px-4    grid grid-cols-2 border-t    gap-y-4 gap-x-[50px]">
                  <div>
                    <LeadField
                      apiError={apiError.title}
                      label={"Title Unit:"}
                      name={"title"}
                      type={"text"}
                      placeholder={""}
                      id={"title"}
                    />
                    {/* Empty column */}
                    <div className=" mt-1"></div>
                    <LeadField
                      apiError={apiError.address}
                      label={"Address:"}
                      name={"address"}
                      type={"text"}
                      placeholder={""}
                      id={"address"}
                    />

                    {/* Empty column */}
                    <div></div>
                  </div>
                  <div className=" grid   h-full    ">
                    <label
                      htmlFor={"photo"}
                      className=" max-h-4  col-span-3  ">
                      <MainItemText>photo:</MainItemText>
                    </label>
                    <div className="space-y-1 w-full col-span-9   rounded-[3px] flex flex-col border border-borderGray items-center text-center">
                      <label
                        htmlFor="photo"
                        className="relative w-full flex  flex-col justify-center h-full items-center cursor-pointer text-center  bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <MdCloudUpload className="  text-borderGray text-[80px]" />
                        <div className="flex text-sm  text-gray-600">
                          {/* <span>Upload a file</span> */}
                          <input
                            ref={imageRef}
                            id="photo"
                            name="photo"
                            type="file"
                            required={!editedProperty}
                            multiple
                            onChange={(event) => {
                              setFieldValue(
                                "photo",
                                event.currentTarget.files //TODO   #Change it to files
                              );
                            }}
                            className="sr-only"
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {values.photo?.[0]
                            ? values.photo.length === 1
                              ? values.photo[0].name
                              : `${values.photo[0].name} ... (${values.photo.length} files)`
                            : "PNG, JPG,... up to 2MB"}
                        </p>
                      </label>
                    </div>
                    <ErrorMessage
                      name="photo"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                    {apiError?.photos && (
                      <div className="  text-red-500">{apiError.photos}</div>
                    )}
                  </div>
                </div>

                <div className=" pb-4 px-4    grid grid-cols-3   gap-y-4 gap-x-[20px]">
                  <LeadField
                    apiError={apiError.location}
                    label={"Location:"}
                    name={"location"}
                    type={"text"}
                    placeholder={""}
                    id={"location"}
                  />

                  <div className="">
                    <label
                      htmlFor={"country"}
                      className="  col-span-3 mt-1">
                      <MainItemText>{"Country"}:</MainItemText>
                    </label>
                    <div className="  col-span-9">
                      <SingleSelectFilterDropdown
                        placeholder="country"
                        setFieldValues={(value) => {
                          setFieldValue("country", value);
                          setCountryId(value);
                        }}
                        editedValues={country}
                        setTouched={() => setFieldTouched("country", true)}
                        filters={countries}
                        width=" w-full   "
                      />
                    </div>
                    <ErrorMessage
                      component={"div"}
                      name="country"
                      className=" text-red-500"
                    />
                    {apiError?.propertiescountry_id && (
                      <div className="  text-red-500">
                        {apiError.propertiescountry_id}
                      </div>
                    )}
                  </div>
                  <div className="">
                    <label
                      htmlFor={"city"}
                      className="  col-span-3 mt-1">
                      <MainItemText>{"City"}:</MainItemText>
                    </label>
                    <div className="  col-span-9">
                      <SingleSelectFilterDropdown
                        placeholder={city || "city"}
                        editedValues={city}
                        setFieldValues={(value) => setFieldValue("city", value)}
                        setTouched={() => setFieldTouched("city", true)}
                        filters={cities}
                        width=" w-full   "
                      />
                    </div>
                    <ErrorMessage
                      component={"div"}
                      name="city"
                      className=" text-red-500"
                    />
                    {apiError?.propertiescity_id && (
                      <div className="  text-red-500">
                        {apiError.propertiescity_id}
                      </div>
                    )}
                  </div>
                  <LeadField
                    apiError={apiError.district}
                    label={"District:"}
                    name={"district"}
                    type={"text"}
                    placeholder={""}
                    id={"district"}
                  />
                  <LeadField
                    apiError={apiError.developer_name}
                    label={"Developer Name:"}
                    name={"developer_name"}
                    type={"text"}
                    placeholder={""}
                    id={"developer_name"}
                  />
                </div>

                <div className=" pb-4 px-4   grid grid-cols-2    gap-y-4 gap-x-[50px]">
                  <RadioField
                    name={"type"}
                    label={"Type"}
                    options={[
                      { label: "Rent", value: "Rent" },
                      { label: "Sale", value: "Sale" },
                      { label: "Resale", value: "Resale" },
                    ]}
                  />
                  <RadioField
                    name={"objective"}
                    label={"Objective"}
                    options={[
                      { label: "Residential", value: "residential" },
                      { label: "Commercial", value: "commercial" },
                    ]}
                  />
                </div>
                <div className=" pb-4 px-4   grid grid-cols-2    gap-y-4 gap-x-[50px]">
                  <LeadField
                    apiError={apiError.available_date}
                    label={"Available Date:"}
                    name={"date"}
                    type="datetime-local"
                    placeholder={""}
                    id={"date"}
                  />
                  {values.type === "Rent" && (
                    <div className="">
                      <label
                        htmlFor={"rentType"}
                        className="  col-span-3 mt-1">
                        <MainItemText>{"Rent Type"}:</MainItemText>
                      </label>
                      <div className="  col-span-9">
                        <SingleSelectFilterDropdown
                          placeholder="Rent Type"
                          setFieldValues={(value) =>
                            setFieldValue("rentType", value)
                          }
                          editedValues={renttype}
                          required=""
                          setTouched={() => setFieldTouched("rentType", true)}
                          filters={rentTypesList}
                          width=" w-full   "
                        />
                      </div>
                      <ErrorMessage
                        component={"div"}
                        name="rentType"
                        className=" text-red-500"
                      />
                      {apiError?.rental_type_id && (
                        <div className="  text-red-500">
                          {apiError.rental_type_id}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className=" py-4 px-4  pb-8 grid grid-cols-3     gap-y-4 gap-x-[50px]">
                  <div className="">
                    <label
                      htmlFor={"unitType"}
                      className="  col-span-3 mt-1">
                      <MainItemText>{"Type Of Unit"}:</MainItemText>
                    </label>
                    <div className="  col-span-9">
                      <SingleSelectFilterDropdown
                        placeholder="Unit Type"
                        setFieldValues={(value) =>
                          setFieldValue("unitType", value)
                        }
                        editedValues={unit_type}
                        setTouched={() => setFieldTouched("unitType", true)}
                        filters={settingsAllPropertyType}
                        width=" w-full   "
                      />
                      <ErrorMessage
                        component={"div"}
                        name="unitType"
                        className="  text-red-500"
                      />
                      {apiError?.unit_type_id && (
                        <div className="  text-red-500">
                          {apiError.unit_type_id}
                        </div>
                      )}
                    </div>
                  </div>

                  <LeadField
                    apiError={apiError.price}
                    label={"Price:"}
                    name={"price"}
                    type={"number"}
                    placeholder={"price"}
                    id={"price"}
                  />
                  <LeadField
                    apiError={apiError.direction_of_property}
                    label={"Direction:"}
                    name={"direction"}
                    type={"text"}
                    placeholder={"North"}
                    id={"direction"}
                  />
                  {/* <div className="           ">
                    <label
                      htmlFor={"direction"}
                      className=" text-primary  col-span-3 mt-1">
                      <MainItemText>{"Direction of Property"}:</MainItemText>
                    </label>
                    <div className="  col-span-9">
                      <SingleSelectFilterDropdown
                        placeholder="Direction"
                        setFieldValues={(value) =>
                          setFieldValue("direction", value)
                        }
                        setTouched={() => setFieldTouched("direction", true)}
                        filters={teamsList}
                        width=" w-full   "
                      />
                    </div>
                    <ErrorMessage
                      component={"div"}
                      name="direction"
                      className=" text-red-500"
                    />
                  </div> */}
                </div>

                <div className="   px-4     ">
                  <label
                    htmlFor={"features"}
                    className="  col-span-3 mt-1">
                    <MainItemText>{"Features"}:</MainItemText>
                  </label>
                  <div className="col-span-9">
                    <MultiSelectFilterDropdown
                      setFieldValues={(values) =>
                        setFieldValue("features", values)
                      }
                      editedValues={features}
                      setTouched={() => setFieldTouched("features", true)}
                      filters={transformedData}
                      up={"s"}
                      placeholder="Select Features"
                      fieldName="features"
                      width=" w-full   "
                    />
                    {apiError?.features && (
                      <div className="  text-red-500">{apiError.features}</div>
                    )}
                  </div>
                </div>
                {/* <div className="   mt-2   px-4   ">
                  <label
                    htmlFor={"details"}
                    className="  col-span-3 mt-1">
                    <MainItemText>{"Details"}:</MainItemText>
                  </label>
                  <div className="  col-span-9">
                    <MultiSelectFilterDropdown
                      setFieldValues={setFieldValue}
                      setTouched={() => setFieldTouched("details", true)}
                      filters={teamsList}
                      up={"s"}
                      placeholder="Select Details"
                      fieldName="details"
                      width=" w-full   "
                    />
                  </div>
                </div> */}
                <div className=" border-b  flex  gap-2  p-4 pb-3  mt-5  ">
                  <label
                    htmlFor={"description"}
                    className="  col-span-2">
                    <MainItemText>Description:</MainItemText>
                  </label>
                  <div className=" w-full  ">
                    <Field
                      className="   py-1 px-2 placeholder:text-[18px] h-[130px] leading-[26px] font-medium w-full border   border-borderGray rounded-[3px] focus:outline-none"
                      type={"text"}
                      as="textarea"
                      placeholder={"description"}
                      name={"description"}
                      id={"description"}
                    />
                    <ErrorMessage
                      name={"description"}
                      component={"div"}
                      className=" text-red-500"
                    />
                    {apiError?.description && (
                      <div className="  text-red-500">
                        {apiError.description}
                      </div>
                    )}
                  </div>
                </div>
                <ModalFooter onClose={closeModal} />
              </Form>
            );
          }}
        </Formik>
      </CardLayout>
    </Modal>
  );
};

export default AddProperty;
