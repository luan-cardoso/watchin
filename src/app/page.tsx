import Image from "next/image";
import Card from "../../components/Card";
import Profile from "../../components/Profile";

export default function Home() {
  return (
    <div className="relative">
      <main className="relative w-full h-full">
        <Image
          fill
          priority
          className="object-cover"
          src="/ghostface.jpg"
          alt="ghostface image"
        />
        <div className="relative px-10 pt-36">
          <div>
            <h2 className="text-2xl font-medium">
              Conecte-se com seus amigos.
            </h2>
            <h2 className="text-5xl font-extrabold">
              Salve seus filmes <br />
              favoritos.
            </h2>
          </div>
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
          className="text-emerald-600"
        >
          Luan Cardoso
        </a>
      </div>
    </div>
  );
}
