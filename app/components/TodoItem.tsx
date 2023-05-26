import { ITask } from "../types/tasks";
import {
  TiEdit,
  TiInputChecked,
  TiInputCheckedOutline,
  TiTrash,
} from "react-icons/ti";

const TodoItem = ({ ...props }: ITask) => {
  return (
    <div
      className="bg-gray-200
                     border border-black flex flex-row items-center"
    >
      <div className="text-center border-r border-black  px-2">
        <input type="checkbox" checked={props.completed} />
      </div>
      <div className="flex-grow px-2">{props.title}</div>
      <div className="flex justify-center space-x-2">
        <button>
          <TiEdit />
        </button>
        <button>
          <TiTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
