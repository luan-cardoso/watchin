import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProps {
  title: string;
  members: number;
}

export default function FavCard({ title, members }: CardProps) {
  return (
    <div className="relative w-48 h-48 bg-[#202020] rounded-md flex flex-col items-center justify-center hover:bg-emerald-600 duration-300 cursor-pointer">
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="absolute bottom-2 flex items-center gap-1 text-sm">
        <FontAwesomeIcon icon={faUsers} />
        <p>{members} membros</p>
      </div>
    </div>
  );
}
