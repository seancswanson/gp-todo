"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { TiFolderDelete, TiLightbulb, TiPlus, TiStar } from "react-icons/ti";
import { getAllTodos } from "@/data/tasks";
import TodoList from "../components/TodoList";
import Loading from "./loading";
import ActionDialog from "../components/ActionDialog";
import { ITask } from "../types/tasks";
import NewTodoItemDialog from "../components/NewTodoItemDialog";

export default function Dashboard() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [hasIncompleteTask, setHasIncompleteTask] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const actionDialogRef = useRef<HTMLDialogElement>(null);
  const newTodoItemDialogRef = useRef<HTMLDialogElement>(null);

  // Fetch tasks from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const fetchedTasks = await getAllTodos();
      setTasks(fetchedTasks);
      setHasIncompleteTask(fetchedTasks.some((task) => !task.completed));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Refresh tasks from API
  const refreshTasks = async () => {
    setIsLoading(true);

    const fetchedTasks = await getAllTodos();
    setTasks(fetchedTasks);
    setHasIncompleteTask(fetchedTasks.some((task) => !task.completed));
    setIsLoading(false);
  };

  return (
    <section className="m-auto mt-0 w-full">
      <div className="flex flex-col items-center justify-between">
        <div className="border-b py-1 text-l border-black w-full text-center">
          <span>Todo Items</span>
        </div>
        <div className="xs:flex-row flex-col border-b mb-2 gap-2 border-black py-2 text-sm flex items-center justify-center w-full text-center">
          <button
            className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
            onClick={(event) => {
              event.stopPropagation();
              newTodoItemDialogRef.current?.showModal();
            }}
          >
            Add New Item <TiPlus />
          </button>
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
              actionDialogRef.current?.showModal();
            }}
          >
            Clear All
            <TiFolderDelete />
          </button>
        </div>
        <div className="table-container xs:w-1/2 w-[96%] min-w-[100px] max-w-xl">
          {isLoading ? (
            "Loading..."
          ) : tasks.length > 0 ? (
            <TodoList todos={tasks} onConfirm={refreshTasks} />
          ) : (
            "No tasks"
          )}
        </div>
        <ActionDialog
          ref={actionDialogRef}
          type="delete"
          isBatchOperation={true}
          allItemsComplete={hasIncompleteTask}
          ids={tasks.map((task) => task.id)}
          onConfirm={refreshTasks} // Refresh tasks after deletion
        />
        <NewTodoItemDialog
          ref={newTodoItemDialogRef}
          onConfirm={refreshTasks}
        />{" "}
      </div>
    </section>
  );
}
