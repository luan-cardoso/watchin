import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "../../../../../src/lib/prisma";
import { z } from "zod";

const signupSchema = z.object({
  user: z
    .string()
    .min(5, "Usuário deve ter no mínimo 5 caracteres")
    .max(12, "Usuário deve ter no máximo 12 caracteres"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: validation.error.issues,
        },
        { status: 400 },
      );
    }

    const { user, senha } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        username: user,
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 409 });
    }

    const hashedPassword = await hash(senha, 12);

    const newUser = await prisma.user.create({
      data: {
        username: user,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Usuário criado com sucesso",
        user: newUser,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    const message =
      error instanceof Error ? error.message : "Erro ao criar usuário";
    const isDev = process.env.NODE_ENV === "development";

    return NextResponse.json(
      {
        error: "Erro ao criar usuário",
        ...(isDev && { details: message }),
      },
      { status: 500 },
    );
  }
}
