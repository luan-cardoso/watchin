import Image from "next/image";
import Card from "../../components/Card";

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
      <div className="flex flex-col gap-4 absolute top-110 bottom-0 mx-10">
        <h2 className="text-xl font-medium">Populares no momento</h2>
        <div className="flex gap-4">
          <Card
            poster_path="https://image.tmdb.org/t/p/original/wd7b4Nv9QBHDTIjc2m7sr0IUMoh.jpg"
            title="The Batman"
            release_date="2022-03-01"
            genre_ids={[80, 9648, 53]}
          />
          <Card
            poster_path="https://image.tmdb.org/t/p/original/wd7b4Nv9QBHDTIjc2m7sr0IUMoh.jpg"
            title="The Batman"
            release_date="2022-03-01"
            genre_ids={[80, 9648, 53]}
          />
          <Card
            poster_path="https://image.tmdb.org/t/p/original/wd7b4Nv9QBHDTIjc2m7sr0IUMoh.jpg"
            title="The Batman"
            release_date="2022-03-01"
            genre_ids={[80, 9648, 53]}
          />
           <Card
            poster_path="https://image.tmdb.org/t/p/original/wd7b4Nv9QBHDTIjc2m7sr0IUMoh.jpg"
            title="The Batman"
            release_date="2022-03-01"
            genre_ids={[80, 9648, 53]}
          />
        </div>
      </div>
    </div>
  );
}
