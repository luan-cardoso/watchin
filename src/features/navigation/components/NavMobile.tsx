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

export default function NavMobile() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="flex flex-row items-center py-2 pl-2">
        <NavItem icon={faHouse} href="/">
        </NavItem>
        <NavItem icon={faBookmark} href="/favorites">
        </NavItem>
        <NavItem icon={faStar} href="/popular">
        </NavItem>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="group flex items-center gap-2 px-2 py-1 hover:text-indigo-500 transition-colors duration-200"
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
}: {
  icon: any;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group flex items-center gap-2 px-2 py-1 hover:text-indigo-500 transition-colors duration-200 ${
        isActive ? "text-indigo-500" : ""
      }`}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`text-lg group-hover:text-indigo-500 transition-colors duration-200 ${
          isActive ? "text-indigo-500" : ""
        }`}
      />
    </Link>
  );
}
