import Modal from "../../Modal/Modal";
import { IoClose } from "react-icons/io5";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import MainItemText from "../../Items/MainItemText";
import CardLayout from "../../CardLayout";
import {
  closePropertyFeaturesModal,
  createPropertyFeature,
  fetchSettingsPropertyFeatures,
  updatePropertyFeature,
} from "../../../Store/settingsPropertyFeatures/settingsPropertyFeaturesSlice";

const AddPropertyFeatures = () => {
  // Edit Service
  const dispatch = useDispatch();
  const { editedFeature, isModalOpen, filters, pagination } = useSelector(
    (state) => state.propertyFeatures
  );
  // Define validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });
  const initialValues = {
    name: editedFeature?.status || "",
  };
  const onSubmit = (values) => {
    if (editedFeature) {
      dispatch(
        updatePropertyFeature({
          featureId: editedFeature.id,
          propertyData: { name: values.name },
        })
      )
        .unwrap()
        .then(() => {
          dispatch(
            fetchSettingsPropertyFeatures({
              ...filters,
              page: pagination.currentPage,
            })
          );
          dispatch(closePropertyFeaturesModal());
        })
        .catch((error) => console.log(error));
    } else {
      dispatch(createPropertyFeature({ propertyData: { name: values.name } }))
        .unwrap()
        .then(() => {
          dispatch(
            fetchSettingsPropertyFeatures({
              ...filters,
              page: pagination.currentPage,
            })
          );
          dispatch(closePropertyFeaturesModal());
        })
        .catch((error) => console.log(error));
    }
  };

  const closeServiceModal = () => {
    dispatch(closePropertyFeaturesModal());
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeServiceModal}>
      <CardLayout>
        <div className=" flex justify-between  text-[20px] font-medium leading-[30px] items-center">
          {/* Modal Title */}
          <span>New Features</span>
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ setFieldValue, setFieldTouched }) => (
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

export default AddPropertyFeatures;
