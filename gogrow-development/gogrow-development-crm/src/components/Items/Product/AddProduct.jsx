import React, { useRef, useState } from "react";
import Modal from "../../Modal/Modal";
import { IoClose } from "react-icons/io5";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ImRadioUnchecked } from "react-icons/im";
import * as Yup from "yup";
import CardLayout from "../../CardLayout";
import MainItemText from "../MainItemText";
import ItemField from "../../Formik/ItemField";
import SingleSelectFilterDropdown from "../../../pages/Leads/SingleSelectFilterDropdown";

import { MdCloudUpload } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import {
  closeProductModal,
  createProduct,
  fetchProducts,
  updateProduct,
} from "../../../Store/productsSlice/productsSlice";
import ItemTotalPriceField from "../../Formik/ItemTotalPriceField";

const AddProduct = () => {
  // Edit Service
  const imageRef = useRef();
  const [apiError, setApiError] = useState({});
  const dispatch = useDispatch();

  const { editedProduct, isModalOpen, createLoading, filters, pagination } =
    useSelector((state) => state.products);

  // List of Categories
  const { allCategories } = useSelector((state) => state.categories);

  // Define validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    discount: Yup.number(),
    tax: Yup.number(),
    total: Yup.number(),
    category: Yup.string().required("Category is required"),
    code: Yup.string().required("Code is required"),
    worldCode: Yup.string().required("Code is required"),
    // assigned: Yup.string().required("Assigned is required"),
    description: Yup.string().required("Description is required"),
    photo: Yup.mixed(),
  });

  const initialValues = {
    name: editedProduct?.name || "",
    price: editedProduct?.selling_price || "",
    discount: editedProduct?.discount || "",
    tax: editedProduct?.tax || "",
    total: editedProduct?.total || "",
    category: editedProduct?.category.id || "",
    code: editedProduct?.code || "",
    worldCode: editedProduct?.world_code || "",
    // assigned: "Assigned",
    description: editedProduct?.description || "",
    photo: "",
  };
  const onSubmit = (values) => {
    // Create a FormData object to handle file uploads
    const formData = new FormData();

    // Append product data to the FormData object
    formData.append("name", values.name);
    // formData.append("type", "goods");
    // formData.append("unit", "Unit");
    formData.append("selling_price", values.price);
    formData.append("discount", values.discount);
    formData.append("currency", "EGP");
    formData.append("tax", values.tax);
    formData.append("category_id", values.category);
    formData.append("description", values.description);
    formData.append("code", values.code);
    formData.append("world_code", values.worldCode);

    Array.from(imageRef.current.files).forEach((file, index) => {
      formData.append(`photos[${index}]`, file);
    });

    if (editedProduct) {
      // Dispatch the editProduct action with formData
      dispatch(
        updateProduct({
          productId: editedProduct.id,
          productData: formData, // Pass the FormData object
        })
      )
        .unwrap()
        .then(() => {
          dispatch(closeProductModal());
          dispatch(fetchProducts({ ...filters, page: pagination.currentPage }));
        })
        .catch((error) => setApiError(error));
    } else {
      // Dispatch the createProduct action with formData
      dispatch(
        createProduct({
          productData: formData, // Pass the FormData object
        })
      )
        .unwrap()
        .then(() => {
          dispatch(closeProductModal());
          dispatch(fetchProducts({ ...filters, page: pagination.currentPage }));
        })
        .catch((error) => setApiError(error));
    }
  };

  // Close Modal
  const closeModal = () => {
    dispatch(closeProductModal());
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}>
      <CardLayout>
        <div className=" flex justify-between  text-[20px] font-medium leading-[30px] items-center">
          {/* Modal Title */}
          <span>{editedProduct ? "Edit" : "Add"} Product</span>
          {/* close */}
          <button
            className="p-2 rounded-md hover:bg-slate-200"
            onClick={closeModal}>
            <IoClose className="  text-[16px]" />
          </button>
        </div>
      </CardLayout>
      <div className=" my-[6px]">
        <CardLayout>
          <div className=" border-b  pb-2 flex gap-[140px] px-3 items-center">
            <MainItemText>Type:</MainItemText>
            <div className=" flex  gap-3 items-center">
              <ImRadioUnchecked className=" text-[#408DFB]" />
              <span className="text-[15px] font-bold leading-[23px]">
                Product
              </span>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ setFieldValue, setFieldTouched, values }) => (
              <Form>
                {/* Fields */}
                <div className=" py-2 px-4  grid grid-cols-2 gap-[30px]">
                  <div className=" flex flex-col gap-6">
                    <ItemField
                      apiError={apiError.name}
                      label={"Name"}
                      name={"name"}
                      type={"text"}
                      placeholder={""}
                      id={"name"}
                    />
                    <ItemField
                      apiError={apiError.selling_price}
                      label={"Price"}
                      name={"price"}
                      type={"number"}
                      placeholder={"EGP"}
                      id={"price"}
                    />
                    <ItemField
                      apiError={apiError.discount}
                      label={"Discount"}
                      name={"discount"}
                      type={"number"}
                      placeholder={"EGP"}
                      id={"discount"}
                    />
                    <ItemField
                      apiError={apiError.tax}
                      label={"Tax"}
                      name={"tax"}
                      type={"number"}
                      placeholder={"EGP"}
                      id={"tax"}
                    />
                    <ItemTotalPriceField
                      apiError={apiError?.total}
                      label={"Total"}
                      name={"total"}
                      values={values.tax + values.price - values.discount}
                      onChange={() =>
                        setFieldValue(
                          "total",
                          values.tax + values.price - values.discount
                        )
                      }
                      readOnly={true}
                      type={"number"}
                      placeholder={"EGP"}
                      id={"total"}
                    />
                    {/* <ItemField
                      label={"Total"}
                      name={"total"}
                      type={"number"}
                      placeholder={"EGP"}
                      id={"total"}
                    /> */}
                    {/* <div className=" grid grid-cols-12      ">
                      <label
                        htmlFor={"assigned"}
                        className="  col-span-3 mt-1">
                        <MainItemText>{"Assigned"}:</MainItemText>
                      </label>
                      <div className="  col-span-9"> */}
                    {/* <MultiSelectFilterDropdown
                          setFieldValues={setFieldValue}
                          setTouched={() => setFieldTouched("assigned", true)}
                          filters={teamsList}
                          up={"s"}
                          fieldName="assigned"
                          width=" w-full   "
                        /> */}
                    {/* Select Team to Product */}
                    {/* <SingleSelectFilterDropdown
                          setFieldValues={(value) =>
                            setFieldValue("assigned", value)
                          }
                          up
                          setTouched={() => setFieldTouched("assigned", true)}
                          filters={teamsList}
                          width=" w-full max-w-[270px]"
                        />
                      </div>
                    </div> */}
                  </div>
                  <div className=" flex flex-col gap-6">
                    <div className=" grid grid-cols-12      ">
                      <label
                        htmlFor={"category"}
                        className="  col-span-3 mt-1">
                        <MainItemText>{"Category"}:</MainItemText>
                      </label>
                      <div className="  col-span-9">
                        {/* <MultiSelectFilterDropdown
                          setFieldValues={setFieldValue}
                          setTouched={() => setFieldTouched("assigned", true)}
                          filters={teamsList}
                          up={"s"}
                          fieldName="assigned"
                          width=" w-full   "
                        /> */}
                        {/* Select Team to Product */}
                        <SingleSelectFilterDropdown
                          setFieldValues={(value) =>
                            setFieldValue("category", value)
                          }
                          placeholder="Categories"
                          setTouched={() => setFieldTouched("category", true)}
                          filters={allCategories}
                          width=" w-full max-w-[270px]"
                        />
                        <ErrorMessage
                          name="category"
                          component={"div"}
                          className=" text-red-500"
                        />
                        {apiError?.category_id && (
                          <div className="  text-red-500">
                            {apiError.category_id}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <ItemField
                      label={"Category"}
                      name={"category"}
                      type={"text"}
                      placeholder={""}
                      id={"category"}
                    /> */}
                    <ItemField
                      apiError={apiError.code}
                      label={"Code"}
                      name={"code"}
                      type={"text"}
                      placeholder={"#025789456"}
                      id={"code"}
                    />
                    <ItemField
                      apiError={apiError.world_code}
                      label={"World Code"}
                      name={"worldCode"}
                      type={"text"}
                      placeholder={"#025789456"}
                      id={"worldCode"}
                    />
                    {/* Photo */}
                    <div className=" grid grid-cols-12 h-full    ">
                      <label
                        htmlFor={"photo"}
                        className=" max-h-4  col-span-3  ">
                        <MainItemText>photo:</MainItemText>
                      </label>
                      <div className="space-y-1 col-span-9 max-w-[270px] rounded-[3px] flex flex-col border border-borderGray items-center text-center">
                        <label
                          htmlFor="photo"
                          className="relative w-full flex  flex-col justify-center h-full items-center cursor-pointer text-center  bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <MdCloudUpload className="  text-borderGray text-[80px]" />
                          <div className="flex text-sm  text-gray-600">
                            {/* <span>Upload a file</span> */}
                            <input
                              id="photo"
                              name="photo"
                              required={!editedProduct}
                              type="file"
                              ref={imageRef}
                              multiple
                              onChange={(event) => {
                                setFieldValue(
                                  "photo",
                                  event.currentTarget.files
                                );
                              }}
                              className="sr-only"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {values?.photo?.name || " PNG, JPG, GIF up to 10MB"}
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
                </div>
                {/* Descriptions */}
                <div className=" border-b  flex  gap-2  pl-4 pb-3  mt-5  ">
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
                <div className=" pt-3 flex gap-4 justify-end items-center">
                  <button
                    disabled={createLoading}
                    type="submit"
                    className=" w-[80px] py-1  rounded text-white bg-[#2563EB] text-[15px] leading-[23px]">
                    Save
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className=" w-[80px] py-1  rounded  text-primary border border-borderGray text-[15px] leading-[23px]">
                    Close
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </CardLayout>
      </div>
    </Modal>
  );
};

export default AddProduct;
