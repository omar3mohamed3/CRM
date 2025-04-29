import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import SingleSelectFilterDropdown from "../../pages/Leads/SingleSelectFilterDropdown";
import { leadsStatus, teamsList } from "../../pages/Leads/FakeLists";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignedUsers } from "../../Store/leadsSlice/AssignedUsersSlice";

const LeadReassignModal = ({ isOpen, onClose, reAssign }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { users } = useSelector((state) => state.assignedUsers);

  useEffect(() => {
    dispatch(fetchAssignedUsers());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const initialValues = {
    assigned_to: "",
  };

  const validationSchema = Yup.object({
    assigned_to: Yup.string().required("assigned_to is required"),
  });

  const onSubmit = (values) => {
    reAssign(values);
  };
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className="bg-white rounded-lg absolute top-[20%] shadow-lg p-6 w-full max-w-md"
          ref={modalRef}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ setFieldValue }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Assigned
                  </label>
                  <SingleSelectFilterDropdown
                    filters={users}
                    setFieldValues={(value) =>
                      setFieldValue("assigned_to", value)
                    }
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="mr-2 px-4 py-2 bg-gray-200 rounded-md">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="mr-2 px-4 py-2 bg-gray-200 rounded-md">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
};

export default LeadReassignModal;
