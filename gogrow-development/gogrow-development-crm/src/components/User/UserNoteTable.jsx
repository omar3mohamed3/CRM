import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, fetchNotes } from "../../Store/usersSlice/notesSlice";
import UserAddNote from "./UserAddNote";

const UserNoteTable = ({ componentRef }) => {
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  // Track the currently edited note ID
  const [editingNoteId, setEditingNoteId] = useState(null);
  const { notes, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    if (userId) {
      dispatch(fetchNotes(userId)); // Fetch notes for the user on mount
    }
  }, [dispatch, userId]);

  const notesData = notes?.map((note) => ({
    id: note.id,
    note: note.note,
    addedFrom: note.added_from,
    dateAdded: note.date_added,
  }));

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote({ userId, noteId })); // Delete a note
  };

  const handleEditNote = (noteId) => {
    setEditingNoteId(noteId); // Set the note being edited
  };
  const handleCancelEdit = () => {
    setEditingNoteId(null); // Cancel editing
  };

  return (
    <div className="      overflow-x-auto px-1">
      <table className="   w-full   border-none  bg-white border border-gray-300">
        <thead className=" block w-full">
          <tr className="bg-[#707070] bg-opacity-15 grid grid-cols-5">
            <th className="text-left py-1 px-4 col-span-2 font-bold text-sm">
              Note
            </th>
            <th className="text-left py-1 px-4 font-bold text-sm">
              Added From
            </th>
            <th className="text-left py-1 px-4 font-bold text-sm">
              Date Added
            </th>
            <th className="text-left py-1 px-4 font-bold text-sm">Options</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto  h-full block w-full">
          {userId &&
            notesData.map((note, index) => (
              <tr
                key={index}
                className="border-t relative border-gray-200 text-[11px]  grid grid-cols-5 gap-2 ">
                <td className="py-3 px-4  col-span-2">
                  <div className="  max-w-[200px]">
                    {note.note.length > 40
                      ? note.note.slice(0, 40) + "..."
                      : note.note}
                  </div>
                </td>
                <td className="py-3 px-4  ">{note.addedFrom}</td>
                <td className="py-3 px-4 ">{note.dateAdded}</td>
                <td className="py-3 px-4 ">
                  <div className="flex  pl-4  text-[14px] gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditNote(note.id)}
                      className="text-[#515151] hover:text-blue-700">
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      type="button"
                      className=" text-[#515151] hover:text-red-700">
                      <IoTrashOutline />
                    </button>
                  </div>
                </td>
                {/* Inline edit form under the row */}
                {editingNoteId === note.id && (
                  <td
                    colSpan={3}
                    className="py-3 px-4 col-span-5">
                    <UserAddNote
                      onClose={() => setEditingNoteId(null)}
                      note={note.note} // Pass current note data
                      onCancel={handleCancelEdit} // Cancel edit mode
                      noteId={note.id} // Pass the userId for submission
                    />
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserNoteTable;
