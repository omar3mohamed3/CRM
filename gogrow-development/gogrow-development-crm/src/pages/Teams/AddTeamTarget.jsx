import { IoClose } from "react-icons/io5";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  closeTeamTargetModal,
  createTeamTarget,
  editTeamTarget,
  fetchTeamTarget,
} from "../../Store/teamTargetSlice/teamTargetSlice";
import Modal from "../../components/Modal/Modal";
import CardLayout from "../../components/CardLayout";
import MainItemText from "../../components/Items/MainItemText";
import LeadField from "../Leads/leadField";
import { useParams } from "react-router-dom";

const AddTeamTarget = () => {
  const { id: teamId } = useParams();

  // Edit Service
  const dispatch = useDispatch();
  const { editedTeamTarget, isModalOpen, error } = useSelector(
    (state) => state.teamTarget
  );

  // Define validation schema
  const validationSchema = Yup.object().shape({
    month: Yup.string().required("Month is required"),
    target: Yup.string().required("Target is required"),
  });

  const initialValues = {
    month: editedTeamTarget?.month || "",
    target: editedTeamTarget?.target || "",
  };
  const onSubmit = (values) => {
    if (editedTeamTarget) {
      dispatch(
        editTeamTarget({
          teamId: teamId,
          target: values.target,
          targetId: editedTeamTarget.id,
        })
      );
    } else {
      dispatch(createTeamTarget({ teamId: teamId, targetData: values }))
        .unwrap()
        .then(() => dispatch(fetchTeamTarget(teamId)))
        .catch((err) => console.error(err));
    }
  };

  const closeServiceModal = () => {
    dispatch(closeTeamTargetModal());
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeServiceModal}>
      <CardLayout>
        <div className=" flex justify-between  text-[20px] font-medium leading-[30px] items-center">
          {/* Modal Title */}
          <span>{editedTeamTarget ? "Edit" : "Add"} Team Target</span>

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
                <div>
                  <LeadField
                    className={" max-w-full"}
                    label={"Team Target:"}
                    name={"month"}
                    type={"month"}
                    disable={editedTeamTarget?.id}
                    placeholder={""}
                    id={"month"}
                  />

                  <div className=" text-red-500 ">{error.errors.month}</div>
                </div>
                <div>
                  <LeadField
                    className={" max-w-full"}
                    label={"Target:"}
                    name={"target"}
                    type={"number"}
                    placeholder={""}
                    id={"target"}
                  />
                  <div className=" text-red-500 ">{error.errors.target}</div>
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

export default AddTeamTarget;
