import { ITask } from "@/app/types/tasks";
const baseUrl = "http://127.0.0.1:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
  console.log("getAllTodos from" + baseUrl + "/todos");
  const res = await fetch(`http://127.0.0.1:3001/todos`);
  console.log(res);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
