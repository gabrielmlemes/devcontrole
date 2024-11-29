"use client";

import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

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
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to delete new customer" },
        { status: 400 }
      );
    }
  }

  return (
    <article className="w-full border-2 p-3 rounded hover:bg-slate-100 duration-300">
      <div className="flex flex-col space-y-2 mb-2">
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
        className="bg-red-500 hover:scale-105 duration-300 text-white px-3 py-1 rounded"
      >
        Deletar
      </button>
    </article>
  );
};

export default ClientTicket;
