import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import Hashtag from "../../components/Hashtag";
import TodoHeader from "../../components/Todo/TodoHeader";
import TodoTotal from "../../components/Todo/TodoTotal";
import {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  setFilter,
  fetchTodos,
} from "../../Store/Todo/todoSlice";
import Loader from "../../components/Layout/Loader";
import toast from "react-hot-toast";

const Todo = () => {
  const dispatch = useDispatch();
  const { loading, items: todos, filter } = useSelector((state) => state.todos);

  const [openSide, setOpenSide] = useState(true);
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const onSubmit = (values, { resetForm }) => {
    dispatch(addTodo(values.todo)).then(() => dispatch(fetchTodos()));
    resetForm();
  };

  const validateSchema = Yup.object({
    todo: Yup.string().required("Required"),
  });

  const handleEditSubmit = (values, { resetForm }) => {
    dispatch(updateTodo({ id: editTodoId, text: values.todo })).then(() =>
      dispatch(fetchTodos())
    );
    setEditTodoId(null);
    resetForm();
  };

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "complete") return todo.is_completed;
    if (filter === "incomplete") return !todo.is_completed;
    return true;
  });

  return (
    <div className="flex flex-col h-full pb-1">
      <div>
        <Hashtag># Todo</Hashtag>
      </div>
      <div className="grid flex-grow h-full grid-cols-12 gap-4">
        {openSide && (
          <div className="col-span-3 shadow-card rounded-card bg-white">
            <TodoTotal />
          </div>
        )}
        <div
          className={`${
            openSide ? "col-span-9" : "col-span-12"
          } shadow-card rounded-card bg-white`}>
          <TodoHeader setOpenSide={setOpenSide} />
          <div>
            <Formik
              initialValues={{ todo: "" }}
              validationSchema={validateSchema}
              onSubmit={onSubmit}>
              <Form className="border-b">
                <div className="flex px-[26px] gap-10 py-6">
                  <Field
                    name="todo"
                    id="todo"
                    className="border rounded-lg resize-none p-4 focus:outline-none h-[150px] flex-grow"
                    as="textarea"
                  />
                  <div className="flex items-center">
                    <button
                      type="submit"
                      className="text-[18px] font-bold text-white bg-[#1492E6] rounded-[24px] py-2 px-6">
                      Add Todo
                    </button>
                  </div>
                  <ErrorMessage
                    component="div"
                    className="text-red-500"
                    name="todo"
                  />
                </div>
              </Form>
            </Formik>
            {loading ? (
              <Loader />
            ) : (
              <div className="h-[265px] overflow-y-auto py-4">
                {filteredTodos?.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex flex-col px-[26px]">
                    <div className="flex items-center justify-between border-b py-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={todo.is_completed}
                          onChange={() =>
                            dispatch(toggleTodo(todo.id)).then(() => {
                              dispatch(fetchTodos());
                              if (!todo.is_completed)
                                return toast.success(
                                  `Task ${todo.task} marked as Completed`
                                );
                              if (todo.is_completed)
                                return toast.success(
                                  `Task ${todo.task} marked as not completed`
                                );
                            })
                          }
                          className="mr-4 w-4 h-4"
                        />
                        <div>
                          <p className="text-[18px] text-borderGray">
                            {todo.task}
                          </p>
                          <p className="text-xs text-borderGray">
                            {todo.updated_at}
                          </p>
                        </div>
                      </div>
                      <div className="flex pl-4 text-[18px] gap-2">
                        <button
                          type="button"
                          onClick={() => setEditTodoId(todo.id)}
                          className="text-[#515151] hover:text-blue-700">
                          <FaRegEdit />
                        </button>
                        <button
                          onClick={() => dispatch(deleteTodo(todo.id))}
                          className="text-[#515151] hover:text-red-700">
                          <IoTrashOutline />
                        </button>
                      </div>
                    </div>
                    {editTodoId === todo.id && (
                      <div className="border-b">
                        <Formik
                          initialValues={{ todo: todo.text }}
                          validationSchema={validateSchema}
                          onSubmit={handleEditSubmit}>
                          <Form className="py-4">
                            <div className="flex gap-10">
                              <Field
                                name="todo"
                                id="editTodo"
                                className="border rounded-lg resize-none p-4 focus:outline-none h-[80px] flex-grow"
                                as="textarea"
                              />
                              <div className="flex flex-col justify-center gap-2 items-center">
                                <button
                                  type="submit"
                                  className="text-[14px] font-medium text-white bg-[#1492E6] rounded-[24px] py-px px-4">
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditTodoId(null)}
                                  className="text-[14px] font-medium text-white bg-[#1492E6] rounded-[24px] py-px px-4">
                                  Close
                                </button>
                              </div>
                              <ErrorMessage
                                component="div"
                                className="text-red-500"
                                name="todo"
                              />
                            </div>
                          </Form>
                        </Formik>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
