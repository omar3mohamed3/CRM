import Modal from "../../Modal/Modal";
import { IoClose } from "react-icons/io5";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import MainItemText from "../../Items/MainItemText";
import CardLayout from "../../CardLayout";
import {
  closeLeadSourceModal,
  createLeadSource,
  fetchSettingsLeadSource,
  updateLeadSource,
} from "../../../Store/settingsLeadSourceSlice/settingsLeadSourceSlice";

const AddLeadSource = () => {
  const dispatch = useDispatch();
  const { editedSource, isModalOpen, filters, pagination } = useSelector(
    (state) => state.leadSource
  );

  // Define validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const initialValues = {
    name: editedSource?.status || "", // Adjust to match the property name in editedSource
  };

  const onSubmit = (values) => {
    if (editedSource) {
      // Update the existing lead source
      dispatch(
        updateLeadSource({
          sourceId: editedSource.id,
          sourceData: { source_name: values.name },
        })
      )
        .unwrap()
        .then(() => {
          dispatch(
            fetchSettingsLeadSource({
              ...filters,
              page: pagination.currentPage,
            })
          );
          dispatch(closeLeadSourceModal());
        })
        .catch((error) => console.log(error));
    } else {
      // Create a new lead source
      dispatch(createLeadSource({ sourceData: { source_name: values.name } }))
        .unwrap()
        .then(() => {
          dispatch(
            fetchSettingsLeadSource({
              ...filters,
              page: pagination.currentPage,
            })
          );
          dispatch(closeLeadSourceModal());
        })
        .catch((error) => console.log(error));
    }
  };

  const closeLeadModal = () => {
    dispatch(closeLeadSourceModal());
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeLeadModal}>
      <CardLayout>
        <div className="flex justify-between text-[20px] font-medium leading-[30px] items-center">
          <span>New Source</span>
          <button
            className="p-2 rounded-md hover:bg-slate-200"
            onClick={closeLeadModal}>
            <IoClose className="text-[16px]" />
          </button>
        </div>
      </CardLayout>
      <div className="my-[6px]">
        <CardLayout>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ setFieldValue, setFieldTouched }) => (
              <Form>
                <div className={`w-full flex pl-5 gap-[47px] pt-3`}>
                  <label
                    htmlFor={"name"}
                    className="col-span-3">
                    <MainItemText>Name:</MainItemText>
                  </label>
                  <div className="grow">
                    <Field
                      className="py-1 px-2 placeholder:text-[18px] leading-[26px] font-medium w-full border border-borderGray rounded-[3px] focus:outline-none"
                      type={"text"}
                      placeholder={""}
                      name={"name"}
                      id={"name"}
                    />
                    <ErrorMessage
                      name={"name"}
                      component={"div"}
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div className="pt-3 flex gap-4 justify-end items-center">
                  <button
                    type="submit"
                    className="w-[80px] py-1 rounded text-white bg-[#2563EB] text-[15px] leading-[23px]">
                    Save
                  </button>
                  <button
                    onClick={closeLeadModal}
                    type="button"
                    className="w-[80px] py-1 rounded text-primary border border-borderGray text-[15px] leading-[23px]">
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

export default AddLeadSource;
