"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function LoginModal({
  isOpen,
  onClose,
  children,
}: LoginModalProps) {
  const [view, setView] = useState<"login" | "signup">("login");

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop com blur */}
      <div
        className="fixed inset-0 bg-[black/50] backdrop-blur-md z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <div
          className="bg-[#202020] rounded-3xl shadow-2xl w-full max-w-2xl border border-white/10 h-[600px] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header do modal */}
          <div className="flex items-center justify-end p-4 border-white/10">
            <button
              onClick={onClose}
              className="hover:text-indigo-500 duration-300"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
          </div>

          {/* Conteúdo do modal */}
          <div className="relative h-full w-full">
            <div className="absolute top-0 left-10 flex gap-2">
              <button
                type="button"
                onClick={() => setView("login")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  view === "login" ? "bg-indigo-500" : ""
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setView("signup")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  view === "signup" ? "bg-indigo-500 " : ""
                }`}
              >
                Cadastrar
              </button>
            </div>
            <div className="h-full pt-12">
              {view === "login" ? <Login /> : <Signup />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
