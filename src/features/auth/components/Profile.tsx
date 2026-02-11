"use client";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginModal from "./LoginModal";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="bg-[#202020] px-4 py-2 w-fit h-fit rounded-md flex items-center shadow-2xl border border-[#ffffff50]">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Usuario logado
  if (session?.user) {
    return (
      <div className="px-4 py-2 gap-6 items-center w-fit h-fit flex justify-center">
        <p className="md:block hidden">@{session.user.name}</p>
        <button
          onClick={handleLogout}
          className="flex items-center w-fit h-8 gap-1 px-4  bg-indigo-300 text-indigo-500 border border-indigo-500 rounded"
        >
          Sair
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </div>
    );
  }

  // Usuario não logado
  return (
    <>
      <button
        onClick={() => setIsLoginOpen(true)}
        className="flex items-center w-fit h-8 gap-1 px-4  bg-indigo-300 text-indigo-500 border border-indigo-500 rounded"
      >
        Entrar
      </button>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
