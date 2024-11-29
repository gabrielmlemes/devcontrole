import { getServerSession } from "next-auth";
import HeaderDescription from "../components/headerDescription";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

const NewTicket = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });
  console.log(customers);

  return (
    <>
      <HeaderDescription
        href="/dashboard"
        name="Novo chamado"
        nameButton="Voltar"
      />

      <form className="flex flex-col">
        <label className="text-xl font-bold">Chamado</label>
        <input
          type="text"
          placeholder="Digite o nome do chamado"
          required
          className="mb-6 mt-1 h-11 w-full rounded-md border-2 px-2"
        />

        <label className="text-xl font-bold">Problema</label>
        <textarea
          placeholder="Digite o seu problema..."
          required
          className="mb-6 mt-1 h-24 w-full resize-none rounded-md border-2 p-2"
        ></textarea>

        {customers.length !== 0 && (
          <>
            <label className="text-xl font-bold">Selecione o cliente</label>
            <select className="mt-1 h-11 w-full resize-none rounded-md border-2 bg-white p-2">
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </>
        )}

        {customers.length === 0 && (
          <Link
            href="/dashboard/customer/new"
            className="w-40 rounded-md bg-[#3B82F6] px-2 py-1 font-semibold text-white"
          >
            Cadastrar cliente
          </Link>
        )}
      </form>
    </>
  );
};

export default NewTicket;
