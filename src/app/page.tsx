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
          src="/cine.jpg"
          alt="buzz lightyear image"
        />
        <div className="font-extrabold relative px-6 flex flex-col justify-center w-fit h-full md:text-9xl md:leading-26 text-7xl">
          <h3>
            Salve
          </h3>
          <h3>
            Seus
          </h3>
          <h3>
            Filmes
          </h3>
          <h3>
            Favoritos
          </h3>
        </div>
      </main>
      <div className="absolute top-5 right-5">
        <Profile />
      </div>
      <div className="absolute bottom-5 right-10 text-xs">
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
