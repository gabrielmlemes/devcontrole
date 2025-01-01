import Image from "next/image";
import ImgHome from "@/assets/hero.svg";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center">
      <div className="mb-10 flex w-full flex-wrap px-3 text-center text-4xl font-medium uppercase text-[#064790] md:text-5xl">
        <p className="w-full">Gerencie com facilidade</p>
        <p className="w-full">solucione com rapidez</p>
      </div>

      <Image
        src={ImgHome}
        alt="Imagem Home"
        className="w-[400px] max-w-sm md:w-[600px] md:max-w-xl"
      />

      {session ? (
        <span></span>
      ) : (
        <Link
          href="/open"
          className="mt-8 rounded-lg bg-[#064790] px-4 py-1 text-xs text-white duration-300 hover:scale-105 md:text-sm"
        >
          Deseja abrir um chamado sem realizar login?
        </Link>
      )}
    </main>
  );
};

export default Home;
