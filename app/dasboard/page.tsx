import Link from "next/link";
import { TiLightbulb, TiPlus, TiStar } from "react-icons/ti";
import { getAllTodos } from "@/data/tasks";
import TodoList from "../components/TodoList";

export default async function Dashboard() {
  const tasks = await getAllTodos();
  console.log(tasks);

  return (
    <section className="m-auto mt-0 w-full">
      <div className="flex flex-col items-center justify-between">
        <div className="border-b py-1 border-black w-full text-center">
          <span>Todo Items</span>
        </div>
        <div className="sm:flex-row flex-col border-b mb-2 gap-2 border-black py-1 text-xs flex items-center justify-center w-full text-center">
          <Link
            href="/todo/new"
            className="transform transition-transform hover:scale-105 flex flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
          >
            Add New Item <TiPlus />
          </Link>
          <Link
            href="/todo/new"
            className="transform transition-transform hover:scale-105 flex flex-grow-0 items-center px-2 rounded-lg bg-black text-white"
          >
            Suggest Priority
            <TiLightbulb />
          </Link>
        </div>
        <div className="table-container sm:w-1/2 w-full min-w-[100px] max-w-xl">
          <TodoList todos={tasks} />
        </div>
      </div>
    </section>
  );
}
