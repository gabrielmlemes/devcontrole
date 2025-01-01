"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { CustomerDataInfo } from "../../page";

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório"),
  description: z.string().min(1, "A descrição do chamado é obrigatória"),
});

type FormData = z.infer<typeof schema>;

interface FormTicketProps {
  customer: CustomerDataInfo;
}

const FormTicket = ({ customer }: FormTicketProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    });

    toast.success("Chamado cadastrado!", {
      duration: 3000, // Duração do toast em ms
      position: "top-center", // Posição na tela
    });

    setValue("name", "");
    setValue("description", "");
  }

  return (
    <form
      className="mt-6 flex flex-col gap-2 rounded bg-slate-200 p-4"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <label>Nome do chamado</label>
      <Input
        name="name"
        placeholder="Digite o nome do chamado..."
        type="text"
        register={register}
        error={errors.name?.message}
      />
      <label className="mt-4">Descreva o problema</label>
      <textarea
        placeholder="Descreva o seu problema..."
        className="h-24 w-full resize-none rounded border-2 p-2"
        id="description"
        {...register("description")}
      ></textarea>
      {errors.description?.message && (
        <p className="my-1 text-red-500">errors.description?.message</p>
      )}

      <button
        type="submit"
        className="w-full rounded bg-blue-500 p-2 font-bold text-white"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default FormTicket;
