import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientTicket from "./components";
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
        nameButton="Novo cliente"
        href="/dashboard/customer/new"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-3">
        {customers.map((customer) => (
          <ClientTicket
            key={customer.id}
            name={customer.name}
            email={customer.email}
            phone={customer.phone}
          />
        ))}
      </div>
    </main>
  );
};

export default Customer;
