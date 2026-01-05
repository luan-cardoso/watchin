import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FavCard from "../../../components/FavCard";

export default function Favorites({}) {
  return (
    <div className="px-10 pt-28 flex flex-col gap-16">
      <div className="flex flex-col gap-8">
        <h2 className="text-5xl font-extrabold">Sua lista de favoritos.</h2>
        <div className="flex gap-5 items-center">
          <form>
            <div className="rounded-md p-3 bg-[#202020] border border-[#ffffff20] hover:border hover:border-emerald-600 duration-300 flex items-center gap-1">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                className="w-fit border-transparent placeholder:text-[#cfcfcf] ring-transparent focus:outline-none"
                type="text"
                name="friend"
                id="friend"
                placeholder="Encontre seu amigo"
              />
            </div>
          </form>
          <button className="px-3 py-3 flex gap-1 items-center bg-[#009966]">
            <FontAwesomeIcon icon={faPlus} />
            Criar lista
          </button>
        </div>
      </div>
      <main className="flex gap-4">
        <div className="w-48 h-48 bg-[#202020] rounded-md flex items-center justify-center hover:bg-emerald-600 duration-300 cursor-pointer">
          <h1 className="text-lg font-bold">Meus Favoritos</h1>
        </div>
        <FavCard title="Terror" members={10} />
      </main>
    </div>
  );
}
