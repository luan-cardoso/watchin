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
        <div className="relative px-20 pt-36">
          <h2 className="text-5xl font-extrabold mb-6">
            Salve seus filmes <br />
            favoritos.
          </h2>
          <h3 className="text-3xl font-extrabold">1.154.315 Filmes</h3>
        </div>
      </main>
      <div className="absolute top-10 right-10">
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
