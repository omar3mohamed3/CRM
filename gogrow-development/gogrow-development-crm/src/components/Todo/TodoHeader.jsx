import { useDispatch, useSelector } from "react-redux";
import { PiListBold } from "react-icons/pi";
import { markAllTodos } from "../../Store/Todo/todoSlice";

const TodoHeader = ({ setOpenSide }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const allCompleted = todos.every((todo) => todo.complete);

  return (
    <div className="py-[34px] border-b px-[25px] flex justify-between items-center">
      <div className="flex items-center">
        <button
          className="mr-[70px]"
          onClick={() => setOpenSide((open) => !open)}>
          <PiListBold className="text-[24px]" />
        </button>
        {/* <div className="flex items-center">
          <input
            id="markall"
            type="checkbox"
            onChange={() => dispatch(markAllTodos(!allCompleted))}
            checked={allCompleted}
            className="mr-[15px] w-4 h-4"
          />
          <label
            className="text-[19px] font-bold leading-[28px]"
            htmlFor="markall">
            Mark All
          </label>
        </div> */}
      </div>

      <div className="text-[19px] font-bold leading-[28px]">
        {todos.length} Tasks left
      </div>
    </div>
  );
};

export default TodoHeader;
