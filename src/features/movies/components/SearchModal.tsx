"use client";

import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { MovieCard, tmdb } from "@/features/movies";
import { Movie } from "@/shared/types/movie.types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Resetar estado quando o modal fechar
      setQuery("");
      setResults([]);
      setLoading(false);
      return;
    }

    // Debounce: aguardar 500ms após o usuário parar de digitar
    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        searchMovies(query.trim());
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, isOpen]);

  const searchMovies = async (searchQuery: string) => {
    setLoading(true);
    try {
      const movies = await tmdb.searchMovies(searchQuery);
      setResults(movies);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop com blur */}
      <div
        className="fixed inset-0 bg-[black/50] backdrop-blur-md z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal de busca */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <div
          className="bg-[#202020] rounded-lg shadow-2xl w-5xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header do modal */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3 flex-1">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-indigo-500 text-lg"
              />
              <input
                type="text"
                placeholder="Buscar filmes"
                className="bg-transparent border-none outline-none text-white flex-1 text-lg"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              onClick={onClose}
              className="hover:text-indigo-500 duration-300"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
          </div>

          {/* Conteúdo do modal */}
          <div className="px-10 pt-10 pb-10 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {loading ? (
              <p className="text-center py-8 ">Buscando...</p>
            ) : query.trim().length < 2 ? (
              <p className="text-center py-8 ">
                Digite pelo menos 2 caracteres para buscar...
              </p>
            ) : results.length === 0 ? (
              <p className="text-center py-8 ">Nenhum filme encontrado</p>
            ) : (
              <div className="flex justify-center">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
                  {results.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      release_date={movie.release_date}
                      genre_ids={movie.genre_ids}
                      poster_path={tmdb.getImageUrl(movie.poster_path)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
