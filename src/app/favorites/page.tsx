"use client";

import { useSession } from "next-auth/react";
import MovieCard from "@/features/movies/components/MovieCard";
import { useFavorites } from "@/features/favorites";

export default function FavoritosPage() {
  const { data: session, status } = useSession();
  const { favorites, isLoading, error } = useFavorites();

  if (status === "loading") {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <p className="text-gray-300">Carregando...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <div className="text-center max-w-md px-6">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Login Necessário
          </h2>

          <p className="mb-6">
            Você precisa estar logado para acessar seus filmes favoritos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-10 md:p-20">
      <h1 className="text-3xl font-bold mb-0 md:mb-2">Meus Favoritos</h1>
      <p className="mb-4">
        Bem-vindo, <span className="font-semibold">{session.user.name}</span>
      </p>
      {isLoading && favorites.length === 0 ? (
        <div className="w-full flex justify-center py-10">
          <p className="">Carregando favoritos...</p>
        </div>
      ) : error ? (
        <div className="w-full flex justify-center py-10">
          <p className="text-red-400">{error}</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="w-full flex justify-center py-10">
          <p className="">
            Você ainda não adicionou nenhum filme aos favoritos.
          </p>
        </div>
      ) : (
        <div className="grid gap-10 items-center justify-center py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.favoriteId ?? movie.id}
              id={movie.id}
              title={movie.title}
              release_date={movie.release_date}
              poster_path={movie.poster_path}
              genre_ids={movie.genre_ids}
            />
          ))}
        </div>
      )}
    </div>
  );
}
