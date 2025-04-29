import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addReminder,
  fetchReminders,
} from "../../Store/leadsSlice/leadReminders";
import { useParams } from "react-router-dom";
import SingleSelectFilterDropdown from "../../pages/Leads/SingleSelectFilterDropdown";
import { useEffect } from "react";
import { fetchAssignedUsers } from "../../Store/leadsSlice/AssignedUsersSlice";
// Assuming reminderSlice is set up

const SetReminderModal = ({ isOpen, onClose }) => {
  const { id: leadId } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.assignedUsers);
  // Fetch lead info with ID 9
  useEffect(() => {
    //Lists
    dispatch(fetchAssignedUsers());
  }, [dispatch, leadId]);

  const validationSchema = Yup.object({
    date: Yup.string().required("Date is required"),
    reminder: Yup.string(),
    description: Yup.string().required("Description is required"),
  });

  const initialValues = {
    date: "",
    reminder: "",
    description: "",
    sendEmail: false,
  };

  const handleSubmit = (values, { resetForm }) => {
    const payload = {
      description: values.description,
      notify_date: values.date,
      assigned_to: values?.reminder, // Assuming this is the person to remind
      email_notification: values.sendEmail,
    };

    dispatch(addReminder({ leadId, reminderData: payload }))
      .unwrap()
      .then(() => {
        resetForm(); // Reset the form on successful submission
        onClose(); // Close the modal
        dispatch(fetchReminders({ leadId })); //Fetch Data
      })
      .catch((error) => {
        console.error("Error adding reminder:", error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-medium mb-4">Set Lead Reminder</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ values, setFieldValue, setFieldTouched }) => (
            <Form>
              {/* Date Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Date to be notified
                </label>
                <Field
                  type="datetime-local"
                  name="date"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              {/* Reminder Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Set reminder to
                </label>
                <SingleSelectFilterDropdown
                  width=" w-full"
                  placeholder="reminder"
                  setTouched={() => setFieldTouched("reminder", true)}
                  setFieldValues={(value) => setFieldValue("reminder", value)}
                  filters={users}
                />
                {/* <Field
                  as="select"
                  name="reminder"
                  className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="">Select an option</option>
                  <option value="Go Grow">Go Grow</option>
                  <option value="Follow Up">Follow Up</option>
                </Field> */}
                <ErrorMessage
                  name="reminder"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              {/* Send Email Checkbox */}
              <div className="mb-4 flex items-center">
                <Field
                  type="checkbox"
                  name="sendEmail"
                  className="mr-2"
                />
                <label className="text-sm font-medium">
                  Send also an email for this reminder
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-200 rounded"
                  onClick={onClose}>
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SetReminderModal;
