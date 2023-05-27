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

const TodoItem = ({
  id,
  title,
  description,
  completed,
  dateCreated,
  age,
}: ITask) => {
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
      <div className="text-center border-r border-black px-4 py-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => {
            console.log("changed");
          }}
        />
      </div>
      <Link
        href={`/todo/${id}`}
        className="pl-4 py-2 flex justify-between w-full py-2"
        onMouseOver={() => setIsTodoItemHovered(true)}
        onMouseOut={() => setIsTodoItemHovered(false)}
      >
        {title}
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
            console.log("Open Dialog");
            dialogRef.current?.showModal();
          }}
        >
          <TiTrash />
        </button>
        <dialog
          ref={dialogRef}
          id="dialog"
          className="p-0 rounded-md shadow-lg"
        >
          <form method="dialog" className="flex flex-col gap-4">
            <header className="py-2 px-4 bg-gray-200">
              <h3>Delete this task?</h3>
            </header>
            <article className="py-2 px-4">
              <p className="p-0">
                {`This task is ${completed ? "complete" : "not complete"}.`}
              </p>
            </article>
            <footer className="py-2 px-4">
              <menu className="sm:flex-row flex-col gap-2 text-sm flex items-center justify-center w-full text-center">
                <button
                  className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
                  onClick={(event) => {
                    console.log("No, Cancel");
                  }}
                >
                  Cancel <TiCancel />
                </button>
                <button
                  className="transform bg-red-400 text-gray-900 transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
                  onClick={(event) => {
                    console.log("Yes, Delete");
                  }}
                >
                  Delete <TiTrash />
                </button>
              </menu>
            </footer>
          </form>
        </dialog>{" "}
      </div>
    </div>
  );
};

export default TodoItem;
