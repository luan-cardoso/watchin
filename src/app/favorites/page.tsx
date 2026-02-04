import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/lib/auth";
import Link from "next/link";

export default async function FavoritosPage() {
  const session = await getServerSession(authOptions);

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

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-400 transition-colors font-medium"
            >
              Fazer Login
            </Link>
            
            <Link
              href="/signup"
              className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors font-medium"
            >
              Criar Conta
            </Link>
          </div>

          <Link
            href="/"
            className="inline-block mt-6 hover:text-gray-300 text-sm"
          >
            ← Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  // Usuário está logado - mostrar favoritos
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        Meus Favoritos
      </h1>
      
      <p className="text-gray-400 mb-4">
        Bem-vindo, <span className="text-white font-semibold">{session.user.name}</span>!
      </p>

      {/* Aqui você vai adicionar a lista de filmes favoritos depois */}
      <div className="text-gray-400">
        Seus filmes favoritos aparecerão aqui...
      </div>
    </div>
  );
}
