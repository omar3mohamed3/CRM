import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { useEffect } from "react";
import {
  deleteReminder,
  editReminder,
  fetchReminders,
} from "../../Store/leadsSlice/leadReminders";
import { useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

const ReminderTable = () => {
  const { id: leadId } = useParams();
  const { reminders, loading, error } = useSelector((state) => state.reminders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReminders({ leadId }));
  }, [dispatch, leadId]);

  const handleDelete = (reminderId) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      dispatch(deleteReminder({ leadId, reminderId }));
    }
  };

  const handleEdit = (reminder) => {
    const updatedDescription = prompt(
      "Edit reminder description:",
      reminder.description
    );
    if (updatedDescription) {
      const updatedReminder = {
        ...reminder,
        description: updatedDescription,
      };
      dispatch(
        editReminder({
          leadId,
          reminderId: reminder.id,
          reminderData: updatedReminder,
        })
      );
    }
  };

  // Example data to populate the table
  const reminderDates = reminders?.map((reminder) => ({
    id: reminder?.id || 1,
    description: reminder?.description,
    date: reminder?.date,
    remind: reminder?.remind_to,
    notified: reminder?.is_notified,
  }));

  return (
    <div className="overflow-x-auto h-[55vh]  overflow-y-auto my-2">
      <table className="min-w-full  border-none  border-gray-200">
        <thead>
          <tr>
            <th className="  border-gray-200 px-4 py-2 text-left">#</th>
            <th className="  border-gray-200 px-4 py-2 text-left">
              Description
            </th>
            <th className="  border-gray-200 px-4 py-2 text-left">Date</th>
            <th className=" first-line: border-gray-200 px-4 py-2 text-left">
              Remind
            </th>
            <th className="  border-gray-200 px-4 py-2 text-left">
              Is Notified?
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className=" h-full">
              <td
                colSpan={5}
                className="py-4 h-[400px] text-center">
                <Loader />
              </td>
            </tr>
          ) : (
            reminderDates.map((item, index) => (
              // <tr key={item.id}>
              <tr key={index}>
                <td className="border border-x-0 border-gray-200 px-4 py-2">
                  {item.id}
                </td>
                <td className="border  border-x-0 max-w-[200px] border-gray-200 px-4 py-2">
                  {item.description}
                </td>
                <td className="border  border-x-0  border-gray-200 px-4 py-2">
                  {item.date}
                </td>
                <td className="border  border-x-0  border-gray-200 px-4 py-2">
                  <span className="inline-flex items-center">
                    <span className="mr-2">💡</span> {item.remind}
                  </span>
                </td>
                <td className="border border-x-0 border-gray-200 px-4 py-2">
                  {item.notified}
                </td>
                <td className="border border-x-0 border-gray-200 px-4 py-2">
                  <div className="flex  pl-4  text-[14px] gap-2">
                    {/* <button
                      type="button"
                      onClick={() => handleEdit(item.id)}
                      className="text-[#515151] hover:text-blue-700">
                      <FaRegEdit />
                    </button> */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      type="button"
                      className=" text-[#515151] hover:text-red-700">
                      <IoTrashOutline />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReminderTable;
