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

interface IActionDialogProps {
  type: "delete" | "edit";
  isBatchOperation?: boolean;
  allItemsComplete?: boolean;
  itemData?: ITask;
}

const ActionDialog = forwardRef(
  (props: IActionDialogProps, ref: React.Ref<HTMLDialogElement>) => {
    console.log("hi from action", props);

    const deleteForm = (
      <form method="dialog" className="flex flex-col gap-4">
        <header className="py-2 px-4 bg-gray-200">
          <h3>Confirm task {props.isBatchOperation ? "list " : ""} clear</h3>
        </header>
        <article className="py-2 px-4">
          <p className="p-0">
            {`This task ${props.isBatchOperation ? "list " : ""} is ${
              props.itemData?.completed || !props.allItemsComplete
                ? "complete"
                : "not complete"
            }.`}
          </p>
        </article>
        <footer className="py-2 px-4">
          <menu className="sm:flex-row flex-col gap-2 text-sm flex items-center justify-center w-full text-center">
            <button
              className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
              onClick={(event) => {
                console.log("No, Cancel");
              }}
            >
              Cancel <TiCancel />
            </button>
            <button
              className="transform bg-red-400 text-gray-900 transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
              onClick={(event) => {
                console.log("Yes, Delete");
              }}
            >
              Delete <TiTrash />
            </button>
          </menu>
        </footer>
      </form>
    );

    const editForm = (
      <form method="dialog" className="flex flex-col gap-4">
        <header className="py-2 px-4 bg-gray-200">
          <h3>Edit Task</h3>
        </header>
        <article className="py-2 px-4">
          <input type="text" name="title" id="title" placeholder="Title" />
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
              onClick={(event) => {
                console.log("No, Cancel");
              }}
            >
              Cancel <TiCancel />
            </button>
            <button
              className="transform bg-green-400 text-gray-900 transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
              onClick={(event) => {
                console.log("Yes, Delete");
              }}
            >
              Edit <TiEdit />
            </button>
          </menu>
        </footer>
      </form>
    );

    return (
      <dialog ref={ref} id="dialog" className="p-0 rounded-md shadow-lg">
        {props.type === "delete" ? deleteForm : editForm}
      </dialog>
    );
  }
);

ActionDialog.displayName = "ActionDialog";

export default ActionDialog;
