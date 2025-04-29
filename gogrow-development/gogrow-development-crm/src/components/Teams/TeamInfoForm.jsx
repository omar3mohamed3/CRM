import CardLayout from "../CardLayout";
import { ErrorMessage, Form, Formik } from "formik";
import MainItemText from "../Items/MainItemText";
import * as Yup from "yup";
import SingleSelectFilterDropdown from "../../pages/Leads/SingleSelectFilterDropdown";
import LeadField from "../../pages/Leads/leadField";
import MultiSelectFilterDropdown from "../../pages/Leads/MultiSelectFilterDropdown";
import {
  fetchAssignedUsers,
  fetchAssignedUsersEditTeam,
} from "../../Store/leadsSlice/AssignedUsersSlice";
import { fetchProductTypes } from "../../Store/leadsSlice/ProductTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductDetails } from "../../Store/leadsSlice/productDetailsSlice";
import { editTeamTarget } from "../../Store/teamTargetSlice/teamTargetSlice";
import {
  editTeamDetail,
  fetchTeamDetail,
} from "../../Store/teamsSlice/teamDetailSlice";
import { useNavigate, useParams } from "react-router-dom";

const TeamInfoForm = () => {
  const navigate = useNavigate();
  const { id: teamId } = useParams();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.assignedUsers);
  const { productTypes } = useSelector((state) => state.productType);
  const { products } = useSelector((state) => state.productDetails);
  const { team, loading, error } = useSelector((state) => state.teamDetail);
  const [productId, setProductId] = useState(team?.type_info?.type_id || null);

  const productTypeWithOutProduct = productTypes.filter((type) => type.id != 4);

  useEffect(() => {
    dispatch(fetchAssignedUsersEditTeam(teamId));
    dispatch(fetchProductTypes());
  }, [dispatch, teamId]);

  useEffect(() => {
    if (productId == null) return;
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);
  // Define validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    leader: Yup.string().required("Team Leader is required"),
    team_members: Yup.array().required("Team Members Target is required"),
    item_type: Yup.string().required("Item Type is required"),
    item: Yup.array().required("Items is required"),
    // month: Yup.string().required("Month of Team is required"),
    // monthlyTarget: Yup.number().required("Monthly Target is required"),
    // assigned: Yup.array()
    //   .min(1, "You must assign at least one person")
    //   .required("Assigned is required"),
  });
  const initialValues = {
    name: team?.team_name || "",
    leader: team?.team_lead_id || "",
    team_members: team?.sale_team_members.map((member) => member.id) || [],
    item_type: team?.type_info?.type_id || "",
    item: team?.items_info?.map((item) => item.id) || [],
    // monthlyTarget: "",
    // month: "",
  };
  const onSubmit = (values) => {
    const userIds = Array.isArray(values.team_members)
      ? values.team_members.map((member) =>
          typeof member === "object" && member !== null ? member.id : member
        )
      : [];

    const itemIds = Array.isArray(values.item)
      ? values.item.map((item) =>
          typeof item === "object" && item !== null ? item.id : item
        )
      : [];
    dispatch(
      editTeamDetail({
        teamId: teamId,
        teamData: {
          team_lead_id: values.leader,
          team_name: values.name,
          user_ids: userIds,
          type: values.item_type,
          array_of_ids: itemIds,
        },
      })
    )
      .unwrap()
      .then(() => navigate("/teams"))
      .catch((error) => console.log(error));
  };

  const members = team?.sale_team_members?.map((value) => ({
    id: value.id,
    label: value.name,
  }));
  const itemType = {
    id: team?.type_info?.type_id,
    label: team?.type_info?.type_name,
  };
  const teamLeader = {
    id: team?.team_lead_id,
    label: team?.team_lead_name,
  };

  const items = team?.items_info?.map((item) => ({
    id: item?.id,
    label: item?.name,
  }));

  return (
    <CardLayout>
      <h2 className=" text-[20px] font-semibold">Feb</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ setFieldValue, setFieldTouched }) => (
          <Form>
            <div className=" py-4 px-4  pb-8 grid grid-cols-2 border-t border-b  gap-y-4 gap-x-[50px]">
              {/* Team Name */}
              <LeadField
                className={" max-w-full"}
                label={"Name:"}
                name={"name"}
                type={"text"}
                placeholder={""}
                id={"name"}
              />

              {/* Team Leader */}
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
                    editedValues={teamLeader}
                    placeholder={team?.team_lead_name || "Select Team Leader"}
                    width=" w-full   "
                  />
                </div>
                <ErrorMessage
                  component={"div"}
                  name="leader"
                  className=" text-red-500"
                />
              </div>
              {/* Team Members */}
              <div className="">
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
                    editedValues={members}
                    setTouched={() => setFieldTouched("team_members", true)}
                    filters={users}
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
              </div>
              {/* Item Type */}
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
                    editedValues={itemType}
                    placeholder={team?.type_info?.type_name || "Select type"}
                    width=" w-full   "
                  />
                </div>
                <ErrorMessage
                  component={"div"}
                  name="item_type"
                  className=" text-red-500"
                />
              </div>
              {/* Items */}
              <div className=" ">
                <label
                  htmlFor={"item"}
                  className="  col-span-3 mt-1">
                  <MainItemText>{"Item"}:</MainItemText>
                </label>
                <div className="  col-span-9">
                  <MultiSelectFilterDropdown
                    setFieldValues={(values) => setFieldValue("item", values)}
                    setTouched={() => setFieldTouched("item", true)}
                    editedValues={items}
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
              </div>
              {/* Monthly Target */}
              {/* <TeamField
                label={"Monthly Target:"}
                name={"monthlyTarget"}
                type={"number"}
                placeholder={" "}
                id={"monthlyTarget"}
              /> */}
            </div>
            <div className=" flex gap-4 mt-2 justify-end px-4">
              <button
                type="submit"
                className="   py-1  px-8 rounded text-white bg-[#2799df] text-[15px] leading-[23px]">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </CardLayout>
  );
};

export default TeamInfoForm;
