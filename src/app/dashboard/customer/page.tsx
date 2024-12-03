import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientTicket from "./components/card";
import HeaderDescription from "../components/headerDescription";
import prisma from "@/lib/prisma";

const Customer = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <main>
      <HeaderDescription
        name="Meus clientes"
        nameButton="Novo"
        href="/dashboard/customer/new"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <ClientTicket key={customer.id} customer={customer} />
        ))}

        {customers.length === 0 && (
          <span className="font-semibold text-gray-600">
            Você não possui nenhum cliente
          </span>
        )}
      </div>
    </main>
  );
};

export default Customer;
