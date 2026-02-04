const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdb = {
  // Buscar filmes favoritos/populares
  getPopularMovies: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`,
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar filmes");
      }

      const data = await response.json();
      return (data.results || []).map((movie: any) => ({
        ...movie,
        genre_ids: movie.genre_ids || [],
      }));
    } catch (error) {
      console.error("Erro na API TMDB:", error);
      return [];
    }
  },

  // Buscar filmes por query
  searchMovies: async (query: string) => {
    try {
      if (!query.trim()) {
        return [];
      }

      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=1`,
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar filmes");
      }

      const data = await response.json();
      return (data.results || []).map((movie: any) => ({
        ...movie,
        genre_ids: movie.genre_ids || [],
      }));
    } catch (error) {
      console.error("Erro na API TMDB:", error);
      return [];
    }
  },

  // Helper para construir URL da imagem
  getImageUrl: (path: string | null, size: string = "w500") => {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
  },
};
