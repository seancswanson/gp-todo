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
import { SetStateAction, forwardRef, useRef, useState } from "react";
import { addNewItem, deleteItem, updateItem } from "@/data/tasks";
interface IActionDialogProps {
  type: "delete" | "edit" | "add";
  isBatchOperation?: boolean;
  allItemsComplete?: boolean;
  itemData?: ITask;
  ids?: string | string[];
  onConfirm: () => void; // add this line
}
import { v4 as uuidv4 } from "uuid";

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
    ref: React.Ref<HTMLDialogElement> // add this line
  ) => {
    // Assuming this is inside your functional component
    const [title, setTitle] = useState(itemData?.title);
    const [description, setDescription] = useState(itemData?.description);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };

    const handleDescriptionChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setDescription(event.target.value);
    };
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
      console.log(itemData);
      updateItem(`http://127.0.0.1:3001/todos/${ids}`, {
        title: title,
        description: description,
        completed: false,
        id: ids,
      })
        .then((data) => {
          console.log("updated");
          if (onConfirm) {
            onConfirm();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // Handle add
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
      }).then((data) => {
        if (onConfirm) {
          onConfirm();
        }
      });
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
          <menu className="tracking-wider sm:flex-row flex-col gap-2 text-sm flex items-center justify-center w-full text-center">
            <button
              className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
              aria-label="Cancel action"
              type="button"
              onClick={() => {
                (ref as React.RefObject<HTMLDialogElement>).current!.close();
              }}
            >
              Cancel
              <TiCancel />
            </button>
            <button
              className="transform bg-red-400 transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg text-white"
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
          <h3 id="editDialogLabel">Edit Item</h3>
        </header>
        <article className="py-2 px-4 flex flex-col gap-2 justify-around">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={itemData?.title}
            onChange={handleTitleChange}
            className="px-2 border rounded"
          />
          <label htmlFor="description">Description</label>
          <textarea
            className="resize-none h-24 w-full border rounded px-2"
            name="description"
            id="description"
            value={itemData?.description}
            onChange={handleDescriptionChange}
          />
        </article>
        <footer className="py-4 px-4">
          <menu className="tracking-wider sm:flex-row flex-col gap-2 text-sm flex items-center justify-center w-full text-center">
            <button
              className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
              aria-label="Cancel action"
              type="button"
              onClick={() => {
                (ref as React.RefObject<HTMLDialogElement>).current!.close();
              }}
            >
              Cancel
              <TiCancel />
            </button>
            <button
              className="transform bg-green-400 text-gray-900 transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
              type="submit"
              aria-label="Confirm add action"
            >
              Save
              <TiEdit />
            </button>
          </menu>
        </footer>
      </form>
    );

    const addForm = (
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
        <footer className="py-4 px-4">
          <menu className="tracking-wider sm:flex-row flex-col gap-2 text-sm flex items-center justify-center w-full text-center">
            <button
              className="transform transition-transform hover:scale-105 flex gap-1 flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
              aria-label="Cancel action"
              type="button"
              onClick={() => {
                (ref as React.RefObject<HTMLDialogElement>).current!.close();
              }}
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
    );

    return (
      <dialog
        ref={ref}
        id="dialog"
        className="p-0 rounded-md shadow-lg"
        role="dialog"
        aria-labelledby={
          type === "delete"
            ? "deleteDialogLabel"
            : type === "edit"
            ? "editDialogLabel"
            : "addDialogLabel"
        }
      >
        {type === "delete" ? deleteForm : type === "edit" ? editForm : addForm}
      </dialog>
    );
  }
);

ActionDialog.displayName = "ActionDialog";

export default ActionDialog;
