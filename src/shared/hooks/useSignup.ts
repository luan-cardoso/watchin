import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignupData {
  user: string;
  senha: string;
}

interface SignupResponse {
  message?: string;
  user?: {
    id: string;
    username: string;
    createdAt: string;
  };
  error?: string;
  details?: any;
}

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result: SignupResponse;
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || "Erro ao criar conta");
      }

      if (!response.ok) {
        throw new Error(result.error || "Erro ao criar conta");
      }

      router.push("/");
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao criar conta";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signup,
    isLoading,
    error,
  };
}