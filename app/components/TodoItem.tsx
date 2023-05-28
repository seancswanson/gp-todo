"use client";
import Link from "next/link";
import { ITask } from "../types/tasks";
import {
  TiCancel,
  TiEdit,
  TiInputChecked,
  TiInputCheckedOutline,
  TiTrash,
} from "react-icons/ti";
import { useRef, useState } from "react";
import ActionDialog from "./ActionDialog";

interface ITodoItemProps {
  todo: ITask;
  onConfirm: () => void;
}

const TodoItem = ({ ...props }: ITodoItemProps) => {
  const [isTodoItemHovered, setIsTodoItemHovered] = useState(false);
  const [isActionButtonHovered, setIsActionButtonHovered] = useState(false);
  const [isActionContainerHovered, setIsActionContainerHovered] =
    useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <div
      className="bg-gray-200
                 border-t-0 border-l border-r border-b border-black flex flex-row"
    >
      <div className="text-center border-r flex border-black px-4 py-2">
        <input
          type="checkbox"
          checked={props.todo.completed}
          onChange={() => {
            console.log("changed");
          }}
        />
      </div>
      <Link
        href={`/todo/${props.todo.id}`}
        className="pl-4 py-2 flex justify-between w-full py-2"
        onMouseOver={() => setIsTodoItemHovered(true)}
        onMouseOut={() => setIsTodoItemHovered(false)}
      >
        {props.todo.title}
      </Link>

      <div
        className={`${isTodoItemHovered ? "opacity-50" : "opacity-0"} ${
          isActionContainerHovered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-200 flex items-center gap-1 pr-4`}
        onMouseOver={() => setIsActionContainerHovered(true)}
        onMouseOut={() => setIsActionContainerHovered(false)}
      >
        <button
          className={`${
            isActionButtonHovered ? "opacity-100" : "opacity-50"
          } transition-opacity duration-200 z-50`}
          onMouseOver={() => setIsActionButtonHovered(true)}
          onMouseOut={() => setIsActionButtonHovered(false)}
          onClick={(event) => {
            event.stopPropagation();
            dialogRef.current?.showModal();
          }}
        >
          <TiTrash />
        </button>
        <ActionDialog
          ref={dialogRef}
          type="delete"
          itemData={props.todo}
          isBatchOperation={false}
          ids={props.todo.id}
          onConfirm={props.onConfirm}
        />{" "}
      </div>
    </div>
  );
};

export default TodoItem;
