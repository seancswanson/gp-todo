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
  const NewTodoItemForm = () => {
    return (
      <div className="todo border border-black p-2">
        <form action=""></form>
      </div>
    );
  };
  return (
    <section className="m-auto mt-0 w-full">
      <div className="flex flex-col items-center">
        <div className="border-b py-1 border-black w-full text-center">
          <span>Add New Todo Item</span>
        </div>

        <div className="flex flex-col gap-2 w-1/2 min-w-[100px]">
          <NewTodoItemForm />
        </div>
      </div>
    </section>
  );
}
