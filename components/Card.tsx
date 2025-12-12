import {
  faBookmark,
  faCalendarDays,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

// Função para formatar data de YYYY-MM-DD para MM/YYYY
function formatDateToMonthYear(dateString: string): string {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${year}`;
}

//IDs de gêneros do TMDB
const GENRES: Record<number, string> = {
  28: "Ação",
  12: "Aventura",
  16: "Animação",
  35: "Comédia",
  80: "Crime",
  99: "Documentário",
  18: "Drama",
  10751: "Família",
  14: "Fantasia",
  36: "História",
  27: "Terror",
  10402: "Música",
  9648: "Mistério",
  10749: "Romance",
  878: "Ficção científica",
  10770: "Cinema TV",
  53: "Thriller",
  10752: "Guerra",
  37: "Faroeste",
} as const;

interface CardProps {
  title: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}

export default function Card({
  title,
  release_date,
  genre_ids,
  poster_path,
}: CardProps) {
  // Converte os IDs de gêneros para nomes
  const genres = genre_ids
    .map((id) => GENRES[id])
    .filter((genre) => genre !== undefined);

  return (
    <div className="grid grid-cols-1 grid-rows-[5fr_2fr] h-96 w-64 bg-white/5 shadow-2xl overflow-hidden rounded-2xl border border-[#ffffff20]">
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <Image
          src={poster_path}
          fill
          quality={100}
          alt="Poster do filme"
          className="object-cover"
          sizes="(max-width: 768px)"
        />
      </div>
      <div className="w-full py-2 px-4 flex flex-col justify-between">
        <h3 className="text-2xl font-bold text-ellipsis overflow-hidden line-clamp-1">
          {title}
        </h3>
        <div className="flex flex-wrap gap-1">
          {genres.map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
        <div className="">
          <div className="flex justify-between">
            <span className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faCalendarDays} />
              {formatDateToMonthYear(release_date)}
            </span>
            <button className="px-2 py-1 flex gap-1 items-center">
              Salvar
              <FontAwesomeIcon icon={faBookmark} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
