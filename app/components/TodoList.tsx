import { ITask } from "../types/tasks";
import { TiEdit, TiInputChecked, TiTrash } from "react-icons/ti";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: ITask[];
  onConfirm: () => void;
}

const TodoList = ({ todos, onConfirm }: TodoListProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="align-middle inline-block min-w-full">
        <div className="flex flex-col">
          <div className="flex flex-row px-4 py-0 items-center">
            <div className="w-5 all-small-caps">
              <TiInputChecked />
            </div>
            <div className="flex-grow px-4 py-0 all-small-caps">Title</div>
          </div>
          <div className="border-t border-black">
            {todos.map((todo: ITask, index: number) => (
              <TodoItem todo={todo} onConfirm={onConfirm} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
