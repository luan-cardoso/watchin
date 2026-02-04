import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  genre_ids: number[];
}

interface FavoriteMovie extends Movie {
  favoriteId: string;
  addedAt: string;
}

export function useFavorites() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar todos os favoritos
  const fetchFavorites = useCallback(async () => {
    if (!session?.user) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/favorites");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Erro ao buscar favoritos");
      }

      const data = await response.json();
      setFavorites(data.favorites || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao buscar favoritos:", err);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user]);

  // Carregar favoritos ao montar o componente
  useEffect(() => {
    if (session?.user) {
      fetchFavorites();
    } else {
      // Limpar favoritos quando não há sessão
      setFavorites([]);
      setError(null);
    }
  }, [session?.user, fetchFavorites]);

  // Adicionar filme aos favoritos
  const addFavorite = async (movie: Movie) => {
    if (!session?.user) {
      setError("Você precisa estar logado");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao adicionar favorito");
      }

      // Atualizar lista local
      await fetchFavorites();
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao adicionar favorito";
      setError(errorMessage);
      console.error("Erro ao adicionar favorito:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Remover filme dos favoritos
  const removeFavorite = async (tmdbId: number) => {
    if (!session?.user) {
      setError("Você precisa estar logado");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/favorites/${tmdbId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao remover favorito");
      }

      // Atualizar lista local
      setFavorites((prev) => prev.filter((fav) => fav.id !== tmdbId));
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao remover favorito";
      setError(errorMessage);
      console.error("Erro ao remover favorito:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle favorito (adiciona se não existe, remove se existe)
  const toggleFavorite = async (movie: Movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    if (isFavorite) {
      return await removeFavorite(movie.id);
    } else {
      return await addFavorite(movie);
    }
  };

  // Verificar se um filme está nos favoritos
  const isFavorite = (tmdbId: number) => {
    return favorites.some((fav) => fav.id === tmdbId);
  };

  return {
    favorites,
    isLoading,
    error,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    refetch: fetchFavorites,
  };
}
