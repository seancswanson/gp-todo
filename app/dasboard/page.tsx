"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { TiFolderDelete, TiLightbulb, TiPlus, TiStar } from "react-icons/ti";
import TodoList from "../components/TodoList";
import ActionDialog from "../components/ActionDialog";
import { getAllTodos } from "@/data/tasks";
import { ITask } from "../types/tasks";
import { IconContext } from "react-icons/lib";

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

  let taskStatus = "Loading...";
  if (!isLoading) {
    if (tasks.length > 0) {
      const completedTaskCount = tasks.filter((task) => task.completed).length;
      taskStatus = `${completedTaskCount} / ${tasks.length} complete`;
    } else {
      taskStatus = "No tasks";
    }
  }

  return (
    <section className="m-auto mt-0 w-full ">
      <div className="flex flex-col items-center justify-between">
        <div className="text-l flex w-full flex-col items-center justify-center border-b border-black py-1 text-center">
          <span>Todo Items</span>
          <span className="text-md text-gray-800 all-small-caps">
            {taskStatus}
          </span>
        </div>
        <IconContext.Provider value={{ size: "1.3em" }}>
          <div className="mb-2 flex w-full flex-col items-center justify-center gap-2 border-b border-black py-2 text-center text-sm tracking-wide xs:flex-row">
            <button
              className="flex flex-grow-0 transform items-center gap-1 rounded-lg bg-black px-2 text-white transition-transform hover:scale-105"
              onClick={(event) => {
                event.stopPropagation();
                newTodoItemDialogRef.current?.showModal();
              }}
            >
              Add New Item <TiPlus />
            </button>
            <Link
              href="/todo/new"
              className="flex flex-grow-0 transform items-center gap-1 rounded-lg bg-black px-2 text-white transition-transform hover:scale-105"
            >
              Suggest Priority
              <TiLightbulb />
            </Link>
            <div className="h-2 border border-black"></div>
            <button
              className="flex flex-grow-0 transform items-center gap-1 rounded-lg bg-black px-2 text-white transition-transform hover:scale-105"
              onClick={(event) => {
                event.stopPropagation();
                actionDialogRef.current?.showModal();
              }}
            >
              Clear All
              <TiFolderDelete />
            </button>
          </div>
        </IconContext.Provider>
        <div
          className={`table-container w-[96%] min-w-[100px] max-w-xl xs:w-3/4 ${
            isLoading || tasks.length === 0
              ? "flex justify-center border border-black bg-white"
              : ""
          }`}
        >
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
        <ActionDialog
          type="add"
          isBatchOperation={false}
          ref={newTodoItemDialogRef}
          onConfirm={refreshTasks}
        />
      </div>
    </section>
  );
}
