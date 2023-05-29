"use client";
import { useSearchParams } from "next/navigation";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

  const TodoItemFull = ({ ...data }: ITask) => {
    return (
      <div className="todo my-2 rounded-sm border border-black bg-white p-4">
        {data.title ? (
          <h2 className="todo-title mb-2 text-lg">{data.title}</h2>
        ) : (
          <h2 className="todo-title mb-2 text-lg italic">Untitled Task</h2>
        )}
        {data.description ? (
          <p className="todo-description mb-2 text-gray-800">
            {data.description}
          </p>
        ) : (
          <p className="todo-description mb-2 italic text-gray-800">
            No description
          </p>
        )}
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
        <div className="w-full border-b border-black py-1 text-center">
          <span>Todo Item</span>
        </div>
        <div className="mb-2 flex w-full flex-col items-center justify-center gap-2 border-b border-black py-2 text-center text-sm xs:flex-row">
          <button
            className="flex flex-grow-0 transform items-center gap-1 rounded-lg bg-black px-2 text-white transition-transform hover:scale-105"
            onClick={(event) => {
              event.stopPropagation();
              editActionDialogRef.current?.showModal();
            }}
          >
            Edit Item <TiEdit />
          </button>
          <Link
            href="/todo/new"
            className="flex flex-grow-0 transform items-center gap-1 rounded-lg bg-black px-2 text-white transition-transform hover:scale-105"
          >
            Generate Strategy
            <TiLightbulb />
          </Link>
          <div className="h-2 border border-black"></div>
          <button
            className="flex flex-grow-0 transform items-center gap-1 rounded-lg bg-black px-2 text-white transition-transform hover:scale-105"
            onClick={(event) => {
              event.stopPropagation();
              deletActionDialogRef.current?.showModal();
            }}
          >
            Delete
            <TiTrash />
          </button>
        </div>

        <div className="flex w-3/4 min-w-[100px] flex-col gap-2">
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
          window.location.href = "/";
        }}
      />
    </section>
  );
}
