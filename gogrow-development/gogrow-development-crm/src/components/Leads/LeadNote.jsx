import { Formik, Form, Field } from "formik";
import { UserCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  addNote,
  deleteNote,
  fetchNotes,
} from "../../Store/leadsSlice/leadNoteSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Layout/Loader";

const LeadNote = () => {
  const { id: leadId } = useParams();
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.leadNote);

  useEffect(() => {
    dispatch(fetchNotes({ leadId })); // Fetch notes for lead ID 1489
  }, [dispatch, leadId]);

  const initialValues = { note: "" };

  // Validation schema
  const validationSchema = Yup.object({
    note: Yup.string().required("Note is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(addNote({ leadId, noteContent: values.note })).then(() =>
      dispatch(fetchNotes({ leadId }))
    );
    resetForm();
  };

  const handleDelete = (noteId) => {
    dispatch(deleteNote({ leadId, noteId }));
  };
  return (
    <div className=" h-[59vh] overflow-y-auto mx-auto p-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        <Form>
          <div className="mb-4">
            <Field
              as="textarea"
              name="note"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>
          <div className=" flex justify-end   items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded-md">
              Add Note
            </button>
          </div>
        </Form>
      </Formik>

      <div className="mt-8 border-t-2 text-[#141414] divide-y-2">
        {loading ? (
          <Loader />
        ) : (
          notes?.map((note) => (
            <div
              key={note.id}
              className="py-4 px-5 flex items-start justify-between">
              <div className="py-4 px-5 flex items-start">
                <UserCircle className="w-10 h-10 text-orange-300 mr-3" />
                <div>
                  <div className="font-semibold flex justify-between leading-[28px] text-[18px]">
                    {note.author}
                    {/* Delete */}
                  </div>
                  <div className="text-[14px] leading-[20px]  text-[#141414] ">
                    Noted added: {note.created_at}
                  </div>
                  <p className="mt-1">{note.content}</p>
                </div>
              </div>
              {/* Delete */}
              {/* <button
                disabled={loading}
                onClick={() => handleDelete(note?.id)}
                className=" px-1">
                <FaRegTrashCan className="ml-auto text-[#515151]" />
              </button> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeadNote;
