import { ITask } from "@/app/types/tasks";
const baseUrl = "http://127.0.0.1:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
  console.log("getAllTodos from" + baseUrl);
  const res = await fetch(`${baseUrl}/todos`);
  const todos = await res.json();
  return todos;
};
