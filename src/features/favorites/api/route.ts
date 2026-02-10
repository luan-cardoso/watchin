import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/lib/auth";
import { prisma } from "../../../../prisma/lib/prisma";

// GET - Listar favoritos do usuário
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const favorites = await prisma.favoriteMovie.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        movie: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transformar para o formato esperado pelo frontend
    const formattedFavorites = favorites.map((fav) => ({
      favoriteId: fav.id,
      id: fav.movie.tmdbId,
      title: fav.movie.title,
      release_date: fav.movie.releaseDate,
      poster_path: fav.movie.posterPath,
      genre_ids: fav.movie.genreIds,
      addedAt: fav.createdAt.toISOString(),
    }));

    return NextResponse.json(
      { favorites: formattedFavorites },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);

    const message =
      error instanceof Error ? error.message : "Erro ao buscar favoritos";
    const isDev = process.env.NODE_ENV === "development";

    return NextResponse.json(
      {
        error: "Erro ao buscar favoritos",
        ...(isDev && { details: message }),
      },
      { status: 500 },
    );
  }
}

// POST - Adicionar filme aos favoritos
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, release_date, poster_path, genre_ids } = body;

    // Verificar se o filme já existe no banco, se não, criar
    let movie = await prisma.movie.findUnique({
      where: {
        tmdbId: id,
      },
    });

    if (!movie) {
      movie = await prisma.movie.create({
        data: {
          tmdbId: id,
          title,
          releaseDate: release_date,
          posterPath: poster_path || null,
          genreIds: genre_ids || [],
        },
      });
    }

    // Verificar se já está favoritado
    const existingFavorite = await prisma.favoriteMovie.findUnique({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId: movie.id,
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: "Filme já está nos favoritos" },
        { status: 409 },
      );
    }

    // Adicionar aos favoritos
    const favorite = await prisma.favoriteMovie.create({
      data: {
        userId: session.user.id,
        movieId: movie.id,
      },
      include: {
        movie: true,
      },
    });

    return NextResponse.json(
      {
        message: "Filme adicionado aos favoritos",
        favorite: {
          favoriteId: favorite.id,
          id: favorite.movie.tmdbId,
          title: favorite.movie.title,
          release_date: favorite.movie.releaseDate,
          poster_path: favorite.movie.posterPath,
          genre_ids: favorite.movie.genreIds,
          addedAt: favorite.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);

    const message =
      error instanceof Error ? error.message : "Erro ao adicionar favorito";
    const isDev = process.env.NODE_ENV === "development";

    // Se for erro de constraint única (já favoritado)
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Filme já está nos favoritos" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        error: "Erro ao adicionar favorito",
        ...(isDev && { details: message }),
      },
      { status: 500 },
    );
  }
}
