import {
  faArrowRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile({}) {
  const isLogged: boolean = true;

  return isLogged ? (
    <div className="bg-(--background) w-72 h-32 rounded-2xl py-4 px-6 flex flex-col justify-center shadow-2xl border border-[#ffffff50]">
      <h2 className="text-2xl font-bold">Luan Cardoso</h2>
      <p className="text-emerald-600">@luancardoso</p>
      <div className="mt-3 flex gap-3">
        <button className="px-3 py-1 flex items-center gap-1">
          Configurações
          <FontAwesomeIcon icon={faGear} />
        </button>
        <button className="px-3 py-1 flex items-center gap-1">
          Sair
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </div>
    </div>
  ) : (
    <button>Login</button>
  );
}
