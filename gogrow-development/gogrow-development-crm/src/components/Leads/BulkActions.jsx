import { useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import SingleSelectFilterDropdown from "../../pages/Leads/SingleSelectFilterDropdown";
import { leadsStatus, teamsList } from "../../pages/Leads/FakeLists";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignedUsers } from "../../Store/leadsSlice/AssignedUsersSlice";
import { fetchLeadStatuses } from "../../Store/leadsSlice/statusSlice/statusSlice";

const BulkActionModal = ({
  editBulk,
  isOpen,
  onClose,
  handleDelete = () => {
    console.log("delete");
  },
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { statuses } = useSelector((state) => state.leadsStatus);
  const { users } = useSelector((state) => state.assignedUsers);

  useEffect(() => {
    dispatch(fetchLeadStatuses());
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

  const onSubmit = (values) => {
    editBulk({ status_id: values.status, assigned_to: values.assigned });
  };
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className="bg-white rounded-lg absolute top-[20%] shadow-lg p-6 w-full max-w-md"
          ref={modalRef}>
          <h2 className="text-lg font-bold mb-4">Bulk Actions</h2>
          <button
            onClick={handleDelete}
            type="submit"
            className="px-2 py-1 text-[16px] mb-2 bg-red-600 text-white rounded-md">
            Mass Delete
          </button>
          <Formik
            initialValues={{ status: "", assigned: "" }}
            onSubmit={onSubmit}>
            {({ setFieldValue }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <SingleSelectFilterDropdown
                    filters={statuses}
                    setFieldValues={(value) => setFieldValue("status", value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Assigned
                  </label>
                  <SingleSelectFilterDropdown
                    filters={users}
                    setFieldValues={(value) => setFieldValue("assigned", value)}
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

export default BulkActionModal;
