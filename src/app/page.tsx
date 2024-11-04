import Image from "next/image";
import ImgHome from "@/assets/hero.svg";

const Home = () => {
  return (
    <main className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
      <h1 className="font-medium text-3xl md:text-5xl mb-10 text-blue-600 uppercase">
        Gerencie sua empresa
      </h1>

      <Image
        src={ImgHome}
        alt="Imagem Home"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
};

export default Home;
