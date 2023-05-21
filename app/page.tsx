import Image from "next/image";
import Dashboard from "./dasboard/page";

export default function Home() {
  return (
    <main className="flex">
      <Dashboard />
    </main>
  );
}
