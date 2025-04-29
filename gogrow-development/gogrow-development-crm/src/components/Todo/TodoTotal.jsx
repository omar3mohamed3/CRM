import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../Store/Todo/todoSlice";

const TodoTotal = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  const completedTodos = todos.filter((todo) => todo.is_completed).length;
  const incompletedTodos = todos.filter((todo) => !todo.is_completed).length;

  return (
    <div>
      <div className="py-[34px] px-[25px] border-b">
        <h2 className="text-[19px] font-bold leading-[28px]">Todo</h2>
      </div>
      <div className="px-6 p-9 font-bold text-[18px]">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className="flex w-full justify-between items-center">
          <div>All</div>
          <p className="flex justify-center text-white items-center w-[30px] h-[30px] rounded-full bg-[#0085DB]">
            {todos.length}
          </p>
        </button>
        <button
          onClick={() => dispatch(setFilter("incomplete"))}
          className="mt-[29px] w-full flex justify-between items-center">
          <div>Incompleted</div>
          <p className="flex justify-center text-white items-center w-[30px] h-[30px] rounded-full bg-[#FB977D]">
            {incompletedTodos}
          </p>
        </button>
        <button
          onClick={() => dispatch(setFilter("complete"))}
          className="w-full mt-[29px] flex justify-between items-center">
          <div>Completed</div>
          <p className="flex justify-center text-white items-center w-[30px] h-[30px] rounded-full bg-[#4BD08B]">
            {completedTodos}
          </p>
        </button>
      </div>
    </div>
  );
};

export default TodoTotal;
