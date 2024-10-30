import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi";

const Header = () => {
  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:scale-105 duration-300">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        <div className="flex gap-3 items-baseline">
          <Link href="/dashboard">
            <FiUser size={26} color="#4b5563" />
          </Link>

          <button>
            <FiLogOut size={26} color="#4b5563" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
