"use client";
import Link from "next/link";
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
                 border-t-0 border-l border-r border-b border-black flex flex-row items-center"
    >
      <div className="text-center border-r border-black px-4 py-2">
        <input
          type="checkbox"
          checked={props.completed}
          onChange={() => {
            console.log("changed");
          }}
        />
      </div>
      <Link
        href={`/todo/${props.id}`}
        className=" px-4 py-2 flex justify-between w-full py-2"
      >
        {props.title}
        <div className="flex gap-1 opacity-25 hover:opacity-50 transition-opacity duration-200">
          <button className="hover:opacity-100">
            <TiTrash />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default TodoItem;
