"use client";

import { MovieCard, tmdb } from "@/features/movies";
import { Movie } from "@/shared/types/movie.types";
import { useEffect, useState } from "react";

export default function Popular({}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await tmdb.getPopularMovies();
      setMovies(data);
      setLoading(false);
    };

    loadMovies();
  }, []);

  if (loading) {
    return <div className="px-10 pt-28">Carregando...</div>;
  }

  return (
    <main className="grid grid-cols-4 gap-6 items-center w-fit mx-auto py-20">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          release_date={movie.release_date}
          genre_ids={movie.genre_ids}
          poster_path={tmdb.getImageUrl(movie.poster_path)}
        />
      ))}
    </main>
  );
}
