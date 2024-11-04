import Link from "next/link";

const DashboardHeader = () => {
  return (
    <div className="bg-black w-full mt-3 mb-5 px-2 py-1 rounded-md">
      <div className="flex items-center gap-3 ">
        <Link href="/" className="text-white">Chamados</Link>
        <Link href="/" className="text-white">Clientes</Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
