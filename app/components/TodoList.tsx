import { ITask } from "../types/tasks";
import { TiEdit, TiInputChecked, TiTrash } from "react-icons/ti";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: ITask[];
}

const TodoList = ({ ...props }: TodoListProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="align-middle inline-block min-w-full">
        <div className="overflow-hidden border-black border-b-0">
          <div className="min-w-full divide-y divide-black flex flex-col">
            <div className="flex flex-row px-4 py-0 items-center">
              <div className="w-5 all-small-caps">
                <TiInputChecked />
              </div>
              <div className="flex-grow px-4 py-0 all-small-caps">Title</div>
            </div>
            {props.todos.map((todo, index) => (
              <TodoItem {...todo} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
