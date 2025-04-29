import MainItemText from "../MainItemText";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { teamsList } from "../../../pages/Leads/FakeLists";
import SingleSelectFilterDropdown from "../../../pages/Leads/SingleSelectFilterDropdown";
import CardLayout from "../../CardLayout";
import { ImRadioUnchecked } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import Modal from "../../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCategoriesModal,
  createCategory,
  fetchCategories,
  updateCategory,
} from "../../../Store/categorySlice/categorySlice";

const AddCategory = () => {
  // Edit Category
  const dispatch = useDispatch();
  const { editedCategory, isModalOpen, filters, pagination } = useSelector(
    (state) => state.categories
  );
  // Define validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // assigned: Yup.string().required("Assigned is required"),
  });
  // Initial Values
  const initialValues = {
    name: editedCategory?.name || "",
    // assigned: editedCategory?.assigned || "Assigned",
  };

  // Handle Submit Category
  const onSubmit = (values) => {
    if (editedCategory) {
      dispatch(
        updateCategory({
          categoryId: editedCategory.id,
          categoryData: {
            name: values.name,
          },
        })
      )
        .unwrap()
        .then(() => {
          dispatch(
            fetchCategories({ ...filters, page: pagination.currentPage })
          );
          dispatch(closeCategoriesModal());
        })
        .catch((error) => console.log(error));
    } else {
      dispatch(
        createCategory({
          categoryData: {
            name: values.name,
          },
        })
      )
        .unwrap()
        .then(() => {
          dispatch(
            fetchCategories({ ...filters, page: pagination.currentPage })
          );
          dispatch(closeCategoriesModal());
        })
        .catch((error) => console.log(error));
    }
  };

  // Close Modal
  const closeModal = () => {
    dispatch(closeCategoriesModal());
  };
  return (
    <Modal
      isOpen={isModalOpen}
      // isOpen={isModalOpen}
      onClose={closeModal}>
      <CardLayout>
        <div className=" flex justify-between  text-[20px] font-medium leading-[30px] items-center">
          {/* Modal Title */}
          <span>{editedCategory ? "Edit" : "Add"} Category</span>

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
                Product Category
              </span>
            </div>
          </div>
          {/*  Category Form */}
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
                {/* <div className=" py-2 px-4  grid grid-cols-2 gap-[50px]">
                  <div className=" flex flex-col gap-6">
                    <div className=" grid grid-cols-12      ">
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
                          setTouched={() => setFieldTouched("assigned", true)}
                          filters={teamsList}
                          width=" w-full max-w-[270px]"
                        />
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className=" pt-3 flex gap-4 justify-end items-center">
                  <button
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

export default AddCategory;
