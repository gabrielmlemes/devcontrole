"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import FormTicket from "./components/FormTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email do cliente para localizar...")
    .min(1, "O email é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

const OpenTicket = () => {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/customer", {
      params: {
        email: data.email,
      },
    });

    if (response.data === null) {
      setError("email", { type: "custom", message: "Cliente não encontrado" });
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    });
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-2">
      <h1 className="mt-24 text-center text-3xl font-bold">Abrir chamado</h1>

      <main className="mb-2 mt-4 flex flex-col">
        {customer ? (
          <div className="flex items-center justify-between rounded bg-slate-200 p-2">
            <div className="flex items-center gap-1">
              <h2 className="font-bold md:text-2xl">Cliente selecionado: </h2>
              <span className="md:text-2xl"> {customer.name}</span>
            </div>
            <button
              onClick={handleClearCustomer}
              className="duration-200 hover:scale-105"
            >
              <FiX size={24} color="red" />
            </button>
          </div>
        ) : (
          <form
            className="rounded border-2 bg-slate-200 p-6"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="w-full">
              <Input
                name="email"
                placeholder="Digite o email do cliente..."
                register={register}
                type="text"
                error={errors.email?.message}
              />

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded bg-blue-500 p-2 font-bold text-white duration-200 hover:scale-x-105"
              >
                Procurar clientes
                <FiSearch size={24} color="#FFF" />
              </button>
            </div>
          </form>
        )}

        {customer !== null && <FormTicket customer={customer} />}
      </main>
    </div>
  );
};

export default OpenTicket;
