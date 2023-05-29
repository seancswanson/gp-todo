"use client";
import { useSearchParams } from "next/navigation";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  TiEdit,
  TiFolderDelete,
  TiLightbulb,
  TiPencil,
  TiPlus,
  TiTrash,
} from "react-icons/ti";
import { getAllTodos, getTodoById } from "@/data/tasks";
import { get } from "http";
import { ITask } from "../types/tasks";
import ActionDialog from "../components/ActionDialog";

async function getTodo(todoId: string) {
  // Instead of the file system,
  // fetch Todo data from an external API endpoint
  const res = await getTodoById(todoId);
  const todo = res;
  return todo;
}
export default async function TodoItem({
  params,
}: {
  params: { todoId: string };
}) {
  const editActionDialogRef = useRef<HTMLDialogElement>(null);
  const deletActionDialogRef = useRef<HTMLDialogElement>(null);
  const dataObj = await getTodo(params.todoId);
  console.log(dataObj);

  const TodoItemFull = ({ ...data }: ITask) => {
    return (
      <div className="todo border border-black p-4 my-2 rounded-sm bg-white">
        <h2 className="todo-title text-lg mb-2">{data.title}</h2>
        <p className="todo-description text-gray-800 mb-2">
          {data.description}
        </p>
        <p className="todo-completed  mb-2">
          Status:{" "}
          <span className={data.completed ? "text-green-500" : "text-red-500"}>
            {data.completed ? "Completed" : "Not Completed"}
          </span>
        </p>
      </div>
    );
  };

  return (
    <section className="m-auto mt-0 w-full">
      <div className="flex flex-col items-center">
        <div className="border-b py-1 border-black w-full text-center">
          <span>Todo Item</span>
        </div>
        <div className="xs:flex-row flex-col border-b mb-2 gap-2 border-black py-2 text-sm flex items-center justify-center w-full text-center">
          <button
            className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
            onClick={(event) => {
              event.stopPropagation();
              editActionDialogRef.current?.showModal();
            }}
          >
            Edit Item <TiEdit />
          </button>
          <Link
            href="/todo/new"
            className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
          >
            Generate Strategy
            <TiLightbulb />
          </Link>
          <div className="h-2 border border-black"></div>
          <button
            className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
            onClick={(event) => {
              event.stopPropagation();
              deletActionDialogRef.current?.showModal();
            }}
          >
            Delete
            <TiTrash />
          </button>
        </div>

        <div className="flex flex-col gap-2 w-1/2 min-w-[100px]">
          <TodoItemFull {...dataObj} />
        </div>
      </div>
      <ActionDialog
        ref={deletActionDialogRef}
        type="delete"
        ids={dataObj.id}
        onConfirm={() => {
          window.location.href = "/";
        }} // Refresh tasks after deetion
      />
      <ActionDialog
        ref={editActionDialogRef}
        type="edit"
        ids={dataObj.id}
        onConfirm={() => {
          window.location.href = "/" + dataObj.id;
        }}
      />
    </section>
  );
}
