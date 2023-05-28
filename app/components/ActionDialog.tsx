"use client";
import Link from "next/link";
import { ITask } from "../types/tasks";
import {
  TiCancel,
  TiEdit,
  TiInputChecked,
  TiInputCheckedOutline,
  TiTrash,
} from "react-icons/ti";
import { forwardRef, useRef, useState } from "react";
import { deleteItem } from "@/data/tasks";
interface IActionDialogProps {
  type: "delete" | "edit";
  isBatchOperation?: boolean;
  allItemsComplete?: boolean;
  itemData?: ITask;
  ids?: string | string[];
  onConfirm: () => void; // add this line
}

const ActionDialog = forwardRef(
  (
    {
      onConfirm,
      type,
      isBatchOperation,
      allItemsComplete,
      itemData,
      ids,
    }: IActionDialogProps,
    ref: React.Ref<HTMLDialogElement>
  ) => {
    const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
      const deletePromises = [];

      if (Array.isArray(ids)) {
        // handle multiple ids

        ids.forEach((id) => {
          deletePromises.push(deleteItem(`http://127.0.0.1:3001/todos/${id}`));
        });
      } else {
        // handle single id

        deletePromises.push(deleteItem(`http://127.0.0.1:3001/todos/${ids}`));
      }

      Promise.all(deletePromises)
        .then((data) => {
          if (onConfirm) {
            onConfirm(); // Call onConfirm prop after deletion
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
      console.log("edit");
    };

    const deleteForm = (
      <form
        method="dialog"
        className="flex flex-col gap-4"
        role="form"
        onSubmit={(event) => handleDelete(event)}
      >
        <header className="py-4 px-4 bg-gray-200">
          <h3 id="deleteDialogLabel">
            Confirm task {isBatchOperation ? "list " : ""} clear
          </h3>
        </header>
        <article className="py-2 px-4">
          <p className="p-0">
            {`This task ${isBatchOperation ? "list " : ""} is ${
              itemData?.completed || (isBatchOperation && !allItemsComplete)
                ? "complete"
                : "not complete"
            }.`}
          </p>
        </article>
        <footer className="py-4 px-4">
          <menu className="sm:flex-row flex-col gap-2 text-sm flex items-center justify-center w-full text-center">
            <button
              className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
              aria-label="Cancel action"
              type="button"
              onClick={() => ref.current?.close()}
            >
              Cancel
              <TiCancel />
            </button>
            <button
              className="transform bg-red-400 text-gray-900 transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
              type="submit"
              aria-label="Confirm delete action"
            >
              Delete
              <TiTrash />
            </button>
          </menu>
        </footer>
      </form>
    );

    const editForm = (
      <form
        method="dialog"
        className="flex flex-col gap-4"
        onSubmit={handleEdit}
        role="form"
      >
        <header className="py-2 px-4 bg-gray-200">
          <h3 id="editDialogLabel">Edit Task</h3>
        </header>
        <article className="py-2 px-4">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" placeholder="Title" />
          <label htmlFor="description">Description</label>
          <textarea
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
              aria-label="Confirm edit action"
            >
              Save
              <TiEdit />
            </button>
          </menu>
        </footer>
      </form>
    );

    return (
      <dialog
        ref={ref}
        id="dialog"
        className="p-0 rounded-md shadow-lg"
        role="dialog"
        aria-labelledby={
          type === "delete" ? "deleteDialogLabel" : "editDialogLabel"
        }
      >
        {type === "delete" ? deleteForm : editForm}
      </dialog>
    );
  }
);

ActionDialog.displayName = "ActionDialog";

export default ActionDialog;
