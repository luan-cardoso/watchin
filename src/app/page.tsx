import Image from "next/image";
import { Profile } from "@/features/auth";

export default function Home() {
  return (
    <div className="relative h-screen">
      <main className="relative w-full h-full">
        <Image
          fill
          priority
          className="object-cover"
          src="/lightyear.jpg"
          alt="buzz lightyear image"
        />
        <div className="relative px-6 pt-28">
          <h2 className="text-7xl font-extrabold leading-16">
            Salve
            <br /> seus
            <br /> filmes
            <br />
            favoritos.
          </h2>
        </div>
      </main>
      <div className="absolute top-5 right-5">
        <Profile />
      </div>
      <div className="absolute bottom-2 right-10 text-xs">
        developed and built by{" "}
        <a
          href="https://github.com/luan-cardoso"
          target="_blank"
          className="text-indigo-500"
        >
          Luan Cardoso
        </a>
      </div>
    </div>
  );
}
