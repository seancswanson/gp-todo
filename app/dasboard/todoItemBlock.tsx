"use client";
import { TiEdit, TiTrash } from "react-icons/ti";

interface TodoItemBlockProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dateCreated: Date;
  age: number;
}
import React, { useState } from "react";

const Task = (props: TodoItemBlockProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleTaskClick = () => {
    // your task click handler code
  };

  return (
    <div
      onClick={handleTaskClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center justify-between px-3 py-2 rounded-sm border border-black`}
    >
      <span>{props.title}</span>
      <div
        className={`flex items-center ${
          isHovered ? "opacity-100" : "opacity-50"
        }`}
      >
        <button className="hover:cursor-pointer opacity-50 hover:opacity-100">
          <TiEdit />
        </button>
        <button className="hover:cursor-pointer opacity-50 hover:opacity-100">
          <TiTrash />
        </button>
      </div>
    </div>
  );
};

export default Task;
