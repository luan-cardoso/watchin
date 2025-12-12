import {
  faHouse,
  faHeart,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="h-full flex flex-col items-center pt-12 gap-2">
      <h1 className="font-extrabold text-2xl pb-6">
        WATCHIN<span className="text-emerald-600">'</span>
      </h1>
      <NavItem icon={faHouse} href="/">
        Home
      </NavItem>
      <NavItem icon={faMagnifyingGlass} href="/">
        Buscar
      </NavItem>
      <NavItem icon={faHeart} href="/favorites">
        Favoritos
      </NavItem>
      <NavItem icon={faBookmark} href="/">
        Listas
      </NavItem>
    </nav>
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
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 px-2 py-1 w-32 hover:text-emerald-600 transition-colors duration-200"
    >
      <FontAwesomeIcon
        icon={icon}
        className="text-lg group-hover:text-emerald-600 transition-colors duration-200"
      />
      <span className="font-light tracking-wider">{children}</span>
    </Link>
  );
}
