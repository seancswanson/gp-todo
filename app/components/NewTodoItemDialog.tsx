"use client";
import Link from "next/link";
import { ITask } from "../types/tasks";
import {
  TiCancel,
  TiEdit,
  TiInputChecked,
  TiInputCheckedOutline,
  TiPlus,
  TiTrash,
} from "react-icons/ti";
import { forwardRef, useRef, useState } from "react";
import { addNewItem } from "@/data/tasks";
import { v4 as uuidv4 } from "uuid";
import {
  loremIpsum,
  name,
  surname,
  fullname,
  username,
} from "react-lorem-ipsum";

interface INewTodoItemDialogProps {
  onConfirm: () => void; // add this line
}

const NewTodoItemDialog = forwardRef(
  (props: INewTodoItemDialogProps, ref: React.Ref<HTMLDialogElement>) => {
    const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
      const form = event.currentTarget;
      const title = form.elements.namedItem("title") as HTMLInputElement;
      const description = form.elements.namedItem(
        "description"
      ) as HTMLTextAreaElement;
      console.log(event.currentTarget);
      addNewItem("http://127.0.0.1:3001/todos", {
        id: uuidv4(),
        title: title.value,
        description: description.value,
        completed: Math.random() < 0.5 ? true : false,
        dateCreated: new Date().toISOString(),
        age: Math.floor(Math.random() * 100) + 1,
      }).then((data) => {
        if (props.onConfirm) {
          props.onConfirm(); // call onConfirm after adding new item
        }
      });
    };

    return (
      <dialog
        ref={ref}
        id="dialog"
        className="p-0 rounded-md shadow-lg"
        role="dialog"
        aria-labelledby="New Todo Item Dialog"
      >
        <form
          method="dialog"
          className="flex flex-col gap-4"
          onSubmit={handleAdd}
          role="form"
        >
          <header className="py-2 px-4 bg-gray-200">
            <h3 id="editDialogLabel">Add New Item</h3>
          </header>
          <article className="py-2 px-4 flex flex-col gap-2 justify-around">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="px-2 border rounded"
            />
            <label htmlFor="description">Description</label>
            <textarea
              className="resize-none h-24 w-full border rounded px-2"
              name="description"
              id="description"
              placeholder="Description"
            />
          </article>
          <footer className="py-2 px-4">
            <menu className="sm:flex-row flex-col gap-2 text-sm flex items-center justify-center w-full text-center">
              <button
                className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
                aria-label="Cancel action"
                type="button"
              >
                Cancel
                <TiCancel />
              </button>
              <button
                className="transform bg-green-400 text-gray-900 transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
                type="submit"
                aria-label="Confirm add action"
              >
                Add Task
                <TiPlus />
              </button>
            </menu>
          </footer>
        </form>
      </dialog>
    );
  }
);

NewTodoItemDialog.displayName = "NewTodoItemDialog";

export default NewTodoItemDialog;
