import Modal from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import ModalFooter from "../Modal/ModalFooter";
import CardLayout from "../CardLayout";
import { ErrorMessage, Form, Formik } from "formik";
import MainItemText from "../Items/MainItemText";
import * as Yup from "yup";
import SingleSelectFilterDropdown from "../../pages/Leads/SingleSelectFilterDropdown";

import LeadField from "../../pages/Leads/leadField";
import TeamField from "./TeamFiled";
import MultiSelectFilterDropdown from "../../pages/Leads/MultiSelectFilterDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  fetchAssignedUsers,
  fetchNotAssignedUsersTeam,
} from "../../Store/leadsSlice/AssignedUsersSlice";
import { fetchProductTypes } from "../../Store/leadsSlice/ProductTypeSlice";

import { fetchProductDetails } from "../../Store/leadsSlice/productDetailsSlice";
import { addTeam, fetchTeams } from "../../Store/teamsSlice/teamsSlice";
import toast from "react-hot-toast";

const AddTeam = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState(null);
  const { loadingAdd, errorAdd, pagination, search } = useSelector(
    (state) => state.teams
  );
  const [resetDropdown, setResetDropdown] = useState(false);

  const { usersNotInTeam, users } = useSelector((state) => state.assignedUsers);
  const { productTypes } = useSelector((state) => state.productType);
  const { products } = useSelector((state) => state.productDetails);

  const productTypeWithOutProduct = productTypes.filter((type) => type.id != 4);

  useEffect(() => {
    dispatch(fetchNotAssignedUsersTeam());
    dispatch(fetchAssignedUsers());
    dispatch(fetchProductTypes());
  }, [dispatch]);

  useEffect(() => {
    if (productId == null) return;
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  // Define validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    leader: Yup.string().required("Team Leader is required"),
    // month: Yup.string().required("Month is required"),
    monthlyTarget: Yup.number().required("Monthly Target is required"),
    item: Yup.array().required("Item is required"),
    team_members: Yup.array().required("Team Members is required"),
    item_type: Yup.string().required("Item Type is required"),
    // assigned: Yup.array()
    //   .min(1, "You must assign at least one person")
    //   .required("Assigned is required"),
  });
  const initialValues = {
    name: "",
    leader: "",
    monthlyTarget: "",
    item: "",
    team_members: "",
    item_type: "",
    // month: "",
    // assigned: "",
  };
  const onSubmit = (values) => {
    dispatch(
      addTeam({
        team_name: values.name,
        team_lead_id: values.leader,
        target: values.monthlyTarget,
        user_ids: values.team_members.map((member) => member.id),
        type: values.item_type,
        array_of_ids: values.item.map((member) => member.id),
        // month: "",
        // assigned: "",
      })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchTeams({ page: pagination?.currentPage, search: search }));
        setShowModal(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}>
      <div className=" mb-2">
        <ModalHeader
          title={"New Team"}
          setIsModalOpen={setShowModal}
        />
      </div>
      <CardLayout>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({ setFieldValue, setFieldTouched }) => (
            <Form>
              <div className=" py-4 px-4  pb-8 grid grid-cols-2 border-t border-b  gap-y-4 gap-x-[50px]">
                <LeadField
                  apiError={errorAdd?.errors?.team_name}
                  label={"Name:"}
                  name={"name"}
                  type={"text"}
                  placeholder={""}
                  id={"name"}
                />
                {/* <LeadField
                  label={"Month:"}
                  name={"month"}
                  type={"month"}
                  placeholder={""}
                  id={"month"}
                /> */}
                <div className="">
                  <label
                    htmlFor={"leader"}
                    className="  col-span-3 mt-1">
                    <MainItemText>{"Team Leader"}:</MainItemText>
                  </label>
                  <div className="  col-span-9">
                    <SingleSelectFilterDropdown
                      setFieldValues={(value) => setFieldValue("leader", value)}
                      setTouched={() => setFieldTouched("leader", true)}
                      filters={users}
                      placeholder="Select Leader"
                      width=" w-full   "
                    />
                  </div>
                  <ErrorMessage
                    component={"div"}
                    name="leader"
                    className=" text-red-500"
                  />
                  {errorAdd?.errors?.team_lead_id && (
                    <div className=" text-red-500">
                      {errorAdd?.errors?.team_lead_id}
                    </div>
                  )}
                </div>

                <div className="           ">
                  <label
                    htmlFor={"team_members"}
                    className="  col-span-3 mt-1">
                    <MainItemText>{"Team Members"}:</MainItemText>
                  </label>
                  <div className="  col-span-9">
                    <MultiSelectFilterDropdown
                      setFieldValues={(value) =>
                        setFieldValue("team_members", value)
                      }
                      setTouched={() => setFieldTouched("team_members", true)}
                      filters={usersNotInTeam}
                      placeholder="Select Team Members"
                      fieldName="team_members"
                      width=" w-full   "
                    />
                  </div>
                  <ErrorMessage
                    component={"div"}
                    name="team_members"
                    className=" text-red-500"
                  />
                  {errorAdd?.errors?.user_ids && (
                    <div className=" text-red-500">
                      {errorAdd?.errors?.user_ids}
                    </div>
                  )}
                </div>

                <div className="">
                  <label
                    htmlFor={"item_type"}
                    className="  col-span-3 mt-1">
                    <MainItemText>{"Item Type"}:</MainItemText>
                  </label>
                  <div className="  col-span-9">
                    <SingleSelectFilterDropdown
                      setFieldValues={(value) => {
                        setFieldValue("item_type", value);
                        setProductId(value);
                      }}
                      setTouched={() => setFieldTouched("item_type", true)}
                      filters={productTypeWithOutProduct}
                      placeholder="Select type"
                      width=" w-full   "
                    />
                  </div>
                  <ErrorMessage
                    component={"div"}
                    name="item_type"
                    className=" text-red-500"
                  />
                  {errorAdd?.errors?.type && (
                    <div className=" text-red-500">
                      {errorAdd?.errors?.type}
                    </div>
                  )}
                </div>

                <div className="           ">
                  <label
                    htmlFor={"item"}
                    className="  col-span-3 mt-1">
                    <MainItemText>{"Item"}:</MainItemText>
                  </label>
                  <div className="  col-span-9">
                    <MultiSelectFilterDropdown
                      setFieldValues={(value) => setFieldValue("item", value)}
                      setTouched={() => setFieldTouched("item", true)}
                      filters={products}
                      placeholder="Select Items"
                      fieldName="item"
                      width=" w-full   "
                    />
                  </div>
                  <ErrorMessage
                    component={"div"}
                    name="item"
                    className=" text-red-500"
                  />
                  {errorAdd?.errors?.array_of_ids && (
                    <div className=" text-red-500">
                      {errorAdd?.errors?.array_of_ids}
                    </div>
                  )}
                </div>
                <TeamField
                  apiError={errorAdd?.errors?.target}
                  label={"Monthly Target:"}
                  name={"monthlyTarget"}
                  type={"number"}
                  placeholder={" "}
                  id={"monthlyTarget"}
                />
              </div>

              <ModalFooter onClose={closeModal} />
            </Form>
          )}
        </Formik>
      </CardLayout>
    </Modal>
  );
};

export default AddTeam;
