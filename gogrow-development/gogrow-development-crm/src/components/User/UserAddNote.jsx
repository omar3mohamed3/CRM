import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createNote,
  editNote,
  fetchNotes,
} from "../../Store/usersSlice/notesSlice";
import toast, { ToastBar } from "react-hot-toast";

const UserAddNote = ({ onClose, noteId, note }) => {
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const initialValues = {
    note: note || "",
  };

  const validationSchema = Yup.object({
    note: Yup.string().required(" Note is required"),
  });

  const onSubmit = (values) => {
    if (noteId) {
      dispatch(
        editNote({
          noteId: noteId,
          updatedNote: values.note,
        })
      ) // Add a new note
        .unwrap()
        .then(() => {
          toast.success("Note has been Edited");
          dispatch(fetchNotes());
          onClose();
        });
    } else {
      dispatch(
        createNote({
          note: {
            user_id: userId,
            note: values.note,
            date_added: "2024-10-08",
          },
        })
      ) // Add a new note
        .unwrap()
        .then(() => {
          toast.success("Note has been added");
          dispatch(fetchNotes());
          onClose();
        });
    }
  };

  return (
    <div className="  px-2">
      <label
        htmlFor="note"
        className=" text-[12px] leading-[18px] font-medium text-primary text-opacity-65">
        Note Description:
      </label>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ setFieldValue }) => (
          <Form className=" w-full  h-full flex flex-col  py-2">
            <Field
              as="textarea"
              name="note"
              className=" text-[16px] p-3 w-full h-full  focus:outline-none rounded-lg resize-none border-borderGray min-h-[145px]  flex-grow  border"
              id="note"
            />
            <div className="w-full flex pt-2 gap-5 justify-end">
              <button
                type="button"
                onClick={() => onClose}
                className="rounded-[8px]   w-[100px] text-white px-1 py-1 bg-customBlue text-[14px] leading-[23px]">
                Close
              </button>
              <button
                type="submit"
                className="rounded-[8px]   w-[100px] text-white px-1 py-1 bg-customBlue text-[14px] leading-[23px]">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserAddNote;
