import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-6">
      <Image src="swansong-thick-svg.svg" width={100} height={100} />
      <h1>Hey there! We're cooking something up.</h1>
      <p>
        Inquiries can be sent{" "}
        <a className="text-blue-600" href="mailto:hello@swansondigitalarts.com">
          here
        </a>
        .
      </p>
    </main>
  );
}
