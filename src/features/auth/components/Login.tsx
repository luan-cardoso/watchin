"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../hooks/useLogin";
import { useSearchParams } from "next/navigation";

const loginSchema = z.object({
  user: z
    .string()
    .min(5, "Usuário deve ter no mínimo 5 caracteres")
    .max(12, "Usuário deve ter no máximo 12 caracteres"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, isLoading, error } = useLogin();
  const searchParams = useSearchParams();
  const loginSuccess = searchParams.get("login") === "success";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (err) {
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className="w-full flex justify-center items-start h-full mt-15">
      <div>
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Bem-vindo(a)
          </h2>
          <p className="mt-4 text-center">
            Faça login para ter a melhor experiência do app.
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500 rounded-md">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-6 flex flex-col items-center"
          >
            <div className="rounded-md shadow-sm">
              <div>
                <label className="sr-only" htmlFor="user">
                  Usuário
                </label>
                <input
                  {...register("user")}
                  placeholder="Usuário"
                  className="appearance-none relative block px-3 w-72 py-3 border border-gray-700 bg-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  type="text"
                  id="user"
                  disabled={isLoading}
                />
                {errors.user && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.user.message}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="sr-only" htmlFor="senha">
                  Password
                </label>
                <input
                  {...register("senha")}
                  placeholder="Senha"
                  className="appearance-none relative block px-3 w-72 py-3 border border-gray-700 bg-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  type="password"
                  id="senha"
                  disabled={isLoading}
                />
                {errors.senha && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senha.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                className="group relative w-40 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
