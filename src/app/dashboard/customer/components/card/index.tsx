"use client";

import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ClientTicket = ({ customer }: { customer: CustomerProps }) => {
  const router = useRouter();

  async function handleDeleteCustomer() {
    try {
      await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });

      router.refresh();
      toast.error("Cliente deletado!", {
        duration: 3000, // Duração do toast em ms
        position: "top-center", // Posição na tela
      });
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        { error: "Failed to delete new customer" },
        { status: 400 },
      );
    }
  }

  return (
    <article className="w-full rounded border-2 p-3 duration-300 hover:bg-slate-100">
      <div className="mb-2 flex flex-col space-y-2">
        <div>
          <span className="font-bold">Nome: </span>
          <span>{customer.name}</span>
        </div>
        <div>
          <span className="font-bold">Email: </span>
          <span>{customer.email}</span>
        </div>
        <div>
          <span className="font-bold">Telefone: </span>
          <span>{customer.phone}</span>
        </div>
      </div>
      <button
        onClick={handleDeleteCustomer}
        className="rounded bg-red-500 px-3 py-1 text-white duration-300 hover:scale-105"
      >
        Deletar
      </button>
    </article>
  );
};

export default ClientTicket;
