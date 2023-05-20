import Image from "next/image";
import TodoListTile from "./todoListTile";
import Link from "next/link";

export default function Dashboard() {
  const todoListMock = [
    {
      title: "Todo 1",
      description: "This is a description",
      completed: false,
      dateCreated: new Date(),
      age: 0,
    },
    {
      title: "Todo 2",
      description: "This is a description",
      completed: true,
      dateCreated: new Date(),
      age: 1,
    },
    {
      title: "Todo 3",
      description: "This is a description",
      completed: true,
      dateCreated: new Date(),
      age: 2,
    },
  ];
  return (
    <section className="m-auto mt-0 w-full">
      <div className="flex flex-col items-center justify-between gap-2">
        <div className=" border-b  border-black w-full text-center">
          <span>Todo Items</span>
          <Link href="/todo/new">
            <span className="border border-transparent hover:border-black ml-1 px-1 rounded-sm hover:bg-black hover:cursor-pointer hover:text-white">
              +
            </span>
          </Link>
        </div>
        {todoListMock.map((todoList, i) => {
          return (
            <Link
              href={{
                pathname: "/todo",
                query: {
                  data: JSON.stringify(todoList),
                },
              }}
              key={i}
            >
              <TodoListTile {...todoList} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
