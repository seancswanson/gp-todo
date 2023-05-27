"use client";
import { useSearchParams } from "next/navigation";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { TiEdit, TiLightbulb, TiPencil, TiPlus, TiTrash } from "react-icons/ti";

interface TodoItemData {
  title?: string;
  description?: string;
  completed?: boolean;
  dateCreated?: Date;
  age?: number;
}

export default function TodoItem() {
  const searchParams = useSearchParams();
  const dataParamsString = searchParams.get("data");
  const dataObj: TodoItemData = JSON.parse(dataParamsString!);
  const TodoItemFull = ({ ...data }: TodoItemData) => {
    return (
      <div className="todo border border-black p-2">
        <div className="todo-title">{data.title}</div>
      </div>
    );
  };
  return (
    <section className="m-auto mt-0 w-full">
      <div className="flex flex-col items-center">
        <div className="border-b py-1 border-black w-full text-center">
          <span>Todo Item</span>
        </div>
        <div className="xs:flex-row flex-col flex-row border-b mb-2 gap-2 border-black py-1 text-xs flex items-center justify-center w-full text-center">
          <Link
            href="/todo/new"
            className="transform transition-transform hover:scale-105 flex flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
          >
            Edit Item <TiPencil />
          </Link>
          <Link
            href="/todo/new"
            className="transform transition-transform hover:scale-105 flex flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
          >
            Generate Strategy
            <TiLightbulb />
          </Link>
        </div>
        <div className="flex flex-col gap-2 w-1/2 min-w-[100px]">
          <TodoItemFull {...dataObj} />
        </div>
      </div>
    </section>
  );
}
