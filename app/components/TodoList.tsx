import { ITask } from "../types/tasks";
import { TiEdit, TiTrash } from "react-icons/ti";

interface TodoListProps {
  todos: ITask[];
}

const TodoList = ({ ...props }: TodoListProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="align-middle inline-block min-w-full">
        <div className="overflow-hidden border-b border-black border-b-0">
          <table className="min-w-full divide-y divide-black">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2 w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.todos.map((todo, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-200" : ""}
                >
                  <td className="px-4 py-2 border border-black">
                    {todo.title}
                  </td>
                  <td className="px-4 py-2 border border-black text-right">
                    <div className="flex justify-center space-x-2">
                      <button>
                        <TiEdit />
                      </button>
                      <button>
                        <TiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
