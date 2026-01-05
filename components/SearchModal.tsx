"use client";

import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop com blur */}
      <div
        className="fixed inset-0 bg-[black/50] backdrop-blur-md z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal de busca */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <div
          className="bg-[#202020] rounded-lg shadow-2xl w-full max-w-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header do modal */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3 flex-1">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-emerald-600 text-lg"
              />
              <input
                type="text"
                placeholder="Buscar filmes"
                className="bg-transparent border-none outline-none text-white flex-1 text-lg"
                autoFocus
              />
            </div>
            <button
              onClick={onClose}
              className="hover:text-emerald-600 duration-300"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
          </div>
          
          {/* Conteúdo do modal */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            <p className="text-center py-8">
              Digite para buscar...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

