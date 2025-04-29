import React from "react";
import Modal from "../../Modal/Modal";
import { IoClose } from "react-icons/io5";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ImRadioUnchecked } from "react-icons/im";
import * as Yup from "yup";
import CardLayout from "../../CardLayout";
import MainItemText from "../MainItemText";
import ItemField from "../../Formik/ItemField";

import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  createServices,
  fetchService,
  updateService,
} from "../../../Store/serviceSlice/serviceSlice";
import ItemTotalPriceField from "../../Formik/ItemTotalPriceField";

const AddService = () => {
  // Edit Service
  const dispatch = useDispatch();
  const { editedService, isModalOpen, errorAddService, filters, pagination } =
    useSelector((state) => state.services);

  // Define validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    tax: Yup.number().required("Tax is required"),
    total: Yup.number(),
    // assigned: Yup.string().required("Assigned is required"),
    description: Yup.string().required("Description is required"),
  });

  const initialValues = {
    name: editedService?.name || "",
    price: editedService?.price * 1 || "",
    tax: editedService?.tax * 1 || "",
    total: editedService?.total * 1 || "",
    // assigned: editedService?.assigned || "",
    description: editedService?.description || "",
  };

  const onSubmit = (values) => {
    if (editedService) {
      dispatch(
        updateService({
          serviceId: editedService.id,
          serviceData: {
            name: values.name,
            price: values.price,
            tax: values.tax,
            total: values.tax + values.price,
            // team_ids: [values.assigned],
            description: values.description,
          },
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchService({ ...filters, page: pagination.currentPage }));
          dispatch(closeModal());
        })
        .catch((error) => console.log(error));
    } else {
      dispatch(
        createServices({
          serviceData: {
            name: values.name,
            price: values.price,
            tax: values.tax,
            total: values.tax + values.price,
            // team_ids: [values.assigned],
            description: values.description,
          },
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchService({ ...filters, page: pagination.currentPage }));
          dispatch(closeModal());
        })
        .catch((error) => console.log(error));
    }
  };

  const closeServiceModal = () => {
    dispatch(closeModal());
  };
  return (
    <Modal
      isOpen={isModalOpen}
      // isOpen={isModalOpen}
      onClose={closeServiceModal}>
      <CardLayout>
        <div className=" flex justify-between  text-[20px] font-medium leading-[30px] items-center">
          {/* Modal Title */}
          <span>{editedService ? "Edit" : "Add"} Service</span>

          {/* close */}
          <button
            className="p-2 rounded-md hover:bg-slate-200"
            onClick={closeServiceModal}>
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
                Service
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

                <div className={` w-full  flex pl-5 gap-[47px] pt-3   `}>
                  <label
                    htmlFor={"name"}
                    className="  col-span-3">
                    <MainItemText>Name:</MainItemText>
                  </label>
                  <div className="   grow">
                    <Field
                      className="   py-1 px-2 placeholder:text-[18px] leading-[26px] font-medium w-full border  border-borderGray rounded-[3px] focus:outline-none"
                      type={"text"}
                      placeholder={""}
                      name={"name"}
                      id={"name"}
                    />
                    <ErrorMessage
                      name={"name"}
                      component={"div"}
                      className=" text-red-500"
                    />
                    {errorAddService?.name && (
                      <div className=" text-red-500">
                        {errorAddService?.name}
                      </div>
                    )}
                  </div>
                </div>
                <div className=" py-2 px-4  grid grid-cols-2 gap-[50px]">
                  <div className=" flex flex-col gap-6">
                    <ItemField
                      apiError={errorAddService?.price}
                      label={"Price"}
                      name={"price"}
                      type={"number"}
                      placeholder={"EGP"}
                      id={"price"}
                    />

                    <ItemField
                      apiError={errorAddService?.tax}
                      label={"Tax"}
                      name={"tax"}
                      type={"number"}
                      placeholder={"EGP"}
                      id={"tax"}
                    />

                    <ItemTotalPriceField
                      apiError={errorAddService?.total}
                      label={"Total"}
                      name={"total"}
                      values={values.tax + values.price}
                      onChange={() =>
                        setFieldValue("total", values.tax + values.price)
                      }
                      readOnly={true}
                      type={"number"}
                      placeholder={"EGP"}
                      id={"total"}
                    />
                    {/* <div className=" grid grid-cols-12      ">
                      <label
                        htmlFor={"assigned"}
                        className="  col-span-3 mt-1">
                        <MainItemText>{"Assigned"}:</MainItemText>
                      </label>
                      <div className="  col-span-9">
                      
                        <SingleSelectFilterDropdown
                          setFieldValues={(value) =>
                            setFieldValue("assigned", value)
                          }
                          up
                          setTouched={() => setFieldTouched("assigned", true)}
                          filters={teamsList}
                          width=" w-full max-w-[270px]"
                        />
                        <ErrorMessage
                          name={"assigned"}
                          component={"div"}
                          className=" text-red-500"
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
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
                    {errorAddService?.description && (
                      <div className=" text-red-500">
                        {errorAddService.description}
                      </div>
                    )}
                  </div>
                </div>
                <div className=" pt-3 flex gap-4 justify-end items-center">
                  <button
                    type="submit"
                    className=" w-[80px] py-1  rounded text-white bg-[#2563EB] text-[15px] leading-[23px]">
                    Save
                  </button>
                  <button
                    onClick={closeServiceModal}
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

export default AddService;
