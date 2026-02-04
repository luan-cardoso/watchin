import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/lib/auth";
import { prisma } from "@/shared/lib/prisma";

// DELETE - Remover filme dos favoritos
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ tmdbId: string }> }, // Tipagem como Promise
) {
  try {
    const { tmdbId: tmdbIdRaw } = await params; // Aguarda os parâmetros

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const tmdbId = parseInt(tmdbIdRaw);

    if (isNaN(tmdbId)) {
      return NextResponse.json(
        { error: `ID do filme inválido: recebido ${tmdbIdRaw}` },
        { status: 400 },
      );
    }

    // Buscar o filme pelo tmdbId
    const movie = await prisma.movie.findUnique({
      where: {
        tmdbId,
      },
    });

    if (!movie) {
      return NextResponse.json(
        { error: "Filme não encontrado" },
        { status: 404 },
      );
    }

    // Buscar o favorito
    const favorite = await prisma.favoriteMovie.findUnique({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId: movie.id,
        },
      },
    });

    if (!favorite) {
      return NextResponse.json(
        { error: "Filme não está nos favoritos" },
        { status: 404 },
      );
    }

    // Remover dos favoritos
    await prisma.favoriteMovie.delete({
      where: {
        id: favorite.id,
      },
    });

    return NextResponse.json(
      { message: "Filme removido dos favoritos" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao remover favorito:", error);

    const message =
      error instanceof Error ? error.message : "Erro ao remover favorito";
    const isDev = process.env.NODE_ENV === "development";

    return NextResponse.json(
      {
        error: "Erro ao remover favorito",
        ...(isDev && { details: message }),
      },
      { status: 500 },
    );
  }
}
