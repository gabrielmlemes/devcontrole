"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório"),
  description: z.string().min(1, "A descrição do chamado é obrigatória"),
});

type FormData = z.infer<typeof schema>;

const FormTicket = () => {
  const {
    register,
    formState: { errors },
    // handleSubmit,
    // setValue
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form className="mt-6 flex flex-col gap-2 rounded bg-slate-200 p-4">
      <Input
        name="name"
        placeholder="Digite o nome do chamado..."
        type="text"
        register={register}
        error={errors.name?.message}
      />
      <textarea
        placeholder="Descreva o seu problema..."
        className="h-24 w-full resize-none rounded border-2 p-2"
        id="description"
        {...register("description")}
      ></textarea>
      {errors.description?.message && (
        <p className="my-1 text-red-500">errors.description?.message</p>
      )}

      <button className="w-full rounded bg-blue-500 p-2 font-bold text-white">
        Cadastrar
      </button>
    </form>
  );
};

export default FormTicket;
