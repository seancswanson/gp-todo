"use client";
import Link from "next/link";
import { TiFolderDelete, TiLightbulb, TiPlus, TiStar } from "react-icons/ti";
import { getAllTodos } from "@/data/tasks";
import TodoList from "../components/TodoList";
import Loading from "./loading";
import { Suspense, useRef } from "react";
import ActionDialog from "../components/ActionDialog";
import { ITask } from "../types/tasks";

interface IDashboardProps {
  tasks: ITask[];
  hasIncompleteTask: boolean;
}

export default function Dashboard({
  tasks,
  hasIncompleteTask,
}: IDashboardProps) {
  console.log(tasks, hasIncompleteTask);
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section className="m-auto mt-0 w-full">
      <div className="flex flex-col items-center justify-between">
        <div className="border-b py-1 text-l border-black w-full text-center">
          <span>Todo Items</span>
        </div>
        <div className="xs:flex-row flex-col border-b mb-2 gap-2 border-black py-2 text-sm flex items-center justify-center w-full text-center">
          <Link
            href="/todo/new"
            className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
          >
            Add New Item <TiPlus />
          </Link>
          <Link
            href="/todo/new"
            className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
          >
            Suggest Priority
            <TiLightbulb />
          </Link>
          <div className="h-2 border border-black"></div>
          <button
            className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
            onClick={(event) => {
              event.stopPropagation();
              console.log("Open Dialog", dialogRef.current);
              dialogRef.current?.showModal();
            }}
          >
            Clear All
            <TiFolderDelete />
          </button>
        </div>
        <div className="table-container xs:w-1/2 w-[96%] min-w-[100px] max-w-xl">
          {tasks ? <TodoList todos={tasks} /> : "loading"}
        </div>
        <ActionDialog
          ref={dialogRef}
          type="delete"
          isBatchOperation={true}
          allItemsComplete={hasIncompleteTask}
          ids={tasks.map((task) => task.id)}
        />
      </div>
    </section>
  );
}
