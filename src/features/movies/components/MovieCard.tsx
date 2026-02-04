"use client";

import {
  faBookmark as faBookmarkSolid,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { GENRES } from "../utils/genres";
import { formatDateToMonthYear } from "../utils/formatters";
import { MovieCardProps } from "@/shared/types/movie.types";
import { useFavorites } from "@/features/favorites";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface MovieCardWithFavoritesProps extends MovieCardProps {
  onLoginRequired?: () => void;
}

export default function MovieCard({
  id,
  title,
  release_date,
  genre_ids,
  poster_path,
  onLoginRequired,
}: MovieCardWithFavoritesProps) {
  const { data: session } = useSession();
  const { toggleFavorite, isFavorite, isLoading } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);

  const favorited = isFavorite(id);

  // Converte os IDs de gêneros para nomes
  const genres = (genre_ids || [])
    .map((id) => GENRES[id])
    .filter((genre) => genre !== undefined);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      onLoginRequired?.();
      return;
    }

    setIsAnimating(true);
    await toggleFavorite({
      id,
      title,
      release_date,
      poster_path,
      genre_ids,
    });

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="grid grid-cols-1 grid-rows-[6fr_2fr] h-[460px] w-[256px] bg-white/5 shadow-2xl overflow-hidden rounded-2xl border border-[#ffffff20]">
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {poster_path ? (
          <Image
            src={poster_path}
            fill
            alt="Poster do filme"
            className="object-cover"
            sizes="(max-width: 768px) 256px"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Sem imagem</span>
          </div>
        )}
      </div>
      <div className="w-full py-2 px-4 flex flex-col justify-between">
        <h3 className="text-lg font-bold text-ellipsis overflow-hidden line-clamp-1">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {genres.slice(0, 2).map((genre) => (
            <span
              className="bg-indigo-500 px-2 rounded-md text-sm font-semibold"
              key={genre}
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="flex gap-1 items-center">
            <FontAwesomeIcon icon={faCalendarDays} />
            {formatDateToMonthYear(release_date)}
          </span>
          <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className={`
              transition-all duration-200
              hover:scale-110
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isAnimating ? "scale-125" : ""}
            `}
            title={
              favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
          >
            <FontAwesomeIcon
              icon={favorited ? faBookmarkSolid : faBookmarkRegular}
              className={`
                duration-300 cursor-pointer
                ${favorited ? "text-indigo-500" : "text-gray-400 hover:text-indigo-500"}
              `}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
