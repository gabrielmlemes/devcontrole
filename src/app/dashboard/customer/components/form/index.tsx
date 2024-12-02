"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("O email é inválido").min(1, "O email é obrigatório"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message: "O telefone não segue o padrão. Ex: 61912345678",
    },
  ),
  address: z.string().optional(), // não é obrigatório (não tem o .min)
});

type FormData = z.infer<typeof schema>;

const NewCustomerForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterCustomer(data: FormData) {
    await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      userId: userId,
      address: data.address,
    });

    router.refresh(); // Evita o cache do Next
    router.replace("/dashboard/customer");
  }

  return (
    <form
      className="flex flex-col px-2"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <Input
        name="name"
        placeholder="Digite seu nome completo"
        type="text"
        error={errors.name?.message}
        register={register}
      />

      <section className="my-3 gap-2 sm:flex">
        <div className="mb-2 flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            name="phone"
            placeholder="Digite seu número. EX: 619123456789"
            type="number"
            error={errors.phone?.message}
            register={register}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email</label>
          <Input
            name="email"
            placeholder="Digite seu email"
            type="email"
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="mb-1 text-lg font-medium">Endereço</label>
      <Input
        name="adress"
        placeholder="Digite seu endereço"
        type="text"
        error={errors.address?.message}
        register={register}
      />

      <button
        type="submit"
        className="my-4 h-11 rounded bg-[#3B82F6] px-2 font-bold text-white"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default NewCustomerForm;
