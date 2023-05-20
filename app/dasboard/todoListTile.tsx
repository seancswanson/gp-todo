"use client";

import Image from "next/image";
interface TodoListTileProps {
  title: string;
  description: string;
  completed: boolean;
  dateCreated: Date;
  age: number;
}
export default function TodoListTile(props: TodoListTileProps) {
  const handleTaskClick = () => {
    console.log(props);
  };
  return (
    <div
      onClick={handleTaskClick}
      className="hover:cursor-pointer flex flex-col justify-between px-3 rounded-lg border border-black"
    >
      <span>{props.title}</span>
    </div>
  );
}
