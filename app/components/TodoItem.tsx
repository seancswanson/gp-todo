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
import { updateItem } from "@/data/tasks";
import { IconContext } from "react-icons/lib";

interface ITodoItemProps {
  todo: ITask;
  onConfirm: () => void;
}

const TodoItem = ({ ...props }: ITodoItemProps) => {
  const [completed, setCompleted] = useState(props.todo.completed);
  const [isTodoItemHovered, setIsTodoItemHovered] = useState(false);
  const [isActionButtonHovered, setIsActionButtonHovered] = useState(false);
  const [isActionContainerHovered, setIsActionContainerHovered] =
    useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <IconContext.Provider value={{ size: "1.3em" }}>
      <div className="flex min-h-[40px] flex-row border-b border-l  border-r border-t-0 border-black bg-white shadow-2xl">
        <div className="flex border-r border-black px-4 py-2 text-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={async () => {
              const newStatus = !completed;
              setCompleted(newStatus);
              await updateItem(`http://127.0.0.1:3001/todos/${props.todo.id}`, {
                ...props.todo,
                completed: newStatus,
              });
              props.onConfirm();
            }}
          />
        </div>

        <Link
          href={`/${props.todo.id}/`}
          as={`/${props.todo.id}`}
          className="flex w-full justify-between text-ellipsis py-2 pl-4"
          onMouseOver={() => setIsTodoItemHovered(true)}
          onMouseOut={() => setIsTodoItemHovered(false)}
        >
          {props.todo.title ? props.todo.title : "Untitled Task"}
        </Link>

        <div
          className={`${isTodoItemHovered ? "opacity-50" : "opacity-0"} ${
            isActionContainerHovered ? "opacity-100" : "opacity-0"
          } flex items-center gap-1 pr-4 transition-opacity duration-200`}
          onMouseOver={() => setIsActionContainerHovered(true)}
          onMouseOut={() => setIsActionContainerHovered(false)}
        >
          <button
            className={`${
              isActionButtonHovered ? "opacity-100" : "opacity-50"
            } z-50 transition-opacity duration-200`}
            onMouseOver={() => setIsActionButtonHovered(true)}
            onMouseOut={() => setIsActionButtonHovered(false)}
            onClick={(event) => {
              event.stopPropagation();
              dialogRef.current?.showModal();
            }}
          >
            <TiTrash width={40} height={40} />
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
    </IconContext.Provider>
  );
};

export default TodoItem;
