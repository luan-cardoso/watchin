"use client";

import { useState } from "react";
import {
  faHouse,
  faBookmark,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchModal } from "@/features/movies";

export default function Nav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="h-full flex flex-col items-center pt-12 gap-2 bg-[#202020]">
        <h1 className="font-extrabold text-2xl pb-6">
          WATCHIN<span className="text-indigo-500">'</span>
        </h1>
        <NavItem icon={faHouse} href="/">
          Home
        </NavItem>
        <NavItem icon={faBookmark} href="/favorites">
          Favoritos
        </NavItem>
        <NavItem icon={faStar} href="/popular">
          Populares
        </NavItem>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="group flex items-center gap-2 px-2 py-1 w-32 hover:text-indigo-500 transition-colors duration-200"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-lg group-active:text-indigo-500 transition-colors duration-200"
          />
          <span className="font-light tracking-wider">Buscar</span>
        </button>
      </nav>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

function NavItem({
  icon,
  href,
  children,
}: {
  icon: any;
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group flex items-center gap-2 px-2 py-1 w-32 hover:text-indigo-500 transition-colors duration-200 ${
        isActive ? "text-indigo-500" : ""
      }`}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`text-lg group-hover:text-indigo-500 transition-colors duration-200 ${
          isActive ? "text-indigo-500" : ""
        }`}
      />
      <span className="font-light tracking-wider">{children}</span>
    </Link>
  );
}
