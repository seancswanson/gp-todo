import Image from "next/image";
import Dashboard from "./dasboard/page";
import { getAllTodos } from "@/data/tasks";

export default async function Home() {
  const tasks = await getAllTodos();
  const hasIncompleteTask = tasks.some((task) => !task.completed);

  return (
    <main className="flex">
      <Dashboard tasks={tasks} hasIncompleteTask={hasIncompleteTask} />
    </main>
  );
}
