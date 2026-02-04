export interface MovieCardProps {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  genre_ids: number[];
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  genre_ids: number[];
}

// Tipo do filme no banco de dados (Prisma)
export interface MovieDB {
  id: string;
  tmdbId: number;
  title: string;
  releaseDate: string;
  posterPath: string | null;
  genreIds: number[];
  createdAt: Date;
}

// Função helper para converter TMDB → Prisma
export function tmdbToPrisma(tmdbMovie: Movie) {
  return {
    tmdbId: tmdbMovie.id,
    title: tmdbMovie.title,
    releaseDate: tmdbMovie.release_date,
    posterPath: tmdbMovie.poster_path,
    genreIds: tmdbMovie.genre_ids,
  };
}

// Função helper para converter Prisma → TMDB (para exibir no frontend)
export function prismaToTMDB(movieDB: MovieDB): Movie {
  return {
    id: movieDB.tmdbId,
    title: movieDB.title,
    release_date: movieDB.releaseDate,
    poster_path: movieDB.posterPath,
    genre_ids: movieDB.genreIds,
  };
}
