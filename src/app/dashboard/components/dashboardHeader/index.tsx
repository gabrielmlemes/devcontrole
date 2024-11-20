import Link from "next/link";

const DashboardHeader = () => {
  return (
    <header className="bg-black w-full mt-4 mb-5 px-2 py-1 rounded-md">
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="px-1 text-white hover:font-bold duration-200">Chamados</Link>
        <Link href="/dashboard/customer" className="px-1 text-white hover:font-bold duration-200">Clientes</Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
