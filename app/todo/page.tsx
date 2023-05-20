"use client";
import { useSearchParams } from "next/navigation";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
interface TodoItemProps {
  title?: string;
  description?: string;
  completed?: boolean;
  dateCreated?: Date;
  age?: number;
}

export default function TodoItem() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const dataObj = JSON.parse(data!);
  const TodoItem = ({ ...data }: any) => {
    return (
      <div
        className="todo"
        style={{ textDecoration: data.todo.isCompleted ? "line-through" : "" }}
      >
        {data.todo.text}
        <div>
          <button onClick={() => completeTodo(index)}>Complete</button>
          <button onClick={() => removeTodo(index)}>x</button>
        </div>
      </div>
    );
  };
  return (
    <section className="m-auto mt-0 w-full">
      <div className="flex flex-col items-center justify-between gap-2">
        <div className=" border-b  border-black w-full text-center">
          <span>Todo Item</span>
          <Link href="/todo/edit">
            <span className="border border-transparent hover:border-black ml-1 px-1 rounded-sm hover:bg-black hover:cursor-pointer hover:text-white">
              Pencil
            </span>
          </Link>
        </div>
        {dataObj.title}
      </div>
    </section>
  );
}
